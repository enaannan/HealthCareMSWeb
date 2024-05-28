import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface ProtectedRouteProps {
  element: React.JSX.Element;
  roles: string[];
}

const AuthGuard: React.FC<ProtectedRouteProps> = ({ element, roles }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!roles.includes(user?.role_name || '')) {
    return <Navigate to="/unauthorized" replace />;
  }

  return element;
};

export default AuthGuard;
