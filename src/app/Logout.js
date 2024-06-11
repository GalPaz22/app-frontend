'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const API_URL = 'https://app-backend-urlo.onrender.com';
const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
  });
const Logout = () => {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(null);
  

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const userId = Cookies.get('userId');

      if (!userId) {
        setAuthenticated(false);
        return;
      }

      const res = await axiosInstance.get('/check-auth', {
        headers: {
          Authorization: `Bearer ${userId}`,
        },
      });
      

      setAuthenticated(res.data.authenticated);
    } catch (error) {
      console.error('Error checking authentication:', error);
      setAuthenticated(false);
    }
  };
  useEffect(() => {
    if (authenticated === false) {
      router.push("/login"); // Redirect to login page if not authenticated
    }
  }, [authenticated, router]);


  const handleLogout = async () => {
    Cookies.remove("userId");
    setAuthenticated(false);
    try {
      await axiosInstance.post("/logout", {});
      router.push("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
   
      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
        Logout
      </button>
    
  );

};
export default Logout;