// src/Components/Navbar/Navbar.jsx
import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './navbar.css';
import { RiCloseFill } from "react-icons/ri";
import { TbGridDots } from 'react-icons/tb';
import { IoNotificationsOutline } from "react-icons/io5";
import { UserContext } from '../UserContext/Usercontext';
import { IoLogOut } from "react-icons/io5";

const Navbar = () => {
    const [active, setActive] = useState('navBar');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const dropdownRef = useRef();

    const showNav = () => setActive('navBar activeNavbar');
    const removeNavbar = () => setActive('navBar');

    const handleProtectedClick = (path) => {
        if (user) {
            navigate(path);
            removeNavbar();
        } else {
            alert('Please login or sign up first.');
        }
    };

    const handleLogout = () => {
        setUser(null);
        navigate('/');
        removeNavbar();
        setIsDropdownOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <section className='navBarSection'>
            <header className="header flex">
                <div className="logoDiv">
                    <Link to="/" className="logo flex">
                        <h1>Trip<span className="logohighlight">Bidz</span></h1>
                    </Link>
                </div>

                <div className={active}>
                    <div className="navBarContent flex">
                        <div className='navBarContent1 flex'>
                            <ul className="navLists flex">
                                <li className="navItem"><span onClick={() => handleProtectedClick('/itinerary')} className="navLink">Itinerary</span></li>
                                <li className="navItem"><span onClick={() => handleProtectedClick('/auction')} className="navLink">Auction</span></li>
                                <li className="navItem"><span onClick={() => handleProtectedClick('/reward')} className="navLink">Reward</span></li>
                                <li className="navItem"><span onClick={() => handleProtectedClick('/profile')} className="navLink">Profile</span></li>
                            </ul>
                        </div>

                        <div className="authLinks flex">
                            {user ? (
                                <div className="user-loggedin flex" ref={dropdownRef}>
                                    <IoNotificationsOutline className="notification-icon" />
                                    <div className="user-dropdown">
                                        <span
                                            className="username"
                                            onClick={() => setIsDropdownOpen(prev => !prev)}
                                        >
                                            {user.wallet
                                                ? `${user.wallet.slice(0, 6)}...${user.wallet.slice(-4)}`
                                                : user.name}
                                        </span>
                                        {isDropdownOpen && (
                                            <div className="dropdown-menu">
                                                <ul className="dropdown-list">
                                                    <li onClick={handleLogout}>
                                                        <IoLogOut className="dropdown-icon" /> Logout
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <li className="navItem"><Link to="/login" className="navLink" onClick={removeNavbar}>Login</Link></li>
                                    <li className="navItem"><Link to="/signup" className='navLink' onClick={removeNavbar}>Sign Up</Link></li>
                                </>
                            )}
                        </div>
                    </div>

                    <div onClick={removeNavbar} className="closeNavbar"><RiCloseFill className="icon" /></div>
                </div>

                <div onClick={showNav} className="toggleNavbar"><TbGridDots className="icon" /></div>
            </header>
        </section>
    );
};

export default Navbar;
