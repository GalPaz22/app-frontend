'use client';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';

const API_URL = 'https://app-backend-urlo.onrender.com'; // Adjust this URL to your backend

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginloading, setLoginloading] = useState(false);
  ;
  const getSessionId = () => {
    // Generate a unique session ID using uuidv4
    return uuidv4();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginloading(true);
    const sessionId = getSessionId(); // Get the session ID
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password, sessionId }, { withCredentials: true });
      const { userId } = response.data;

      // Set a cookie with the userId
      Cookies.set('userId', userId, { expires: 1 / 1440 });// Expires in 1 day
      
      


      // Redirect to the "ask" page after successful login
      console.log('Login successful');
      window.location.href = '/ask';
    } catch (error) {
      console.error('Error with login:', error);
      alert(error);
      setLoginloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center">
      <form onSubmit={handleLogin} className="bg-gray-200 p-6 rounded-md shadow-md">
        <h1 className="text-3xl font-bold mb-4">Login</h1>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-bold">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Login
        </button>
        {loginloading && <p className="mt-4 ">Loading...</p>}
      </form>
    </div>
  );
}
