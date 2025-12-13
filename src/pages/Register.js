import React, { useState } from 'react';
import { Link,useNavigate } from "react-router";
import { useAuth } from "../components/authContext";

import './Auth.css';

const Register = () => {
  // const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    phone: '',
    address: '',
    referral: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    // console.log('Register:', formData);


       e.preventDefault();
        // setError('');
        setIsLoading(true);
    
        // Validation
        if (!formData.username || !formData.password) {
          // setError('Please fill in all fields');
          setIsLoading(false);
          return;
        }
    
        const newUser =  {
    fullName: formData.fullName,
    username: formData.username,
    email: formData.email,
    phone: formData.phone,
    address: formData.address,
    password: formData.password
  };
        // Get registered users from localStorage
        // registeredUsers.push(newUser);
    
        if (newUser) {
          // Login successful
          register(newUser);
          setIsLoading(false);
          
          // Redirect to dashboard
          navigate('/dashboard');
        } else {
          // Login failed
          // setError('Invalid username or password');
          setIsLoading(false);
        }
  };

    if(isLoading){
    return (
     
        <div className="loading">
          <p> Loading...</p>
        </div>
     
    )
  }

  return (
    <div className="auth-container">
      <div className="auth-card register-card">
        <h1 className="auth-brand">GEODNATECH</h1>
        <h2 className="auth-title">Sign Up</h2>
        
        <div className="auth-form">
          <div className="form-group">
            <label htmlFor="fullName">FullName *</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="username">Username*</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone*</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address*</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="4"
            />
          </div>

          <div className="form-group">
            <label htmlFor="referral">Referral username [optional]</label>
            <input
              type="text"
              id="referral"
              name="referral"
              placeholder="Leave blank if no referral"
              value={formData.referral}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password*</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <small className="form-hint">min_lenght-8 mix characters [i.e musa1234]</small>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password*</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Enter same password as before"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
              />
              <span>I Agree <p className="terms-link">the terms and conditions.</p></span>
            </label>
          </div>

          <button onClick={handleSubmit} className="btn-submit btn-block">Sign Up</button>

          <div className="auth-switch">
            Already a member? <Link to="/login">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register