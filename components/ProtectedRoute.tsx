'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({
  children,
  role, 
}: {
  children: React.ReactNode;
  role?: 'admin' | 'user';
}) {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token && pathname !== '/login' && pathname !== '/register') {
      router.replace('/login');
      return;
    }

    if (token && (pathname === '/login' || pathname === '/register')) {
      router.replace(user?.role === 'admin' ? '/admin/blogs' : '/blogs');
      return;
    }

    if (role && user && user.role !== role) {
      router.replace(user.role === 'admin' ? '/admin/blogs' : '/blogs');
    }
  }, [user, pathname, router, role]);

  return <>{children}</>;
}
