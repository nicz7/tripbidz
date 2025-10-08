// src/Components/Navbar/Navbar.jsx
import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './navbar.css';
import { RiCloseFill } from "react-icons/ri";
import { TbGridDots } from 'react-icons/tb';
import { IoNotificationsOutline } from "react-icons/io5";
import { UserContext } from '../UserContext/Usercontext';
import { IoLogOut } from "react-icons/io5";
import { FaCrown, FaGavel } from "react-icons/fa";

const Navbar = () => {
    const [active, setActive] = useState('navBar');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const dropdownRef = useRef();
    const notificationRef = useRef();

    // Sample notification data - replace with actual data from your backend
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: 'loyalty',
            title: 'Loyalty Points Earned',
            message: "You've earned +100 TripBidz Points for participating in the auction. Use them for discounts on your next bid!",
            time: 'Just Now',
            isRead: false,
            icon: <FaCrown />
        },
        {
            id: 2,
            type: 'auction',
            title: 'Auction Result',
            message: "You were outbid in the auction for [Item Name]. Your ETH has been refunded to your wallet.",
            time: 'Just Now',
            isRead: false,
            icon: <FaGavel />
        },
        {
            id: 3,
            type: 'loyalty',
            title: 'Loyalty Points Earned',
            message: "You've earned +50 TripBidz Points for participating in the auction. Use them for discounts on your next bid!",
            time: '23 Hours Ago',
            isRead: false,
            icon: <FaCrown />
        },
        {
            id: 4,
            type: 'auction',
            title: 'Auction Result',
            message: "Congratulations! You won the auction for [Item Name] with a bid of 0.035 ETH. The NFT has been transferred to your wallet.",
            time: '23 Hours Ago',
            isRead: false,
            icon: <FaGavel />
        }
    ]);

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

    const handleNotificationClick = () => {
        setIsNotificationOpen(prev => !prev);
        setIsDropdownOpen(false); // Close user dropdown if open
    };

    const markAllAsRead = () => {
        setNotifications(prev => 
            prev.map(notification => ({ ...notification, isRead: true }))
        );
    };

    const markAsRead = (id) => {
        setNotifications(prev => 
            prev.map(notification => 
                notification.id === id ? { ...notification, isRead: true } : notification
            )
        );
    };

    const unreadCount = notifications.filter(n => !n.isRead).length;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setIsNotificationOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <section className='navBarSection'>
            <header className="header flex">
                <div className="logoDiv">
                    <Link to="/" className="textlogo flex">
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
                                <div className="user-loggedin flex">
                                    {/* Notification Icon with Badge */}
                                    <div className="notification-container" ref={notificationRef}>
                                        <div className="notification-icon-wrapper" onClick={handleNotificationClick}>
                                            <IoNotificationsOutline className="notification-icon" />
                                            {unreadCount > 0 && (
                                                <span className="notification-badge">{unreadCount}</span>
                                            )}
                                        </div>

                                        {/* Notification Dropdown */}
                                        {isNotificationOpen && (
                                            <div className="notification-dropdown">
                                                <div className="notification-header">
                                                    <h3>Notification</h3>
                                                    <button 
                                                        className="close-btn"
                                                        onClick={() => setIsNotificationOpen(false)}
                                                    >
                                                        Close
                                                    </button>
                                                </div>
                                                
                                                <div className="notification-actions">
                                                    <button 
                                                        className="mark-all-read-btn"
                                                        onClick={markAllAsRead}
                                                    >
                                                        Mark all as read
                                                    </button>
                                                </div>

                                                <div className="notification-list">
                                                    {notifications.map(notification => (
                                                        <div 
                                                            key={notification.id} 
                                                            className={`notification-item ${!notification.isRead ? 'unread' : ''}`}
                                                            onClick={() => markAsRead(notification.id)}
                                                        >
                                                            <div className="notification-icon-container">
                                                                {notification.icon}
                                                            </div>
                                                            <div className="notification-content">
                                                                <div className="notification-title-row">
                                                                    <h4>{notification.title}</h4>
                                                                    <span className="notification-time">{notification.time}</span>
                                                                </div>
                                                                <p>{notification.message}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* User Dropdown */}
                                    <div className="user-dropdown" ref={dropdownRef}>
                                        <span
                                            className="nav-username"
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
                                    <li className="navItem"><Link to="/role-selection" className="navLink" onClick={removeNavbar}>Get Started</Link></li>
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