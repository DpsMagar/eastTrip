"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import Login from "../LogIn/Login"
import SignUp from "../SignUp/SignUp"
import ForgetPassword  from "../ForgetPassword/ForgetPasswordUser"
import "./NavBar.css"
import image from "../../Assest/profile.jpg"

export default function NavBar() {
  const navigate = useNavigate()
  const { currentUser, signOut } = useAuth()
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)

  const handleLogoClick = () => {
    navigate("/home")
  }

  const handleSignOut = () => {
    signOut()
    navigate("/home")
  }

  const goToTravellerPage = () => {
    navigate("/travelagent/login") 
  }

  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen)
  }

  const openLoginModal = () => {
    setIsSignupModalOpen(false)
    setIsLoginModalOpen(true)
  }

  const openSignupModal = () => {
    setIsLoginModalOpen(false)
    setIsSignupModalOpen(true)
  }

  const closeAllModals = () => {
    setIsLoginModalOpen(false)
    setIsSignupModalOpen(false)
  }

  return (
    <div className="chumchom-container">
      <header className="header">
        <div className="logo-container" onClick={handleLogoClick} style={{ cursor: "pointer" }}>
          
          <h2 className="logo">GhumGham</h2>
        </div>

        {!currentUser ? (
          <nav className="navigation">
            <button className="nav-button" onClick={goToTravellerPage}>List Your Property</button>
            <button className="nav-button" onClick={openSignupModal}>
              Create Account
            </button>
            <button onClick={openLoginModal} className="nav-button">
              Log In
            </button>
          </nav>
        ) : (
          <nav className="navigation">
            <button className="nav-button orange" onClick={goToTravellerPage}>List your Property</button>
            <button className="nav-button orange">Messages</button>
            <div className="user-profile">
              <button className="user-profile-button" onClick={toggleUserDropdown}>
                <span>Hi, {currentUser?.name || "Traveller"}</span>
                <div className="profile-icon">
                  <img src={image} alt="Profile" width={24} height={24} className="profile-img" />
                </div>
              </button>
              {userDropdownOpen && (
                <div className="user-dropdown">
                  <Link to="/profile">Profile</Link>
                  <button onClick={handleSignOut}>Sign Out</button>
                </div>
              )}
            </div>
          </nav>
        )}
      </header>

      {isLoginModalOpen && <Login onClose={closeAllModals} switchToSignup={openSignupModal} />}

      {isSignupModalOpen && <SignUp onClose={closeAllModals} switchToLogin={openLoginModal} />}
    </div>
  )
}

