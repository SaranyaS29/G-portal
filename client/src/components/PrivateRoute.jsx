// components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { auth } = useAuth();

  if (!auth || !auth.token) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default PrivateRoute;
