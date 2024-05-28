import React from 'react';
import { useAuth } from '../hooks/useAuth';


const NurseDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>Welcome to the Dashboard Nurse !</h1>
      <p>{`Hello, ${user?.username}!`}</p>
    </div>
  );
};

export default NurseDashboard;
