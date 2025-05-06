"use client"

import { useState, useEffect, useRef } from "react"
import "./SignUp.css"
import { useDispatch } from "react-redux"
import { useLoginMutation, useRegisterMutation } from "../../features/api/authApi";
import { setToken } from "../../features/slice/authSlice";

export default function SignUp({ onClose, switchToLogin }) {

  const dispatch= useDispatch();
  const[register, {isLoading, loginError }]=useRegisterMutation();

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  

  

  

  const modalRef = useRef(null)

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose()
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (!agreeTerms) {
      setError("You must agree to the terms and conditions")
      return
    }

    const dto= {
      fullName: name,
      email, 
      password,
      confirmPassword,
    }

    try {
      const response= await register(dto).unwrap();
      console.log(response);
      dispatch(setToken(response));
      
      onClose()
    } catch (err) {
      console.log(err);
      
      setError("Failed to create an account. Please try again.")
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  return (
    <div className="signup__wrapper">
      <div className="signup__overlay">
        <div className="signup__modal" ref={modalRef}>
          <button className="signup__close-btn" onClick={onClose}>
            ×
          </button>

          <div className="signup__content">
            <h1 className="signup__title">Sign Up Now</h1>

            {error && <div className="signup__error">{error}</div>}

            <form onSubmit={handleSubmit} className="signup__form">
              <div className="signup__form-group">
                <label htmlFor="name" className="signup__label">Full Name</label>
                <input
                  id="name"
                  type="text"
                  className="signup__input"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="signup__form-group">
                <label htmlFor="signup-email" className="signup__label">Email</label>
                <input
                  id="signup-email"
                  type="email"
                  className="signup__input"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="signup__form-group">
                <label htmlFor="signup-password" className="signup__label">Password</label>
                <div className="signup__password-container">
                  <input
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    className="signup__input"
                    placeholder="Create password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="signup__password-toggle"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                        <line x1="2" x2="22" y1="2" y2="22"></line>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    )}
                  </button>
                </div>
                <small className="signup__password-hint">Password must be at least 8 characters</small>
              </div>

              <div className="signup__form-group">
                <label htmlFor="confirm-password" className="signup__label">Confirm Password</label>
                <div className="signup__password-container">
                  <input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    className="signup__input"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="signup__password-toggle"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                        <line x1="2" x2="22" y1="2" y2="22"></line>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="signup__terms">
                <input
                  type="checkbox"
                  id="agree-terms"
                  className="signup__checkbox"
                  checked={agreeTerms}
                  onChange={() => setAgreeTerms(!agreeTerms)}
                  required
                />
                <label htmlFor="agree-terms" className="signup__terms-label">
                  By creating an account, you agree to GhumGhamNepal's{" "}
                  <a href="/privacy-policy" className="signup__terms-link">
                    Privacy Policy
                  </a>
                  ,{" "}
                  <a href="/user-agreement" className="signup__terms-link">
                    User Agreement and T&Cs
                  </a>
                </label>
              </div>

              <button type="submit" className="signup__continue-btn">
                CONTINUE
              </button>

             
              <div className="signup__login-link">
                <p>
                  Already have an account?{" "}
                  <a href="#" onClick={switchToLogin} className="signup__login-text">
                    Log In
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}