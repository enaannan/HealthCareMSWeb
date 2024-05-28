import React from 'react';
import { Navigate } from 'react-router-dom';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import ProtectedRoute from '../components/Auth/AuthGuard';
import Dashboard from '../components/Dashboard';
import OfficerConsultations from '../components/OfficerConsultations';
import PatientConsultations from '../components/PatientConsultations';
import Unauthorized from '../components/Unauthorized';


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
    element: <Register />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute roles={['officer', 'patient']} element={<Dashboard />} />
    ),
  },
  {
    path: '/officer/consultations',
    element: (
      <ProtectedRoute roles={['officer']} element={<OfficerConsultations />} />
    ),
  },
  {
    path: '/patient/consultations',
    element: (
      <ProtectedRoute roles={['patient']} element={<PatientConsultations />} />
    ),
  },
  {
    path: '/unauthorized',
    element: <Unauthorized />,
  },
];

export default MainRoutes;
