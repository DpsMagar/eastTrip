import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SALogin.css';
import eyeshown from '../../Assest/eyeshown.png';
import eyeoff from '../../Assest/eyeoff.png';

const SALogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    const correctUsername = "admin";
    const correctPassword = "admin123";

    if (username === correctUsername && password === correctPassword) {
      navigate('/superadminhomepage');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="salogin">
      <div className="login-box">
        <h2>Welcome, Admin</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              placeholder="Enter Username" 
              id="username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter Password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <img
                src={showPassword ? eyeoff : eyeshown}
                alt="toggle"
                onClick={togglePassword}
                className="eye-icon"
              />
            </div>
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default SALogin;