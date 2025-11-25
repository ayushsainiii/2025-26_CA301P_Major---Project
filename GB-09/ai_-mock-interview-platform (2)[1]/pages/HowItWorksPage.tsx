
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { BrainIcon, ChatIcon, ChartIcon } from '../constants';

const HowItWorksPage: React.FC = () => {
  const steps = [
    {
      step: 1,
      title: 'Choose Your Role',
      description: 'Select your desired job title or industry to get tailored questions.',
      icon: <BrainIcon className="w-10 h-10 text-cyan-400" />
    },
    {
      step: 2,
      title: 'Practice & Get Feedback',
      description: 'Engage in real-time interviews with our AI, and receive instant, actionable feedback.',
      icon: <ChatIcon className="w-10 h-10 text-cyan-400" />
    },
    {
      step: 3,
      title: 'Track & Improve',
      description: 'Review your performance history, track progress, and access resources to land your dream job.',
      icon: <ChartIcon className="w-10 h-10 text-cyan-400" />
    }
  ];

  return (
    <Layout>
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-900/50 to-slate-900 rounded-b-[40px] shadow-lg">
        <div className="container mx-auto px-6 py-16 text-center">
            <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">How It Works</h1>
                    <p className="text-slate-300 mb-6">A simple, effective path to interview mastery.</p>
                     <Link to="/signup" className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105">
                        Start Free Mock Interview
                    </Link>
                </div>
                <div className="md:w-1/2">
                     <img src="https://i.imgur.com/3Z4w3qX.png" alt="AI Interview Practice" className="w-full max-w-sm mx-auto h-auto z-10" />
                </div>
            </div>
        </div>
      </div>
      
      {/* Steps Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((item) => (
            <div key={item.step} className="bg-slate-800/50 p-8 rounded-xl border border-slate-700 text-center">
              <div className="bg-slate-900 rounded-full p-4 inline-block mb-6 border-2 border-slate-700">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3"><span className="text-cyan-400">{item.step}.</span> {item.title}</h3>
              <p className="text-slate-400">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default HowItWorksPage;
