'use client';

import { ReactNode } from "react";
import { AuthProvider } from "../context/AuthContext";
import ProtectedRoute from '../components/ProtectedRoute';

export default function Providers({ children }: { children: ReactNode }) {
  return <AuthProvider><ProtectedRoute>{children}</ProtectedRoute></AuthProvider>;
}
