'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {jwtDecode} from 'jwt-decode';

interface AuthContextType {
  user: any;
  setUser?: (user: any) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loginWithGoogle: () => void; // new Google login
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        setUser(decoded);
      } catch {
        localStorage.removeItem('token');
        setUser(null);
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (data.access_token) {
      localStorage.setItem('token', data.access_token);
      const decoded: any = jwtDecode(data.access_token);
      setUser(decoded);
      router.replace(decoded.role === 'ADMIN' ? '/admin/blogs' : '/blogs');
    } else {
      throw new Error(data.message || 'Login failed');
    }
  };

  const register = async (name: string, email: string, password: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();

    if (!res.ok) {
    throw new Error(data.message || 'Registration failed');
  }

    if (data.access_token) {
      localStorage.setItem('token', data.access_token);
      const decoded: any = jwtDecode(data.access_token);
      setUser(decoded);
      router.replace(decoded.role === 'ADMIN' ? '/admin/blogs' : '/blogs');
    }
  };


  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.replace('/login');
  };


  const loginWithGoogle = () => {
    // Redirect user to backend Google OAuth endpoint
    // Backend should handle OAuth and redirect back with JWT token
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google/callback`;
  };

  return (
    <AuthContext.Provider value={{ user,setUser, login, register, logout, loginWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
};
