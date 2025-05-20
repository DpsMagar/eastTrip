import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import building from '../../Assest/building.png';
import './home.css'; 
import TBoxCard from '../../Components/T-boxcard/TBoxCard';
import TBookingCard from '../../Components/T-bookingList/TBookingCard';
import { FaHotel } from "react-icons/fa6"

export const Homepage = () => {
  const userID= sessionStorage.getItem('userId');
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('properties');
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const handleLogoClick = () => {
    navigate("/travelagentform");
  };
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(`https://easttrip.onrender.com/api/user-properties/user/${userID}`);
        console.log("user Id is,", userID);
        
        if (!response.ok) throw new Error('Failed to fetch properties');
        const data = await response.json();
        setProperties(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="mainbox-travel-agent">
      <div className="content-box">
        <div className="section-header">
                      {/* <div className="logo">
              <div className="card">
                <div className="icon">
                  <FaHotel className="hotel-icon" />
                </div>
                <h3>My Properties</h3>
              </div>
            </div> */}
          <div className="section-left">

            <div className="heading-box">
  <div className="header-upper">
    <h2>My Properties Dashboard</h2>
    <p>Manage your active and in-progress properties</p>
  </div>

  <div className="headingbottom">
    <button 
      className={`button ${activeTab === 'properties' ? 'active' : ''}`} 
      onClick={() => setActiveTab('properties')}
    >
      Active Properties
    </button>
    <button 
      className={`button ${activeTab === 'bookings' ? 'active' : ''}`}
      onClick={() => setActiveTab('bookings')}
    >
      Latest Booking
    </button>
  </div>
</div>


          </div>


          <div className="auth-actions">
            <button 
              className="add-property-btn" 
              onClick={handleLogoClick}
            >
              List Your New Property +
            </button>
          </div>
        </div>

        <hr />
        <div className="properties-section">
          {activeTab === 'properties' && (
            <div className="activeproperties">
              <h4>Your active properties:</h4>
              <TBoxCard />
            </div>
          )}
          
          {activeTab === 'bookings' && (
            <div className="booking">
              <TBookingCard/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};