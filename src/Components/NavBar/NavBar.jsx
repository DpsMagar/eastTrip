"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import Login from "../LogIn/Login"
import SignUp from "../SignUp/SignUp"
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
  if (!currentUser) {
    openLoginModal()
    return
  }
  navigate("/travelagent")
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
    <div className="gh-navbar-container">
      <header className="gh-navbar">
        <div className="gh-logo-section" onClick={handleLogoClick}>
          
          <h2 className="gh-logo-text">GhumGham</h2>
        </div>

        {!currentUser ? (
          <div className="gh-nav-buttons">
            <button className="gh-nav-btn" onClick={goToTravellerPage}>
              List Your Property
            </button>
            <button className="gh-nav-btn" onClick={openSignupModal}>
              Create Account
            </button>
            <button onClick={openLoginModal} className="gh-nav-btn">
              Log In
            </button>
          </div>
        ) : (
          <div className="gh-nav-buttons">
            <button className="gh-nav-btn"onClick={goToTravellerPage}>List your Property</button>
            
            <div className="gh-user-section" onClick={toggleUserDropdown}>
              <span className="gh-greeting">Hi, {currentUser || "Traveller"}</span>
              <div className="gh-avatar">
                <img src={image || currentUser?.image} alt="Profile" />
              </div>
              {userDropdownOpen && (
                <div className="gh-dropdown">
                  <Link to="/profile" className="gh-dropdown-link">
                    Profile
                  </Link>
                  <button onClick={handleSignOut} className="gh-dropdown-btn">
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {isLoginModalOpen && <Login onClose={closeAllModals} switchToSignup={openSignupModal} />}
      {isSignupModalOpen && <SignUp onClose={closeAllModals} switchToLogin={openLoginModal} />}
    </div>
  )
}
