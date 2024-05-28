import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Role } from '../../types/roles';

interface ProtectedRouteProps {
  element: React.JSX.Element;
  roles: Role[];
}

const AuthGuard: React.FC<ProtectedRouteProps> = ({ element, roles }) => {
  const { isAuthenticated,user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!roles.includes(user?.role_name as Role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return element;
};

export default AuthGuard;
