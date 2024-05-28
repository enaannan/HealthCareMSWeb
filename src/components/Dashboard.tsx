import React from 'react';
import { useAuth } from '../hooks/useAuth';


const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <p>{`Hello, ${user?.username}!`}</p>
    </div>
  );
};

export default Dashboard;
