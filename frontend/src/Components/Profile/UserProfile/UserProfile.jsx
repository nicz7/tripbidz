import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./userprofile.css";
import "./profiledesign.css";
import { IoChevronBackSharp, IoWallet } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogout } from "react-icons/md";
import { BiDetail } from "react-icons/bi";
import { GiWavyItinerary } from "react-icons/gi";
import PersonalDataForm from '../UserProfile/PersonalDataForm';
import WalletCard from "../WalletCard/Walletcard";
import BiddingHistoryPage from '../BiddingHistory/BiddingHistory';
import ItineraryPage from "../ItineraryPage/ItineraryPage";



const UserProfile = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate(); 

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    // Add logout logic here
    console.log("Logged out!");
    navigate("/");
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <PersonalDataForm />;
      case "wallet":
        return <WalletCard />;
      case "bidding":
        return <BiddingHistoryPage />;
      case "itinerary":
        return <ItineraryPage />;
      default:
        return <PersonalDataForm />;
    }
  };

  return (
    <div className="profile-container">
      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <header className="sidebar-header">
          <a href="#" className="header-logo">
            {!collapsed ? (
              <>
                User<span className="text-logo">Profile</span>
              </>
            ) : (
              <div className="collapsed-logo">P</div>
            )}
          </a>
          <button className="toggler" onClick={toggleSidebar}>
            <IoChevronBackSharp
              className={`sharp-logo ${collapsed ? "rotate" : ""}`}
            />
          </button>
        </header>
        <nav className="sidebar-nav">
          <ul className="nav-list primary-nav">
            <li className="nav-item">
              <button
                onClick={() => setActiveTab("profile")}
                className="nav-link"
              >
                <span className="nav-icon">
                  <CgProfile />
                </span>
                {!collapsed && <span className="nav-label">Profile</span>}
              </button>
              <span className="nav-tooltip">Profile</span>
            </li>
            <li className="nav-item">
              <button
                onClick={() => setActiveTab("wallet")}
                className="nav-link"
              >
                <span className="nav-icon">
                  <IoWallet />
                </span>
                {!collapsed && <span className="nav-label">Wallet</span>}
              </button>
              <span className="nav-tooltip">Wallet</span>
            </li>
            <li className="nav-item">
              <button
                onClick={() => setActiveTab("bidding")}
                className="nav-link"
              >
                <span className="nav-icon">
                  <BiDetail />
                </span>
                {!collapsed && (
                  <span className="nav-label">Bidding History</span>
                )}
              </button>
              <span className="nav-tooltip">Bidding History</span>
            </li>
            <li className="nav-item">
              <button
                onClick={() => setActiveTab("itinerary")}
                className="nav-link"
              >
                <span className="nav-icon">
                  <GiWavyItinerary />
                </span>
                {!collapsed && <span className="nav-label">Itinerary</span>}
              </button>
              <span className="nav-tooltip">Itinerary</span>
            </li>
          </ul>
          <ul className="nav-list secondary-nav">
            <li className="nav-item">
              <button onClick={handleLogoutClick} className="nav-link">
                <span className="nav-icon">
                  <MdOutlineLogout />
                </span>
                {!collapsed && <span className="nav-label">Logout</span>}
              </button>
              <span className="nav-tooltip">Logout</span>
            </li>
          </ul>
        </nav>
      </aside>

      <div className={`profile-main ${collapsed ? "collapsed" : ""}`}>
        {renderContent()}
      </div>

      {showLogoutModal && (
        <div className="logout-modal-overlay">
          <div className="logout-modal">
            <h3>Are you sure you want<br />
            to log out?
            </h3>
            <p>
              After you log out, your account data will remain safe. You can
              log in again anytime.
            </p>
            <div className="modal-actions">
              <button className="btn cancel" onClick={cancelLogout}>
                Cancel
              </button>
              <button className="btn logout" onClick={confirmLogout}>
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
