import React, { useContext, useEffect, useState } from 'react';
import { UserDataContext } from '../src/context/UserContext'; // Fix import path
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserProtectWrapper = ({ children }) => {
  const token = localStorage.getItem('token'); // Retrieve token from localStorage
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext); // Use context for user data
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    // If no token exists, redirect to login page
    if (!token) {
      navigate('/userLogin');
      return;
    }

    // Fetch user profile data from the server
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in headers
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data); // Store the fetched user data in context
          setIsLoading(false); // Set loading state to false after data is fetched
        }
      })
      .catch((err) => {
        console.error(err);
        localStorage.removeItem('token'); // Remove token if an error occurs
        navigate('/userLogin'); // Redirect to login if fetch fails
      });
  }, [token, navigate, setUser]); // Dependencies ensure effect runs when token changes

  if (isLoading) {
    return <div>Loading...</div>; // Display loading message while waiting for data
  }

  return <>{children}</>; // Render children once data is loaded and user is authenticated
};

export default UserProtectWrapper;
