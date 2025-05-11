import React, { useEffect, useState } from 'react'
import './SADashBoard.css'
import { FaHotel, FaUsers, FaTicketAlt } from "react-icons/fa";

const SADashBoard = () => {
  const data = {
    TotalUser: 1000,
    PropertiesListed: 120,
    ActiveBookings: 409,
  }
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
  const fetchStats = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/stats");
      const data = await res.json();
      setStats(data);
      console.log(data);
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchStats();
}, []);


  return (
    <div className='sa-dashboard'>
      <div className='sa-dashboard-header'>
        <h1>Dashboard Overview</h1>
        <p>Welcome back, Super Admin</p>
      </div>

      {loading ? (
  <p></p>
) : (
  <div className='sa-dashboard-boxcards'>
    <div className='sa-dashboard-card'>
      <div className="icon"><FaUsers /></div>
      <div className="text">
        <h2>{stats.totalUsers}</h2>
        <p>Total Users</p>
      </div>
    </div>

    <div className='sa-dashboard-card'>
      <div className="icon"><FaHotel /></div>
      <div className="text">
        <h2>{stats.totalProperties}</h2>
        <p>Properties Listed</p>
      </div>
    </div>

    <div className='sa-dashboard-card'>
      <div className="icon"><FaTicketAlt /></div>
      <div className="text">
        <h2>{stats.activeBookings}</h2>
        <p>Active Bookings</p>
      </div>
    </div>
  </div>
)}

    </div>
  )
}

export default SADashBoard
