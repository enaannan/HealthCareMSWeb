import React from 'react';
import { Navigate } from 'react-router-dom';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import MainLayout from '../components/MainLayout';
import OfficerConsultations from '../components/OfficerConsultations';
import OfficerDashboard from '../components/OfficerDashboard';
import PatientConsultations from '../components/PatientConsultations';
import PatientDashboard from '../components/PatientDashboard';
import Unauthorized from '../components/Unauthorized';
import { Roles } from '../types/roles';
import AuthGuard from '../components/Auth/AuthGuard';


const MainRoutes =  [
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
      path: '/unauthorized',
      element: <Unauthorized />,
    },
    {
      path: '/',
      element: (
        <AuthGuard roles={[Roles.OFFICER, Roles.PATIENT]} element={<MainLayout />} />
      ),
      children: [
        {
          path: 'officer/dashboard',
          element: <AuthGuard roles={[Roles.OFFICER]} element={<OfficerDashboard />} />,
        },
        {
          path: 'patient/dashboard',
          element: <AuthGuard roles={[Roles.PATIENT]} element={<PatientDashboard />} />,
        },
        {
          path: 'officer/consultations',
          element: <AuthGuard roles={[Roles.OFFICER]} element={<OfficerConsultations />} />,
        },
        {
          path: 'patient/consultations',
          element: <AuthGuard roles={[Roles.PATIENT]} element={<PatientConsultations />} />,
        },
      ],
    },
  ];

export default MainRoutes;
