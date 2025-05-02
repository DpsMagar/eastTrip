"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./TSignUp.css"

const TSignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const navigate = useNavigate() 

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData({
      ...formData,
      [id]: value,
    })
    if (errors[id]) {
      setErrors({
        ...errors,
        [id]: "",
      })
    }
  }

  const validateForm = () => {
    let isValid = true
    const newErrors = { ...errors }

    Object.keys(formData).forEach((field) => {
      if (!formData[field].trim()) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} cannot be empty`
        isValid = false
      }
    })

    if (formData.password !== formData.confirmPassword && formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      console.log("Form submitted:", formData)
      // This remains unchanged as per your request
    }
  }

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1>Create an Account</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter Your Full Name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? "input-error" : ""}
              required
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "input-error" : ""}
              required
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
                required
              />
              <button type="button" className="toggle-password" onClick={togglePasswordVisibility}>
                {showPassword ? <span className="eye-icon">👁️</span> : <span className="eye-icon">👁️‍🗨️</span>}
              </button>
            </div>
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="password-input-container">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? "input-error" : ""}
                required
              />
              <button type="button" className="toggle-password" onClick={toggleConfirmPasswordVisibility}>
                {showConfirmPassword ? <span className="eye-icon">👁️</span> : <span className="eye-icon">👁️‍🗨️</span>}
              </button>
            </div>
            {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
          </div>

          <button type="submit" className="create-account-btn">
            CREATE ACCOUNT
          </button>
        </form>

        <div className="already-have-account">
        <span 
            onClick={() => navigate("/travelagent/login")}
            className="text-link"
          >
            Already have an account? Log in
          </span>
       
      </div>

        <div className="terms-conditions">
          By signing in or creating an account, you agree to GhumGhum Nepal's <a href="/privacy">Privacy Policy</a>,{" "}
          <a href="/agreement">User Agreement</a> and <a href="/terms">T&Cs</a>
        </div>
      </div>
    </div>
  )
}

export default TSignUp