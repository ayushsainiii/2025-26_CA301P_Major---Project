
import React from 'react';
import Header from './Header';

const Layout: React.FC<{ children: React.ReactNode, isTransparentHeader?: boolean }> = ({ children, isTransparentHeader = false }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-gray-900 text-white">
      <Header isTransparent={isTransparentHeader} />
      <main className="pt-20">
        {children}
      </main>
    </div>
  );
};

export default Layout;
