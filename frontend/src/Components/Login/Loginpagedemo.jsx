import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundimages from '../../Images/Login.jpg';
import './login.css';
import { UserContext } from '../../Components/Homepage/UserContext/Usercontext';

const Login = () => {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // Fake login logic (replace with API call)
        if (email && password) {
            const username = email.split('@')[0]; // just use email name as dummy
            setUser({ name: username });
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
                                required
                            />

                            <label htmlFor="password" className="login-label">Password:</label>
                            <input
                                id="password"
                                className="login-input"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <button type="submit" className="login-btn">Log In</button>
                        </form>
                        <div className="login-footer">
                            Don’t have an account? <a href="/signup">Register now!</a>
                        </div>
                        <div className="login-copyright">
                            <span className="trip">Trip</span><span className="bidz">Bidz</span> All Rights Reserved
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
