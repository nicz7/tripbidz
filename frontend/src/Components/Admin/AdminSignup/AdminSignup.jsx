import React, { useState } from 'react';
import './AdminSignup.css';

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    department: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.username) {
      newErrors.username = 'Username is required';
    }

    if (!formData.firstName) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    }

    if (!formData.department) {
      newErrors.department = 'Department is required';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      // Handle successful form submission
      console.log('Admin signup data:', formData);
      // Add your API call here
      alert('Admin account created successfully!');
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="admin-signup-container">
      <div className="signup-background-overlay"></div>
      
      {/* Logo */}
      <div className="logo">
        Trip<span className="logo-highlight">Bidz</span>
      </div>

      {/* Signup Form */}
      <div className="signup-form-container">
        <div className="signup-form">
          <h2 className="signup-form-title">Sign Up</h2>
          
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="signup-form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            {/* Password */}
            <div className="signup-form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className={errors.password ? 'error' : ''}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            {/* Confirm Password */}
            <div className="signup-form-group">
              <label htmlFor="confirmPassword">Retype Password:</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Retype Password"
                className={errors.confirmPassword ? 'error' : ''}
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>

            {/* Username */}
            <div className="signup-form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Username"
                className={errors.username ? 'error' : ''}
              />
              {errors.username && <span className="error-message">{errors.username}</span>}
            </div>

            {/* Name Fields */}
            <div className="signup-form-group">
              <label>Name:</label>
              <div className="name-row">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name"
                  className={errors.firstName ? 'error' : ''}
                />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                  className={errors.lastName ? 'error' : ''}
                />
              </div>
              {errors.firstName && <span className="error-message">{errors.firstName}</span>}
              {errors.lastName && <span className="error-message">{errors.lastName}</span>}
            </div>

            {/* Phone Number */}
            <div className="signup-form-group">
              <label htmlFor="phoneNumber">Phone Number:</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Phone Number"
                className={errors.phoneNumber ? 'error' : ''}
              />
              {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
            </div>

            {/* Department */}
            <div className="signup-form-group">
              <label htmlFor="department">Department:</label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className={errors.department ? 'error' : ''}
              >
                <option value="">Select Department</option>
                <option value="operations">Operations</option>
                <option value="customer-service">Customer Service</option>
                <option value="marketing">Marketing</option>
                <option value="finance">Finance</option>
                <option value="it">IT & Technical</option>
                <option value="management">Management</option>
              </select>
              {errors.department && <span className="error-message">{errors.department}</span>}
            </div>

            {/* Submit Button */}
            <button type="submit" className="signup-button">
              Create Admin Account
            </button>
          </form>

          {/* Login Link */}
          <div className="login-link">
            Already have an admin account? <a href="/admin/login">Login now!</a>
          </div>

          {/* Footer */}
          <div className="form-footer">
            <span className="brand-name">Trip</span>
            <span className="brand-highlight">Bidz</span>
            <span className="rights-text"> All Rights Reserved</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSignup;