
import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';

const guides = [
  { title: "Cracking the Coding Interview", category: "Technical", date: "Oct 2024" },
  { title: "Behavioral Questions Masterclass", category: "Behavioral", date: "Sep 2024" },
  { title: "Behavioral Questions Strategies", category: "Behavioral", date: "Sep 2024" },
  { title: "AI Practice Tool", category: "Tool", date: "Aug 2024" },
  { title: "The STAR Method Drives", category: "Framework", date: "July 2024" },
];

const categories = [
    { name: "Resume Building", count: 3 },
    { name: "Industry Deep Dives", count: 8 },
    { name: "Essential Design Questions", count: 12 },
    { name: "Case STAR Method Explained", count: 2 },
    { name: "Tech News", count: 5 }
];

const ResourcesPage: React.FC = () => {
  return (
    <Layout>
       {/* Header Section */}
       <div className="bg-gradient-to-r from-blue-900/50 to-slate-900 rounded-b-[40px] shadow-lg">
        <div className="container mx-auto px-6 py-12 md:py-16 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Unlock Your Potential</h1>
          <p className="text-slate-300 mb-6">Expert Guides, Articles & Tools to Boost Your Interview Skills</p>
          <Link
            to="/select-role"
            className="inline-flex items-center bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105"
          >
            Choose New Role &rarr;
          </Link>
        </div>
      </div>

       {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        {/* Featured Guides */}
        <h2 className="text-2xl font-bold mb-6">Featured Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
            {guides.map((guide, index) => (
                <div key={index} className="bg-slate-800/50 p-4 rounded-lg hover:bg-slate-700/50 transition-colors">
                    <p className="text-sm text-cyan-400 mb-1">{guide.category}</p>
                    <h3 className="font-semibold mb-2">{guide.title}</h3>
                    <p className="text-xs text-slate-400">{guide.date}</p>
                </div>
            ))}
        </div>

        {/* Browse by Category */}
        <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((cat, index) => (
                 <div key={index} className="bg-slate-800/50 p-4 rounded-lg text-center hover:bg-slate-700/50 transition-colors">
                    <h3 className="font-semibold">{cat.name}</h3>
                    <p className="text-sm text-slate-400">{cat.count} Articles</p>
                </div>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default ResourcesPage;
