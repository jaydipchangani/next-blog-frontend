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

  // Pages that are public when NOT logged in
  const publicPages = ['/login', '/register', '/signup' ,'/'];

  // If no token → redirect to login when trying to access a protected page
  if (!token && !publicPages.includes(pathname)) {
    router.replace('/login');
  }

  // If logged in → redirect away from login/register/signup
  if (token && publicPages.includes(pathname)) {
    router.replace(user?.role === 'admin' ? '/admin/blogs' : '/blogs');
  }
}, [user, pathname, router]);


  return <>{children}</>;
}
