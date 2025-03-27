import React, { useContext } from 'react';
import { UserDataContext } from '../src/context/UserContext';
import { Navigate, useNavigate } from 'react-router-dom';

const UserProtectWrapper = ({ children }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  if (!token) {
    return <Navigate to="/UserLogin" />;
  }

  return <>{children}</>;
};

export default UserProtectWrapper;