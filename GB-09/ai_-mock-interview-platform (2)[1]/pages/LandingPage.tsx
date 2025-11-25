
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { BrainIcon, ChatIcon, ChartIcon } from '../constants';

const LandingPage: React.FC = () => {
  return (
    <Layout isTransparentHeader={true}>
      <div className="relative overflow-hidden">
        {/* Hero Section */}
        <div className="container mx-auto px-6 pt-32 pb-24 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
                Master Your Interview. <br /> Powered by AI
              </h1>
              <p className="text-lg text-slate-300 mb-8">
                Practice real-time, get instant feedback, and land your dream job.
              </p>
              <Link
                to="/signup"
                className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105"
              >
                Start Free Mock Interview
              </Link>
            </div>
            <div className="md:w-1/2 relative">
               <img src="https://i.imgur.com/3Z4w3qX.png" alt="AI Interview Practice" className="w-full h-auto z-10" />
               <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-3xl z-0"></div>
            </div>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="bg-slate-900/50 rounded-t-[40px] py-16">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    <div className="feature-item">
                        <div className="bg-slate-800 rounded-full p-4 inline-block mb-4">
                            <BrainIcon className="w-8 h-8 text-cyan-400" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Realistic Questions</h3>
                        <p className="text-slate-400">Get tailored questions based on your desired job role and industry.</p>
                    </div>
                    <div className="feature-item">
                         <div className="bg-slate-800 rounded-full p-4 inline-block mb-4">
                            <ChatIcon className="w-8 h-8 text-cyan-400" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Instant Feedback</h3>
                        <p className="text-slate-400">Receive immediate, actionable insights on your answers.</p>
                    </div>
                    <div className="feature-item">
                        <div className="bg-slate-800 rounded-full p-4 inline-block mb-4">
                            <ChartIcon className="w-8 h-8 text-cyan-400" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Data-Driven Insights</h3>
                        <p className="text-slate-400">Track your progress and identify areas for improvement.</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </Layout>
  );
};

export default LandingPage;
