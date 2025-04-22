'use client'

import React, { useEffect, useState } from 'react';

import UserManagementPage from './pages/admin/users';
import DocumentsPage from './pages/documents';
import IngestionPage from './pages/ingestion';
import QAInterface from './pages/qa';
import LoginPage from './pages/login';

const Page = () => {
  const [user, setUser] = useState(null);
  

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem('loggedInUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setUser(null); 
  };

  if (!user) {
    return<LoginPage setUser={setUser} />
    ;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {user.role === 'admin' && <UserManagementPage />}
      <DocumentsPage />
      <IngestionPage />
      <QAInterface />
    </div>
  );
};

export default Page;
