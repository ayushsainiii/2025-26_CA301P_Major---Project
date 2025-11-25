
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (name: string, email: string) => void;
  logout: () => void;
  signup: (name: string, email: string) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('talent-ai-user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('talent-ai-user');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (name: string, email: string) => {
    const userData = { id: Date.now().toString(), name, email };
    localStorage.setItem('talent-ai-user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('talent-ai-user');
    setUser(null);
  };

  const signup = (name: string, email: string) => {
    // In a real app, this would hit a backend. Here we just log them in.
    const userData = { id: Date.now().toString(), name, email };
    localStorage.setItem('talent-ai-user', JSON.stringify(userData));
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signup }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
