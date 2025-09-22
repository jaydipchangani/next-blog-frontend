'use client';

import React from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { useAuth } from '../../context/AuthContext';
import ProtectedRoute from '../../components/ProtectedRoute';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  // Show loading until user is restored
  if (!user) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    // Only allow admin users to access
    <ProtectedRoute role="admin">
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <Sidebar role="admin" />

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminLayout;
