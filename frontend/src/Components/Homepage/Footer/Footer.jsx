import React from 'react';
import './footer.css';
import { FaFacebookF } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="footer-outer">
            <div className="footer-inner">
            <div className="footer-col footer-brand">
                <div className="footer-logo">
                <span className="footer-logo-main">Trip</span>
                <span className="footer-logo-accent">Bidz</span>
                </div>
                <div className="footer-copyright">
                Copyright @TripBidz 2025 All rights reserved
                </div>
                <div className="footer-questions">
                <strong>Got any questions? Drop us a message below.</strong>
                </div>
                <form className="footer-form">
                <input
                    className="footer-input"
                    type="text"
                    placeholder="leave a message"
                />
                <button type="submit" className="footer-form-btn">
                    <span className="footer-form-arrow">{'>'}</span>
                </button>
                </form>
            </div>
            <div className="footer-col footer-menu">
                <div className="footer-section-title">Menu</div>
                <ul>
                <li>Itinerary</li>
                <li>Auction</li>
                <li>Reward</li>
                <li>Profile</li>
                </ul>
            </div>
            <div className="footer-col footer-contact">
                <div className="footer-section-title">Contact Info</div>
                <ul>
                <li>+886 91-234-567</li>
                <li>info@tripbidz.com</li>
                <li>
                    No.55, Sec. 2, Jinshan S. Rd., Da-an District, Taipei City 106409
                </li>
                </ul>
                <div className="footer-socials">
                <a href="#" aria-label="Facebook" className="footer-social-icon">
                    <FaFacebookF />
                </a>
                <a href="#" aria-label="Twitter" className="footer-social-icon">
                    <FaTwitter />
                </a>
                <a href="#" aria-label="Instagram" className="footer-social-icon">
                    <FaInstagram />
                </a>
                </div>
            </div>
            </div>
  </footer>
    )
}

export default Footer;