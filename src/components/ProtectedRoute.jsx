import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ element, ...rest }) {
  const isAuthenticated = !!localStorage.getItem('googleAuthToken'); // Check if token exists

  return isAuthenticated ? (
    element
  ) : (
    <Navigate to="/" /> 
  );
}

export default ProtectedRoute;
