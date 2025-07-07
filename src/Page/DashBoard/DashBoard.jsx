import React from 'react';
import { useAuth } from '../../Context/Context';  // Three levels up
const Dashboard = () => {
  const { user } = useAuth(); // Using the useAuth hook from your context

  return (
    <div className="dashboard">
      <h2>User Dashboard</h2>
      
      {user ? (
        <div>
          <p>Welcome back, {user.name}!</p>
          <div className="dashboard-content">
            <h3>Your Trips</h3>
            <p>No trips booked yet.</p>
          </div>
        </div>
      ) : (
        <p>Please log in to view your dashboard.</p>
      )}
    </div>
  );
};

export default Dashboard;