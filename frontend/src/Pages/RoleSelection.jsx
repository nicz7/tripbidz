import React from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../Images/Login.jpg';
import './RoleSelection.css';

const RoleSelection = () => {
    const navigate = useNavigate();

    const handleUserLogin = () => {
        navigate('/login');
    };

    const handleAdminLogin = () => {
        navigate('/admin/login');
    };

    return (
        <div className="role-selection-bg">
            <div className="role-selection-overlay">
                <div className="role-selection-header">
                    <span className="trip">Trip<span className="bidz">Bidz</span></span>
                </div>
                
                <div className="role-selection-content">
                    <div className="role-selection-card">
                        <div className="role-title-section">
                            <h1 className="role-main-title">Welcome to TripBidz</h1>
                            <p className="role-subtitle">Choose your login type to continue</p>
                        </div>

                        <div className="role-buttons-container">
                            <div className="role-option user-option">
                                <div className="role-icon">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="role-svg">
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                    </svg>
                                </div>
                                <h3 className="role-option-title">User Login</h3>
                                <p className="role-option-description">
                                    Browse and bid on amazing travel experiences
                                </p>
                                <button 
                                    className="role-btn user-btn"
                                    onClick={handleUserLogin}
                                >
                                    Continue as User
                                </button>
                            </div>

                            <div className="role-option admin-option">
                                <div className="role-icon admin-icon">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="role-svg">
                                        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                                    </svg>
                                </div>
                                <h3 className="role-option-title">Admin Login</h3>
                                <p className="role-option-description">
                                    Manage platform operations and user activities
                                </p>
                                <button 
                                    className="role-btn admin-btn"
                                    onClick={handleAdminLogin}
                                >
                                    Continue as Admin
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoleSelection;