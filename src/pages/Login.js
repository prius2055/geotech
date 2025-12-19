import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router";
import { useAuth } from "../components/authContext";
import Loading from '../components/Loading';

import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login, user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validation
    if (!email || !password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    try {
      const result = await login(email.trim(), password.trim());

      if (result.success) {
        setError(false)
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        setError(`${result.message}. Please check your connection and try again` || 'Invalid email or password');
        setIsLoading(false);
      }
    } catch (error) {
      setError(error.message || 'Login failed. Please check your network and try again');
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="loading">
       <Loading message="Signing In..." fullScreen={true} size="large" />
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-brand">GEODNATECH</h1>
        <h2 className="auth-title">Sign In</h2>
        
        <div className="auth-form">
          {error && (
            <div style={{ 
              padding: '12px', 
              marginBottom: '20px', 
              backgroundColor: '#fee2e2', 
              color: '#dc2626',
              borderRadius: '8px',
              fontSize: '14px',
              border: '1px solid #fecaca'
            }}>
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password*</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </div>

          <div className="form-footer">
            <p className="forgot-link">Forgot Password?</p>
            <button 
              onClick={handleSubmit} 
              className="btn-submit"
              disabled={isLoading || !email || !password }
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </div>

          <div className="auth-switch">
            Don't have an account yet? 
            <Link to="/signup"> Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;