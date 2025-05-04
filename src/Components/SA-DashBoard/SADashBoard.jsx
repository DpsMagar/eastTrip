import React from 'react'
import './SADashBoard.css'
import { FaHotel, FaUsers, FaTicketAlt } from "react-icons/fa";

const SADashBoard = () => {
  const data = {
    TotalUser: 1000,
    PropertiesListed: 120,
    ActiveBookings: 409,
  }

  return (
    <div className='sa-dashboard'>
      <div className='sa-dashboard-header'>
        <h1>Dashboard Overview</h1>
        <p>Welcome back, Super Admin</p>
      </div>

      <div className='sa-dashboard-boxcards'>
        <div className='sa-dashboard-card'>
          <div className="icon"><FaUsers /></div>
          <div className="text">
            <h2>{data.TotalUser}</h2>
            <p>Total Users</p>
          </div>
        </div>

        <div className='sa-dashboard-card'>
          <div className="icon"><FaHotel /></div>
          <div className="text">
            <h2>{data.PropertiesListed}</h2>
            <p>Properties Listed</p>
          </div>
        </div>

        <div className='sa-dashboard-card'>
          <div className="icon"><FaTicketAlt /></div>
          <div className="text">
            <h2>{data.ActiveBookings}</h2>
            <p>Active Bookings</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SADashBoard
