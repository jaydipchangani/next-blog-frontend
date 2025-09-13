'use client';
import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '../../../../context/AuthContext';
import {jwtDecode} from 'jwt-decode';

const GoogleCallbackPage = () => {
  const router = useRouter();
  const params = useSearchParams();
  const { setUser }: any = useAuth();

  useEffect(() => {
  console.log('GoogleCallbackPage mounted');
  const token = params.get('token');
  console.log('token from URL:', token);

  if (token && typeof token === 'string' && setUser) {
    try {
      localStorage.setItem('token', token);
      const decoded: any = jwtDecode(token);
      console.log('decoded JWT:', decoded);

      setUser(decoded);
      setTimeout(() => {
        router.replace(decoded.role === 'admin' ? '/admin/blogs' : '/blogs');
      }, 100);
    } catch (err) {
      console.error('Failed to decode token:', err);
      router.replace('/login');
    }
  } else {
    router.replace('/login');
  }
}, [params, router, setUser]);


  return <div className="flex justify-center items-center h-screen">Logging in...</div>;
};

export default GoogleCallbackPage;
