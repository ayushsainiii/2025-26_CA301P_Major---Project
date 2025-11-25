
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { JOB_ROLES } from '../constants';

const RoleSelectionPage: React.FC = () => {
  return (
    <Layout>
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-900/50 to-slate-900 rounded-b-[40px] shadow-lg">
        <div className="container mx-auto px-6 py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center">Choose Your Interview Role</h1>
          <p className="text-slate-300 text-center mt-2">Select your desired job title to get tailored questions.</p>
        </div>
      </div>

      {/* Roles Grid */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {JOB_ROLES.map((role) => (
            <div
              key={role.id}
              className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 flex flex-col justify-between hover:border-cyan-500 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <div>
                <div className="flex items-center space-x-4 mb-4">
                  {role.icon}
                  <h3 className="text-xl font-bold text-white">{role.title}</h3>
                </div>
                <p className="text-slate-400 mb-6">{role.description}</p>
              </div>
              <Link
                to={`/interview/${role.id}`}
                state={{ roleTitle: role.title }}
                className="w-full text-center bg-slate-700 hover:bg-cyan-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Start Interview
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default RoleSelectionPage;
