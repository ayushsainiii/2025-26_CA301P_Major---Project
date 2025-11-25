
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { GoogleGenAI, Type } from '@google/genai';
import { Feedback } from '../types';
import { MOCK_FEEDBACK } from '../constants';

const FeedbackPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { transcript, role } = location.state || { transcript: [], role: 'General' };

  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!transcript || transcript.length === 0) {
      // If no transcript, use mock data or redirect
      console.warn("No transcript found, using mock feedback.");
      setFeedback(MOCK_FEEDBACK);
      setLoading(false);
      // Or navigate('/dashboard');
      return;
    }

    const generateFeedback = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const fullTranscript = transcript.map((t: {speaker: string; text: string}) => `${t.speaker.toUpperCase()}: ${t.text}`).join('\n');
        
        const prompt = `Analyze the following interview transcript for a ${role} role. Provide feedback in JSON format.
        
        Transcript:
        ${fullTranscript}
        
        Provide a detailed analysis including an overall score (0-100), a list of strengths, areas for improvement, suggested topics to review, and a breakdown of at least two key questions with the user's answer, specific feedback, and a score for each answer.`;

        const feedbackSchema = {
            type: Type.OBJECT,
            properties: {
                overallScore: { type: Type.INTEGER, description: "An overall score from 0 to 100 for the interview performance." },
                strengths: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of key strengths demonstrated by the candidate." },
                areasForImprovement: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of areas where the candidate can improve." },
                suggestedTopics: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Specific topics or skills the candidate should review." },
                questionBreakdown: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            question: { type: Type.STRING, description: "The question asked by the interviewer." },
                            answer: { type: Type.STRING, description: "A summary of the user's answer." },
                            feedback: { type: Type.STRING, description: "Specific feedback on the user's answer." },
                            score: { type: Type.INTEGER, description: "A score from 0 to 100 for this specific answer." }
                        },
                        required: ["question", "answer", "feedback", "score"]
                    }
                }
            },
            required: ["overallScore", "strengths", "areasForImprovement", "questionBreakdown"]
        };

        const response = await ai.models.generateContent({
          model: "gemini-2.5-pro",
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: feedbackSchema,
          },
        });
        
        const feedbackJson = JSON.parse(response.text);
        setFeedback(feedbackJson);
      } catch (e) {
        console.error("Failed to generate feedback:", e);
        setError("Couldn't generate feedback. Using mock data instead.");
        setFeedback(MOCK_FEEDBACK); // Fallback to mock data on error
      } finally {
        setLoading(false);
      }
    };

    generateFeedback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcript, role]);
  
  if (loading) {
    return (
        <Layout>
            <div className="flex flex-col items-center justify-center h-[80vh]">
                 <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-400"></div>
                 <p className="mt-4 text-xl">Generating your feedback report...</p>
            </div>
        </Layout>
    );
  }
  
  if (error && !feedback) {
     return <Layout><div className="text-center py-20 text-red-400">{error}</div></Layout>;
  }

  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">Interview Feedback</h1>
        <p className="text-slate-400 mb-8">For {role} on {new Date().toLocaleDateString()}</p>
        
        {error && <div className="bg-yellow-900/50 border border-yellow-700 text-yellow-200 p-4 rounded-lg mb-8">{error}</div>}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel: Overall Score & Summary */}
          <div className="lg:col-span-1 bg-slate-800/50 p-6 rounded-xl">
            <div className="flex flex-col items-center">
              <div className="relative w-48 h-48 mb-4">
                <svg viewBox="0 0 36 36" className="w-full h-full">
                  <path className="text-slate-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3"></path>
                  <path className="text-cyan-400" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray={`${feedback?.overallScore || 0}, 100`}></path>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold">{feedback?.overallScore || 0}%</span>
                  <span className="text-lg text-slate-300">Great Job!</span>
                </div>
              </div>
              <div className="w-full text-left">
                  <h3 className="font-bold mb-2 text-green-400">Strengths:</h3>
                  <ul className="list-disc list-inside text-slate-300 space-y-1 mb-4">
                      {feedback?.strengths.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                  <h3 className="font-bold mb-2 text-yellow-400">Areas for Improvement:</h3>
                  <ul className="list-disc list-inside text-slate-300 space-y-1 mb-4">
                      {feedback?.areasForImprovement.map((a, i) => <li key={i}>{a}</li>)}
                  </ul>
                  <h3 className="font-bold mb-2 text-cyan-400">Suggested Topics to Review:</h3>
                  <ul className="list-disc list-inside text-slate-300 space-y-1">
                      {feedback?.suggestedTopics.map((t, i) => <li key={i}>{t}</li>)}
                  </ul>
              </div>
               <button onClick={() => navigate('/select-role')} className="mt-8 w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105">
                Practice Again
              </button>
            </div>
          </div>

          {/* Right Panel: Question Breakdown */}
          <div className="lg:col-span-2 bg-slate-800/50 p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-6">Question Breakdown</h2>
            <div className="space-y-6">
              {feedback?.questionBreakdown.map((item, index) => (
                <div key={index} className="bg-slate-900/50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-semibold text-slate-300 flex-1 pr-4">{item.question}</p>
                    <span className="font-bold text-lg text-cyan-400">{item.score}%</span>
                  </div>
                  <p className="text-sm text-slate-400 italic mb-3">"{item.answer}"</p>
                  <p className="text-sm text-slate-300 border-l-2 border-cyan-500 pl-3">{item.feedback}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FeedbackPage;
