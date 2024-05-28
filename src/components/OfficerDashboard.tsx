import React from 'react';
import { useAuth } from '../hooks/useAuth';


const OfficerDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <p>{`Hello, ${user?.username}!`}</p>
    </div>
  );
};

export default OfficerDashboard;
