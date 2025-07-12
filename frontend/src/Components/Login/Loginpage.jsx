import React, { useState } from 'react';
import backgroundimages from '../../Images/Login.jpg';
import './login.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        alert(`Email: ${email}\nPassword: ${password}`);
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
                            <label className="login-label" htmlFor="email">Email:</label>
                            <input
                            id="email"
                            className="login-input"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            />

                            <label className="login-label" htmlFor="password">Password:</label>
                            <input
                            id="password"
                            className="login-input"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            />

                            <button className="login-btn" type="submit">Log In</button>
                        </form>
                        <div className="login-footer">
                            Don&apos;t have an account? <a href="/signup">Register now!</a>
                        </div>
                        <div className="login-copyright">
                            <span className="trip">Trip</span><span className="bidz">Bidz</span> All Rights Reserved
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;