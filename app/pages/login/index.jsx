"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage({setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      setUsers([
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user', password: 'password123' },
        { id: 2, name: 'Admin User', email: 'admin@example.com', role: 'admin', password: 'password123' },
      ]);
      localStorage.setItem('users', JSON.stringify(users));
    }
  }, []);

  const handleLogin = (e) => {
  

    e.preventDefault();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      setUser(user);
      router.push('/');
    } else {
      alert('Invalid credentials');
    }
    
  };

  const handleSignup = (e) => {
  

    e.preventDefault();
    if (users.some(u => u.email === email)) {
      alert('Email already exists');
      return;
    }
  
    const role = email === 'admin@example.com' ? 'admin' : 'user'; 
    const newUser = { id: Date.now(), name, email, role, password };
const updatedUsers = [...users, newUser];
setUsers(updatedUsers);
localStorage.setItem('users', JSON.stringify(updatedUsers));
localStorage.setItem('loggedInUser', JSON.stringify(newUser));
setUser(newUser); // ✅ here
router.push('/');

  };
  

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    router.push('/');
  };

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  if (loggedInUser) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Welcome, {loggedInUser.name}</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      
      </div>
    );
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login or Signup</h1>
      <div className="space-y-6">
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <div>
          <h2 className="text-lg font-semibold mb-2">Signup</h2>
          <form onSubmit={handleSignup} className="space-y-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-2 border rounded"
              required
            />
            <button
              type="submit"
              className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Signup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}