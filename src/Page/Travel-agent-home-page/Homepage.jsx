import React from 'react';
import { useNavigate } from "react-router-dom";
import building from '../../Assest/building.png';
import './home.css'; 
import TBoxCard from '../../Components/T-boxcard/TBoxCard';

export const Homepage = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/travelagentform");
  };

  return (
    <div className="mainbox-travel-agent">
      <div className="content-box">
        <div className="section-header">
          <div className="section-left">
            <div className="logo">
              <div className="card">
                <div className="icon">
                  <img src={building} alt="My Properties Icon" />
                </div>
                <h3>My Properties</h3>
              </div>
            </div>
            <div className="heading-box">
              <h2>My Properties Dashboard</h2>
              <p>Manage your active and in-progress properties</p>
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
          <h4>Your active properties,</h4>
          <TBoxCard />
        </div>
      </div>
    </div>
  );
};