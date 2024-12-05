import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role }) => {
  const userRole = localStorage.getItem('role');

  if (!userRole || userRole !== role) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
