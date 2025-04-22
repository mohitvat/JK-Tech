"use client"

import { useEffect, useState } from 'react';
import UserTable from '@/app/components/UserTable';
import UserForm from '@/app/components/UserForm';
import { useRouter } from 'next/navigation';

export default function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser || loggedInUser.role !== 'admin') {
      router.push('/');
      return;
    }
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, [router]);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const handleSave = (user) => {
    const updatedUsers = user.id
      ? users.map((u) => (u.id === user.id ? user : u))
      : [...users, { ...user, id: Date.now() }];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setShowForm(false);
    setSelectedUser(null);
  };

  const handleClose = () => {
    setShowForm(false);
    setSelectedUser(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <button
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={() => { setSelectedUser(null); setShowForm(true); }}
      >
        Add User
      </button>
      <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full m-4">
            <UserForm
              user={selectedUser}
              onSave={handleSave}
              onCancel={handleClose}
            />
          </div>
        </div>
      )}
    </div>
  );
}