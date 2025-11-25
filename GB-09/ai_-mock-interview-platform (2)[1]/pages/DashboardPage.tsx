
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import ProgressCircle from '../components/ProgressCircle';
import { MOCK_INTERVIEW_HISTORY } from '../constants';

const DashboardPage: React.FC = () => {
    
  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900/50 to-slate-900 rounded-b-[40px] shadow-lg">
        <div className="container mx-auto px-6 py-12 md:py-16">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Start New Interview</h1>
              <p className="text-slate-300 mb-6">Practice real-time, get instant feedback.</p>
              <Link
                to="/select-role"
                className="inline-flex items-center bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105"
              >
                Choose Your Role &rarr;
              </Link>
            </div>
             <div className="hidden md:block md:w-1/3">
                 <img src="https://i.imgur.com/3Z4w3qX.png" alt="Mascot" className="w-48 h-auto ml-auto" />
             </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-6 text-white">Your Progress At A Glance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Progress Stats */}
            <div className="bg-slate-800/50 p-6 rounded-xl col-span-1 lg:col-span-2">
                <div className="flex justify-around items-center h-full">
                    <ProgressCircle percentage={75} label="Questions Answered" />
                    <ProgressCircle percentage={90} label="Instant Feedback Received" />
                    <ProgressCircle percentage={90} label="Interviews Completed" />
                </div>
            </div>

            {/* Interview History */}
            <div className="bg-slate-800/50 p-6 rounded-xl col-span-1 lg:col-span-2">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg">Interview History</h3>
                    <Link to="/history" className="text-sm text-cyan-400 hover:underline">View All</Link>
                </div>
                <div className="space-y-3">
                    {MOCK_INTERVIEW_HISTORY.slice(0, 3).map(item => (
                        <div key={item.id} className="flex items-center justify-between bg-slate-700/50 p-3 rounded-lg">
                            <div className="flex items-center space-x-3">
                                <img src={`https://i.pravatar.cc/150?u=${item.id}`} alt="avatar" className="w-10 h-10 rounded-full" />
                                <div>
                                    <p className="font-semibold">{item.role}</p>
                                    <p className="text-xs text-slate-400">{item.date}</p>
                                </div>
                            </div>
                            <span className="text-sm font-bold bg-slate-600 px-3 py-1 rounded-full">{item.score}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
