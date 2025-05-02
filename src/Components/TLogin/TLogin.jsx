"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./TLogin.css"

const TLogin = () => {
  // Hardcoded credentials for verification
  const validCredentials = {
    email: "something@gmail.com",
    password: "1234"
  }

  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    auth: "" // Added for authentication errors
  })
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData({
      ...formData,
      [id]: value,
    })

    if (errors[id] || errors.auth) {
      setErrors({
        ...errors,
        [id]: "",
        auth: ""
      })
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const validateForm = () => {
    let isValid = true
    const newErrors = { ...errors }

    if (!formData.email.trim()) {
      newErrors.email = "Email cannot be empty"
      isValid = false
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password cannot be empty"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    
    // Simulate API call with timeout
    setTimeout(() => {
      if (formData.email === validCredentials.email && 
          formData.password === validCredentials.password) {
        // Successful login
        console.log("Login successful")
        navigate("/travelagent") // Redirect to travel agent dashboard
      } else {
        // Failed login
        setErrors({
          ...errors,
          auth: "Invalid email or password"
        })
      }
      setIsLoading(false)
    }, 1000) // Simulate network delay
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>List your Property</h1>
        {errors.auth && <div className="error-message auth-error">{errors.auth}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "input-error" : ""}
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "input-error" : ""}
              />
              <button 
                type="button" 
                className="toggle-password" 
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <span className="eye-icon">👁️</span> : <span className="eye-icon">👁️‍🗨️</span>}
              </button>
            </div>
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>

          <button 
            type="submit" 
            className="continue-btn"
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "CONTINUE"}
          </button>
        </form>

        <div className="forgot-password">
          <span 
            onClick={() => navigate("/travelagent/forgot-password")}
            className="text-link"
          >
            Forget Password?
          </span>
        </div>

        <div className="create-account">
          New here?{' '}
          <span 
            onClick={() => navigate("/travelagent/signup")}
            className="text-link"
          >
            Create an Account
          </span>
        </div>

        <div className="terms-conditions">
          By signing in or creating an account, you agree to GhumGham Nepal's <a href="/privacy">Privacy Policy</a>,{" "}
          <a href="/agreement">User Agreement</a> and <a href="/terms">T&Cs</a>
        </div>
      </div>
    </div>
  )
}

export default TLogin