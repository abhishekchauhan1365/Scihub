import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (name: string, email: string) => void;
  logout: () => void;
  updateXP: (amount: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check local storage for persistent login simulation
    const storedUser = localStorage.getItem('slh_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (name: string, email: string) => {
    // Simulate backend login/signup
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      xp: 0
    };
    setUser(newUser);
    localStorage.setItem('slh_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('slh_user');
  };

  const updateXP = (amount: number) => {
    if (user) {
      const updatedUser = { ...user, xp: user.xp + amount };
      setUser(updatedUser);
      localStorage.setItem('slh_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, updateXP }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
