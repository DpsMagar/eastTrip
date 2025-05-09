import React, { useState } from 'react';
import './SAHomePage.css';
import SADashBoard from '../../Components/SA-DashBoard/SADashBoard';
import SATravelAgents from '../../Components/SA-TravelAgents/SATravelAgents';
import SAUserManagement from '../../Components/SA-UserManagement/SAUserManagement';
import SAPendingLists from '../../Components/SA-PendingLists/SAPendingLists';
import TBookingCard from '../../Components/T-bookingList/TBookingCard';
import SAHotels from '../../Components/SA-Hotels/SAHotels';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt } from "react-icons/fa";

import {
  FaTachometerAlt, FaUsers, FaUserTie, FaHotel, FaHome, FaClipboardList
} from 'react-icons/fa';
import image from "../../Assest/profile.jpg"

const SAHomePage = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard': return <SADashBoard />;
      case 'User Management': return <SAUserManagement />;
      case 'Travel Agents': return <SATravelAgents />;
      case 'Properties': return <SAHotels />;
     
      case 'Pending lists': return <SAPendingLists />;
      case 'Booking': return <TBookingCard />
      default: return <SADashBoard />;
    }
  };

  const handleSignOut = () => {
    navigate('/homepage');
  };

  return (
    <div className="admin-container">
      <div className="navbar">
        <div className="logo">GhumGham</div>
        <div className="profile-section" onClick={() => setDropdownVisible(!dropdownVisible)}>
          <span>Admin</span>
          <img src={image} alt="admin" className="profile-pic" />
          {dropdownVisible && (
            <div className="dropdown-menu">
              <div onClick={handleSignOut}>Sign Out</div>
            </div>
          )}
        </div>
      </div>

      <div className="main">
        <div className="sidebar">
          <ul>
            <li onClick={() => setActiveTab('Dashboard')} className={activeTab === 'Dashboard' ? 'active' : ''}>
              <FaTachometerAlt /> Dashboard
            </li>
            <li onClick={() => setActiveTab('User Management')} className={activeTab === 'User Management' ? 'active' : ''}>
              <FaUsers /> User Management
            </li>
            <li onClick={() => setActiveTab('Travel Agents')} className={activeTab === 'Travel Agents' ? 'active' : ''}>
              <FaUserTie /> Travel Agents
            </li>
            <li onClick={() => setActiveTab('Properties')} className={activeTab === 'Properties' ? 'active' : ''}>
              <FaHotel /> Properties
            </li>

            <li onClick={() => setActiveTab('Pending lists')} className={activeTab === 'Pending lists' ? 'active' : ''}>
              <FaClipboardList /> Pending lists
            </li>
            <li onClick={() => setActiveTab('Booking')} className={activeTab === 'Booking' ? 'active' : ''}>
              <FaCalendarAlt /> Booking
            </li>


          </ul>
        </div>
        <div className="content">{renderContent()}</div>
      </div>
    </div>
  );
};

export default SAHomePage;
