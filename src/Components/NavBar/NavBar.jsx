import React from "react";
import { useNavigate } from "react-router-dom"; 
import "./NavBar.css";

export default function NavBar({ onSignUpClick }) {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogoClick = () => {
    navigate("/home");
  };

  return (
    <div className="chumchom-container">
      <header className="header">
        <div className="logo-container" onClick={handleLogoClick} style={{ cursor: "pointer" }}>
          <img src="logo.jpg" alt="ChumChom" className="logo-img" />
          <h2 className="logo">GhumGham</h2>
        </div>
        <nav className="navigation">
          

          <button className="nav-button">List Your Property</button>
          <button className="nav-button">Create Account</button>
          <button onClick={onSignUpClick} className="nav-button">Log In</button>
        </nav>
      </header>
    </div>
  );
}