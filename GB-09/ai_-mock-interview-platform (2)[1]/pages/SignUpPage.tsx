import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Fix: `useAuth` is exported from `hooks/useAuth.tsx`, not `contexts/AuthContext.tsx`.
import { useAuth } from '../hooks/useAuth';
import Layout from '../components/Layout';

const SignUpPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signup(fullName, email);
    navigate('/dashboard');
  };

  return (
    <Layout>
       <div className="container mx-auto px-6 pt-16 pb-12">
        <div className="flex flex-col md:flex-row items-center justify-center gap-16">
            <div className="w-full md:w-1/2">
                <div className="bg-slate-800/50 backdrop-blur-sm shadow-2xl rounded-lg p-8">
                    <h2 className="text-3xl font-bold text-center text-white mb-8">Create Your Free Account</h2>
                    <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-slate-300 text-sm font-bold mb-2" htmlFor="fullName">
                        Full Name
                        </label>
                        <input
                        className="shadow appearance-none border border-slate-700 rounded w-full py-3 px-4 bg-slate-900 text-slate-200 leading-tight focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        id="fullName"
                        type="text"
                        placeholder="John Doe"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-slate-300 text-sm font-bold mb-2" htmlFor="email">
                        Email
                        </label>
                        <input
                        className="shadow appearance-none border border-slate-700 rounded w-full py-3 px-4 bg-slate-900 text-slate-200 leading-tight focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-slate-300 text-sm font-bold mb-2" htmlFor="password">
                        Password
                        </label>
                        <input
                        className="shadow appearance-none border border-slate-700 rounded w-full py-3 px-4 bg-slate-900 text-slate-200 leading-tight focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        id="password"
                        type="password"
                        placeholder="******************"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                        className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105"
                        type="submit"
                        >
                        Create Account
                        </button>
                    </div>
                    </form>
                    <p className="text-center text-slate-400 text-sm mt-6">
                    Already have an account?{' '}
                    <Link to="/login" className="font-bold text-cyan-400 hover:text-cyan-300">
                        Log In
                    </Link>
                    </p>
                </div>
            </div>
            <div className="hidden md:block md:w-1/2">
                <img src="https://i.imgur.com/3Z4w3qX.png" alt="AI Interview Practice" className="w-full h-auto" />
            </div>
        </div>
       </div>
    </Layout>
  );
};

export default SignUpPage;
