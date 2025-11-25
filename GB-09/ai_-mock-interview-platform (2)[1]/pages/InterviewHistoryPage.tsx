
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { MOCK_INTERVIEW_HISTORY } from '../constants';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = MOCK_INTERVIEW_HISTORY.slice().reverse().map(item => ({
  name: item.date.slice(5),
  score: item.score,
}));

const InterviewHistoryPage: React.FC = () => {
  return (
    <Layout>
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-900/50 to-slate-900 rounded-b-[40px] shadow-lg">
        <div className="container mx-auto px-6 py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center">Interview History</h1>
          <p className="text-slate-300 text-center mt-2">Review your past performance and track your progress.</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* History List */}
            <div className="lg:col-span-2 space-y-4">
                {MOCK_INTERVIEW_HISTORY.map(item => (
                    <div key={item.id} className="bg-slate-800/50 p-4 rounded-lg flex items-center justify-between hover:bg-slate-700/50 transition-colors">
                        <div className="flex items-center space-x-4">
                             <img src={`https://i.pravatar.cc/150?u=${item.id}`} alt="avatar" className="w-12 h-12 rounded-full" />
                            <div>
                                <p className="font-bold text-lg">{item.role}</p>
                                <p className="text-sm text-slate-400">{item.date}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="text-right">
                                <p className="text-xs text-slate-400">Score</p>
                                <p className="font-bold text-xl text-cyan-400">{item.score}%</p>
                            </div>
                            <Link to="/feedback" state={{ transcript: [], role: item.role }} className="text-slate-400 hover:text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Progress Chart */}
            <div className="lg:col-span-1 bg-slate-800/50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Progress Over Time</h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis dataKey="name" stroke="#9ca3af" />
                            <YAxis stroke="#9ca3af" domain={[50, 100]} />
                            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }} />
                            <Line type="monotone" dataKey="score" stroke="#22d3ee" strokeWidth={2} activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
      </div>
    </Layout>
  );
};

export default InterviewHistoryPage;
