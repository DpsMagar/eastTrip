"use client"

import { useState, useEffect, useRef } from "react"
import "./SignUp.css"
import { useDispatch } from "react-redux"
import { useLoginMutation, useRegisterMutation } from "../../features/api/authApi";
import { setToken } from "../../features/slice/authSlice";
import eyeshown from '../../Assest/eyeshown.png';
import eyeoff from '../../Assest/eyeoff.png';

export default function SignUp({ onClose, switchToLogin }) {

  const dispatch = useDispatch();
  const [register, { isLoading, loginError }] = useRegisterMutation();

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

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

    const dto = {
      fullName: name,
      email, 
      password,
      confirmPassword,
    }

    try {
      const response = await register(dto).unwrap();
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
                    <img 
                      src={showPassword ? eyeoff : eyeshown} 
                      alt={showPassword ? "Hide password" : "Show password"}
                      width="24"
                      height="24"
                    />
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
                    <img 
                      src={showConfirmPassword ? eyeoff : eyeshown} 
                      alt={showConfirmPassword ? "Hide password" : "Show password"}
                      width="24"
                      height="24"
                    />
                  </button>
                </div>
              </div>

              <div className="signup__terms">
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
              <div className="divider">
                <span>Or Log in with</span>
              </div>

              <button type="button" className="google-button">
                <div className="google-icon">
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                </div>
                Continue With Google
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