import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import backgroundimages from '../../../Images/Login.jpg'
import '../AdminLogin/AdminLogin.css';
import { UserContext } from '../../Homepage/UserContext/Usercontext';
import { BrowserProvider } from 'ethers';

const AdminLogin = () => {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [walletAddress, setWalletAddress] = useState("");

    // ✅ Connect to MetaMask Wallet
    const connectWallet = async () => {
        try {
            if (!window.ethereum) {
                alert("MetaMask not installed. Please install it from https://metamask.io/");
                return;
            }

            const provider = new BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const address = await signer.getAddress();

            setWalletAddress(address);
            setUser({ 
                name: address.slice(0, 6) + "..." + address.slice(-4), 
                wallet: address,
                role: 'admin'
            });

            alert("Admin wallet connected: " + address);
            navigate('/admin-dashboard'); // redirect to admin dashboard
        } catch (err) {
            console.error("MetaMask connection failed:", err);
            alert("Failed to connect wallet.");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Basic admin validation - you can enhance this with your backend
        const validAdminEmails = ['admin@gmail.com'];
        
        if (email && password) {
            if (validAdminEmails.includes(email) && password === "admin123") {
                const username = email.split('@')[0];
                setUser({ 
                    name: username, 
                    wallet: "", 
                    role: 'admin',
                    email: email
                });
                navigate('/admin/dashboard');
            } else {
                alert("Invalid admin credentials. Please check your email and password.");
            }
        } else {
            alert("Please fill out all fields.");
        }
    };

    return (
        <div className="admin-login-bg">
            <div className="admin-login-overlay">
                <div className="admin-login-header">
                    <span className="trip">Trip<span className="bidz">Bidz</span></span>
                    <span className="admin-badge">ADMIN</span>
                </div>
                <div className='admin-login-space'>
                    <div className="admin-login-card">
                        <div className="admin-login-title-section">
                            <h2 className="admin-login-title">Login</h2>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <label htmlFor="email" className="admin-login-label">Email:</label>
                            <input
                                id="email"
                                className="admin-login-input"
                                type="email"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                            <label htmlFor="password" className="admin-login-label">Password:</label>
                            <input
                                id="password"
                                className="admin-login-input"
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <button type="submit" className="admin-login-btn primary">
                                Admin Log In
                            </button>
                        </form>

                        <hr className="admin-divider" />

                        <button onClick={connectWallet} className="admin-login-btn wallet">
                            {walletAddress
                                ? `Admin Wallet: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
                                : "Connect Admin MetaMask"}
                        </button>

                        <div className="admin-login-footer">
                            <div className="admin-footer-item">
                                Don't have an account? <a href="/admin/signup" rel="noreferrer">Create Admin Account</a>
                            </div>
                            <div className="admin-footer-item">
                                Don't have MetaMask? <a href="https://metamask.io/download.html" target="_blank" rel="noreferrer">Install MetaMask</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;