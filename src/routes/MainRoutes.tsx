import React from 'react';
import { Navigate } from 'react-router-dom';
import Login from '../components/Auth/Login';

const MainRoutes = [
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <div>Register</div>,
  },
];

export default MainRoutes;
