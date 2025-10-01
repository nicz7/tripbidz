// src/Pages/Login/Login.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundimages from '../../Images/Login.jpg';
import './login.css';
import { UserContext } from '../../Components/Homepage/UserContext/Usercontext';
import { BrowserProvider } from 'ethers';

const Login = () => {
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
            setUser({ name: address.slice(0, 6) + "..." + address.slice(-4), wallet: address });

            alert("Wallet connected: " + address);
            navigate('/'); // optional: redirect after login
        } catch (err) {
            console.error("MetaMask connection failed:", err);
            alert("Failed to connect wallet.");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && password) {
            const username = email.split('@')[0];
            setUser({ name: username, wallet: "" }); // set wallet as blank
            navigate('/');
        } else {
            alert("Please fill out all fields");
        }
    };

    return (
        <div className="login-bg">
            <div className="login-overlay">
                <div className="login-header">
                    <span className="trip">Trip</span>
                    <span className="bidz">Bidz</span>
                </div>
                <div className='login-space'>
                    <div className="login-card">
                        <h2 className="login-title">Log In</h2>

                        <form onSubmit={handleSubmit}>
                            <label htmlFor="email" className="login-label">Email:</label>
                            <input
                                id="email"
                                className="login-input"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <label htmlFor="password" className="login-label">Password:</label>
                            <input
                                id="password"
                                className="login-input"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <button type="submit" className="login-btn">Log In</button>
                        </form>

                        <hr style={{ margin: '20px 0' }} />

                        <button onClick={connectWallet} className="login-btn">
                            {walletAddress
                                ? `Wallet: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
                                : "Connect MetaMask"}
                        </button>

                        <div className="login-footer">
                            Don’t have an account? <a href="/signup">Register now!</a>
                        </div>

                        <div className="login-footer">
                            Don’t have a wallet? <a href="https://metamask.io/download.html" target="_blank" rel="noreferrer">Install MetaMask</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
