'use client';

import { Suspense } from 'react';
import GoogleCallbackPage from './GoogleCallbackInner'

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GoogleCallbackPage />
    </Suspense>
  );
}
