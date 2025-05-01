import React from 'react';
import './home.css';
import { Link, useNavigate } from "react-router-dom"
import building from '../../Assest/building.png';

export const Homepage = () => {
  const navigate = useNavigate()
  const handleLogoClick = () => {
    navigate("/travelagentform")
  }
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

          <button className="add-property-btn" onClick={handleLogoClick} style={{ cursor: "pointer" }}>List Your New Property +</button>
        </div>

        <hr />
        <div className="properties-section">
          <h4>Your active properties,</h4>
        </div>
      </div>
    </div>
  );
};
