import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from './auth'; // Function that checks token presence

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to='/login' replace />;
  }
  return children;
};

export default ProtectedRoute;
