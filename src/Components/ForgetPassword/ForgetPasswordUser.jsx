"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./ForgetPasswordUser.css"

const ForgetPasswordUser = () => {
  const [email, setEmail] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPasswordReset, setShowPasswordReset] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate() 

  const validateEmail = (email) => {
    return email === "user@example.com"
  }

  const handleNextClick = () => {
    if (!email.trim()) {
      setError("Please enter your email")
      return
    }

    if (validateEmail(email)) {
      setError("")
      setShowPasswordReset(true)
    } else {
      setError("Email not found. Please try again.")
    }
  }

  const handleResetPassword = () => {
    if (!newPassword.trim()) {
      setError("Please enter a new password")
      return
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match")
      return
    }
    alert("Password reset successful!")
    setEmail("")
    setNewPassword("")
    setConfirmPassword("")
    setShowPasswordReset(false)
    setError("")
  }

  return (
    <div className="forget-password-container">
      <div className="forget-box">
        <h1>Forgot Password</h1>

        {!showPasswordReset ? (
          <div className="email-box">
            <h2>Email ID:</h2>
            <div className="input-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email"
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button className="btn" onClick={handleNextClick}>
              Next
            </button>
          </div>
        ) : (
          <div className="password-box">
            <h2>New Password:</h2>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter Password"
              />
              <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "👁️" : "👁️"}
              </span>
            </div>

            <h2>Confirm Password:</h2>
            <div className="input-group">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Enter Password"
              />
              <span className="toggle-password" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? "👁️" : "👁️"}
              </span>
            </div>

            {error && <div className="error-message">{error}</div>}
            <button className="btn" onClick={handleResetPassword}>
              CONTINUE
            </button>
          </div>
        )}
      <div className="back-to-login">
        <span onClick={() => navigate("/travelagent/login")} className="text-link">
          Back to Login
        </span>
      </div>
      </div>
    </div>
  )
}

export default ForgetPasswordUser

