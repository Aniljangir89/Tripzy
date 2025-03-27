import React, { useContext } from 'react';
import { CaptainContext } from '../src/context/CaptainContext';
import { Navigate, useNavigate } from 'react-router-dom';

const CaptainProtectWrapper = ({ children }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  if (!token) {
    return <Navigate to="/CaptainLogin" />;
  }

  return <>{children}</>;
};

export default CaptainProtectWrapper;