import React, { useState } from 'react';
import backgroundimages from '../../Images/Signup.png';
import './signup.css';

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
        const handleSubmit = (e) => {
            e.preventDefault();
            // Handle login logic here
            alert(`Email: ${email}\nPassword: ${password}`);
        };

    return (
        <div className="signup-bg">
            <div className="signup-overlay">
                <div className="signup-header">
                    <span className="trip">Trip</span>
                    <span className="bidz">Bidz</span>
                </div>
                <div className='signup-space'>
                    <div className="signup-card">
                        <h2 className="signup-title">Sign Up</h2>
                        <form onSubmit={handleSubmit}>
                            <label className="signup-label" htmlFor="email">Email:</label>
                            <input
                            id="email"
                            className="signup-input"
                            type="email"
                            placeholder="Email"
                            />
                            <label className="signup-label" htmlFor="password">Password:</label>
                            <input
                            id="password"
                            className="signup-input"
                            type="password"
                            placeholder="Password"
                            />
                            <label className="signup-label" htmlFor="password">Retype Password:</label>
                            <input
                            id="retype-password"
                            className="signup-input"
                            type="password"
                            placeholder="Retype Password"
                            />
                            <div className='name-label'>
                                <label className="signup-label" htmlFor="Name">Name:</label>
                                <input
                                id="first-name"
                                className="signup-input1"
                                type="text"
                                placeholder="First Name"
                                />
                                <input
                                    id="last-name"
                                    className="signup-input2"
                                    type="text"
                                    placeholder="Last Name"
                                />
                            </div>
                            <label className="signup-label" htmlFor="Name">Phone Number:</label>
                            <input
                            id="phone-number"
                            className="signup-input"
                            type="text"
                            placeholder="Phone Number"
                            />

                            <label className="signup-label" htmlFor="Name">Occupation:</label>
                            <input
                            id="occupation"
                            className="signup-input"
                            type="text"
                            placeholder="Occupation"
                            />

                            <label className="signup-label" htmlFor="Name">Location:</label>
                            <input
                            id="location"
                            className="signup-input"
                            type="text"
                            placeholder="Location"
                            />
                            
                            <button className="signup-btn" type="submit">Sign up</button>
                        </form>
                        <div className="signup-footer">
                            Already have an account? <a href="/login">Login now!</a>
                        </div>
                        <div className="signup-copyright">
                            <span className="trip">Trip</span><span className="bidz">Bidz</span> All Rights Reserved
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp;