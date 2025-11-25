
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { GoogleGenAI, LiveServerMessage, Modality, Blob as GenAIBlob } from '@google/genai';
import Layout from '../components/Layout';
import { encode, decode, decodeAudioData } from '../services/geminiService';

const InterviewPage: React.FC = () => {
  const { role } = useParams<{ role: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { roleTitle } = location.state as { roleTitle: string } || { roleTitle: 'Interview' };

  const [isLive, setIsLive] = useState(false);
  const [transcript, setTranscript] = useState<{ speaker: string; text: string }[]>([]);
  const [currentInterviewerText, setCurrentInterviewerText] = useState('');
  const [currentUserText, setCurrentUserText] = useState('');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const sessionPromiseRef = useRef<Promise<any> | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);

  useEffect(() => {
    const startInterview = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        mediaStreamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        const outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        let nextStartTime = 0;

        sessionPromiseRef.current = ai.live.connect({
          model: 'gemini-2.5-flash-native-audio-preview-09-2025',
          callbacks: {
            onopen: () => {
              setIsLive(true);
              setTranscript([{ speaker: 'ai', text: `Hello! I'm your AI interviewer. Today, we'll be discussing topics related to the ${roleTitle} role. Let's start with our first question.` }]);
              const inputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
              audioContextRef.current = inputAudioContext;
              const source = inputAudioContext.createMediaStreamSource(stream);
              const scriptProcessor = inputAudioContext.createScriptProcessor(4096, 1, 1);
              scriptProcessorRef.current = scriptProcessor;

              scriptProcessor.onaudioprocess = (audioProcessingEvent) => {
                const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
                const pcmBlob = createBlob(inputData);
                sessionPromiseRef.current?.then((session) => {
                  session.sendRealtimeInput({ media: pcmBlob });
                });
              };
              source.connect(scriptProcessor);
              scriptProcessor.connect(inputAudioContext.destination);
            },
            onmessage: async (message: LiveServerMessage) => {
              if (message.serverContent?.outputTranscription) {
                const text = message.serverContent.outputTranscription.text;
                setCurrentInterviewerText(prev => prev + text);
              }
              if (message.serverContent?.inputTranscription) {
                const text = message.serverContent.inputTranscription.text;
                setCurrentUserText(prev => prev + text);
              }
              if(message.serverContent?.turnComplete) {
                setTranscript(prev => [...prev, { speaker: 'user', text: currentUserText }, { speaker: 'ai', text: currentInterviewerText }]);
                setCurrentInterviewerText('');
                setCurrentUserText('');
              }
              const audioData = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
              if (audioData) {
                nextStartTime = Math.max(nextStartTime, outputAudioContext.currentTime);
                const audioBuffer = await decodeAudioData(decode(audioData), outputAudioContext, 24000, 1);
                const source = outputAudioContext.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(outputAudioContext.destination);
                source.start(nextStartTime);
                nextStartTime += audioBuffer.duration;
              }
            },
            onerror: (e: ErrorEvent) => console.error('Gemini Live Error:', e),
            onclose: (e: CloseEvent) => setIsLive(false),
          },
          config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
            systemInstruction: `You are an expert interviewer conducting a job interview for a ${roleTitle} position. Ask relevant questions, one at a time. Keep your responses concise.`,
            outputAudioTranscription: {},
            inputAudioTranscription: {}
          },
        });
      } catch (err) {
        console.error("Error starting interview:", err);
        alert("Could not access camera/microphone. Please check permissions and try again.");
      }
    };
    
    startInterview();

    return () => {
        mediaStreamRef.current?.getTracks().forEach(track => track.stop());
        scriptProcessorRef.current?.disconnect();
        audioContextRef.current?.close();
        sessionPromiseRef.current?.then(session => session.close());
        setIsLive(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role, roleTitle]);

  const createBlob = (data: Float32Array): GenAIBlob => {
    const l = data.length;
    const int16 = new Int16Array(l);
    for (let i = 0; i < l; i++) {
        int16[i] = data[i] * 32768;
    }
    return { data: encode(new Uint8Array(int16.buffer)), mimeType: 'audio/pcm;rate=16000' };
  };

  const handleEndInterview = () => {
    navigate('/feedback', { state: { transcript: [...transcript, {speaker: 'user', text: currentUserText}], role: roleTitle } });
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-6 py-8">
        <div className="bg-slate-800/50 p-8 rounded-2xl shadow-2xl flex flex-col lg:flex-row gap-8">
          {/* Left Panel: Video & Controls */}
          <div className="w-full lg:w-1/2 flex flex-col items-center">
            <div className="relative w-full max-w-md aspect-square rounded-full overflow-hidden bg-slate-900 mb-6 border-4 border-slate-700">
              <video ref={videoRef} autoPlay muted className="w-full h-full object-cover transform scale-x-[-1]"></video>
            </div>
            <div className="flex items-center space-x-2 text-cyan-400 font-semibold mb-6">
                <span className={`w-3 h-3 rounded-full ${isLive ? 'bg-red-500 animate-pulse' : 'bg-gray-500'}`}></span>
                <span>{isLive ? 'LIVE' : 'CONNECTING...'}</span>
            </div>
             <div className="relative w-48 h-12 flex items-center justify-center">
                <div className="absolute h-full w-full bg-cyan-400/20 rounded-full blur-xl animate-pulse"></div>
                <div className="text-cyan-300">
                    <svg className="w-12 h-12" viewBox="0 0 100 100">
                        <path d="M20,50 C20,30 30,20 50,20 C70,20 80,30 80,50 C80,70 70,80 50,80 C30,80 20,70 20,50" fill="none" stroke="currentColor" strokeWidth="4" />
                        <path d="M30,50 C30,35 40,30 50,30 C60,30 70,35 70,50 C70,65 60,70 50,70 C40,70 30,65 30,50" fill="none" stroke="currentColor" strokeWidth="4" />
                    </svg>
                </div>
            </div>
          </div>

          {/* Right Panel: AI & Transcript */}
          <div className="w-full lg:w-1/2">
            <div className="flex items-center space-x-4 mb-6">
                <img src="https://i.imgur.com/GHYk3ZG.png" alt="AI Interviewer" className="w-20 h-20"/>
                <div>
                    <h2 className="text-2xl font-bold">AI Interviewer</h2>
                    <p className="text-slate-400">{roleTitle}</p>
                </div>
            </div>
            <div className="h-96 bg-slate-900/70 rounded-lg p-4 overflow-y-auto mb-6 space-y-4">
              {transcript.map((item, index) => (
                <div key={index} className={`flex ${item.speaker === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <p className={`max-w-[80%] p-3 rounded-lg ${item.speaker === 'user' ? 'bg-cyan-600' : 'bg-slate-700'}`}>{item.text}</p>
                </div>
              ))}
               {currentUserText && <div className="flex justify-end"><p className="max-w-[80%] p-3 rounded-lg bg-cyan-600/50">{currentUserText}</p></div>}
               {currentInterviewerText && <div className="flex justify-start"><p className="max-w-[80%] p-3 rounded-lg bg-slate-700/50">{currentInterviewerText}</p></div>}
            </div>
            <button
              onClick={handleEndInterview}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105"
            >
              End Interview
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InterviewPage;
