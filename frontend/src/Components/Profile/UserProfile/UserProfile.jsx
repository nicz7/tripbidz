import React, { useState } from "react";
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
    <div className="user-profile-container">
      <aside className={`user-sidebar ${collapsed ? "user-collapsed" : ""}`}>
        <header className="user-sidebar-header">
          <a href="#" className="user-header-logo">
            {!collapsed ? (
              <>
                User<span className="user-text-logo">Profile</span>
              </>
            ) : (
              <div className="user-collapsed-logo">P</div>
            )}
          </a>
          <button className="user-toggler" onClick={toggleSidebar}>
            <IoChevronBackSharp
              className={`user-sharp-logo ${collapsed ? "user-rotate" : ""}`}
            />
          </button>
        </header>
        <nav className="user-sidebar-nav">
          <ul className="user-nav-list user-primary-nav">
            <li className="user-nav-item">
              <button
                onClick={() => setActiveTab("profile")}
                className="user-nav-link"
              >
                <span className="user-nav-icon">
                  <CgProfile />
                </span>
                {!collapsed && <span className="user-nav-label">Profile</span>}
              </button>
              <span className="user-nav-tooltip">Profile</span>
            </li>
            <li className="user-nav-item">
              <button
                onClick={() => setActiveTab("wallet")}
                className="user-nav-link"
              >
                <span className="user-nav-icon">
                  <IoWallet />
                </span>
                {!collapsed && <span className="user-nav-label">Wallet</span>}
              </button>
              <span className="user-nav-tooltip">Wallet</span>
            </li>
            <li className="user-nav-item">
              <button
                onClick={() => setActiveTab("bidding")}
                className="user-nav-link"
              >
                <span className="user-nav-icon">
                  <BiDetail />
                </span>
                {!collapsed && (
                  <span className="user-nav-label">Bidding History</span>
                )}
              </button>
              <span className="user-nav-tooltip">Bidding History</span>
            </li>
            <li className="user-nav-item">
              <button
                onClick={() => setActiveTab("itinerary")}
                className="user-nav-link"
              >
                <span className="user-nav-icon">
                  <GiWavyItinerary />
                </span>
                {!collapsed && <span className="user-nav-label">Itinerary</span>}
              </button>
              <span className="user-nav-tooltip">Itinerary</span>
            </li>
          </ul>
          <ul className="user-nav-list user-secondary-nav">
            <li className="user-nav-item">
              <button onClick={handleLogoutClick} className="user-nav-link">
                <span className="user-nav-icon">
                  <MdOutlineLogout />
                </span>
                {!collapsed && <span className="user-nav-label">Logout</span>}
              </button>
              <span className="user-nav-tooltip">Logout</span>
            </li>
          </ul>
        </nav>
      </aside>

      <div className={`user-profile-main ${collapsed ? "user-collapsed" : ""}`}>
        {renderContent()}
      </div>

      {showLogoutModal && (
        <div className="user-logout-modal-overlay">
          <div className="user-logout-modal">
            <h3>Are you sure you want<br />
            to log out?
            </h3>
            <p>
              After you log out, your account data will remain safe. You can
              log in again anytime.
            </p>
            <div className="user-modal-actions">
              <button className="user-btn user-cancel" onClick={cancelLogout}>
                Cancel
              </button>
              <button className="user-btn user-logout" onClick={confirmLogout}>
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