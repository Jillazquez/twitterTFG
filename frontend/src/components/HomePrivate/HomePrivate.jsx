import React from 'react';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const PrivateRoute = ({ children }) => {


  const token = localStorage.getItem('token');

  // Si no hay token, redirigir al login
  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
