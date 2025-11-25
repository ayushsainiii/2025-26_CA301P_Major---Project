import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Fix: `useAuth` is exported from `hooks/useAuth.tsx`, not `contexts/AuthContext.tsx`.
import { useAuth } from '../hooks/useAuth';

const Header: React.FC<{ isTransparent?: boolean }> = ({ isTransparent = false }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const baseNavLinks = [
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Testimonials', path: '/testimonials' },
  ];

  const authNavLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Interview History', path: '/history' },
    { name: 'Resources', path: '/resources' },
  ];

  const navLinks = user ? authNavLinks : baseNavLinks;
  const bgColor = isTransparent ? 'bg-transparent' : 'bg-slate-900/80 backdrop-blur-sm';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${bgColor}`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to={user ? "/dashboard" : "/"} className="text-2xl font-bold text-white tracking-wider">
          TALENT <span className="text-cyan-400">AI</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} className="text-slate-300 hover:text-white transition-colors">
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <div className="flex items-center space-x-2">
                <img src={`https://i.pravatar.cc/150?u=${user.email}`} alt="avatar" className="w-8 h-8 rounded-full" />
                <span className="text-slate-300">{user.name}</span>
              </div>
              <button onClick={handleLogout} className="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-md transition-colors">
                Log Out
              </button>
            </>
          ) : (
            <Link to="/signup" className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-md transition-colors">
              Sign Up
            </Link>
          )}
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-slate-800">
          <nav className="px-6 pt-2 pb-4 flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} className="text-slate-300 hover:text-white transition-colors py-1" onClick={() => setIsMenuOpen(false)}>
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-slate-700">
              {user ? (
                 <button onClick={handleLogout} className="w-full text-left bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-md transition-colors">
                    Log Out
                 </button>
              ) : (
                <Link to="/signup" className="block text-center bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-md transition-colors" onClick={() => setIsMenuOpen(false)}>
                  Sign Up
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
