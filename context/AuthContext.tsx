'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import {jwtDecode} from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { loginAPI, registerAPI } from '../services/authAPI';
import { User } from '../types/user';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

interface Props {
  children: ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    // check localStorage for JWT token
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        setUser(decoded.user);
      } catch (err) {
        localStorage.removeItem('token');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
  try {
    const res = await loginAPI(email, password); 
    console.log('Login response:', res);
    localStorage.setItem('token', res.access_token);

    const decoded: any = jwtDecode(res.access_token);
    
    setUser({
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
      role: decoded.role,
      subscription: decoded.subscription,
    });

    router.push(decoded.role === 'admin' ? '/admin' : '/blogs');
  } catch (err: any) {
    console.error('Login failed:', err);
  }
};


  const register = async (name: string, email: string, password: string) => {
    const { token } = await registerAPI(name, email, password);
    localStorage.setItem('token', token);
    const decoded: any = jwtDecode(token);
    setUser(decoded.user);
    router.push('/blogs');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
