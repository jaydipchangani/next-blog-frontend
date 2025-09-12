'use client';

import { useContext, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {  useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()!;
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem('token');

    // If no token → force to /login
    if (!token && pathname !== '/login' && pathname !== '/register') {
      router.replace('/login');
    }

    // If already logged in → prevent going back to login/register
    if (token && (pathname === '/login' || pathname === '/register')) {
      router.replace(user?.role === 'ADMIN' ? '/admin/blogs' : '/blogs');
    }
  }, [user, pathname, router]);

  return <>{children}</>;
}
