import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Bell, 
  BarChart3, 
  Plane, 
  Hotel, 
  Calendar, 
  Truck, 
  Users, 
  DollarSign, 
  Settings,
  TrendingUp,
  User,
  ChevronDown
} from 'lucide-react';
import { MdOutlineLogout } from "react-icons/md";
import FlightAuctions from '../AdminFlightAuctions/AdminFlight';
import HotelAuctions from '../AdminHotelAuctions/AdminHotel';
import TicketAuctions from '../AdminTicketAuctions/AdminTicket';
import TransportationAuctions from '../AdminTransportationAuctions/AdminTransportation';
import AdminSettings from '../AdminSettings/AdminSettings';
import '../AdminDashboard/admindashboard.css';

// LogoutModal Component (inline)
const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      backdropFilter: 'blur(4px)'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '100px',
        width: '550px',
        height: '400px',
        maxWidth: '90vw',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: '28px',
          fontWeight: '700',
          color: '#1f2937',
          margin: '0 0 16px 0',
          lineHeight: '1.3'
        }}>Are you sure you want to log out?</h2>
        <p style={{
          fontSize: '16px',
          color: '#6b7280',
          margin: '0 0 32px 0',
          lineHeight: '1.5'
        }}>After you log out, your account data will remain safe. You can log in again anytime.</p>
        
        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'center'
        }}>
          <button 
            onClick={onClose}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              border: '2px solid #ef4444',
              background: 'transparent',
              color: '#ef4444',
              minWidth: '100px'
            }}
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              border: 'none',
              background: '#1f2937',
              color: 'white',
              minWidth: '100px'
            }}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};
  
const TravelAuctionDashboard = () => {
  const [activeSection, setActiveSection] = useState('Dashboard');
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();
  
  // You can replace this with actual user data from your authentication system
  const currentUser = {
    username: 'nicz7', // You can replace this with dynamic user data
    avatar: null // Add avatar URL if available
  };

  const sidebarItems = [
    { name: 'Dashboard', icon: BarChart3, active: true },
    { name: 'Flight Auctions', icon: Plane },
    { name: 'Hotel Auctions', icon: Hotel },
    { name: 'Tour & Tickets Auctions', icon: Calendar },
    { name: 'Transportation Auctions', icon: Truck },
    { name: 'Settings', icon: Settings },
    { name: 'Logout', icon: MdOutlineLogout },
  ];

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleLogoutCancel = () => {
    setIsLogoutModalOpen(false);
  };

  const handleLogoutConfirm = () => {
    // Clear user session/data
    localStorage.removeItem('adminToken'); // Remove any stored tokens
    localStorage.removeItem('authToken'); // Remove auth token if you have one
    localStorage.removeItem('user'); // Remove user data if stored
    sessionStorage.clear(); // Clear session storage
    
    setIsLogoutModalOpen(false);
    
    // Navigate to admin login page
    navigate('/admin/login'); // Updated to correct route
    
    // Optional: Force page reload to ensure clean state
    // window.location.href = '/admin/login';
  };

  const handleSidebarClick = (itemName) => {
    if (itemName === 'Logout') {
      handleLogoutClick();
    } else {
      setActiveSection(itemName);
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'Flight Auctions':
        return <FlightAuctions />;
      case 'Hotel Auctions':
        return <HotelAuctions />;
      case 'Tour & Tickets Auctions':
        return <TicketAuctions />;
      case 'Transportation Auctions':
        return <TransportationAuctions />;
      case 'Settings':
        return <AdminSettings />;
      default:
        return renderDashboard();
    }
  };

  const renderDashboard = () => (
    <>
      {/* Header */}
      <header className="admin-header">
        <h1>Dashboard</h1>
        
        <div className="admin-header-actions">
          {/* Search Container */}
          <div className="admin-search-container">
            <Search className="admin-search-icon" size={16} />
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
            />
          </div>
          
          {/* Notification Button */}
          <button className="admin-notification-btn">
            <Bell size={16} />
          </button>
          
          {/* User Profile Section */}
          <div className="user-profile-section">
            <span className="username">nicz7</span>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-content">
              <h3>Active Auctions</h3>
              <div className="stat-number">24</div>
              <div className="stat-change positive">+12% from last week</div>
            </div>
            <div className="stat-icon">
              <BarChart3 size={24} />
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <h3>Total Bids</h3>
              <div className="stat-number">1,247</div>
              <div className="stat-change positive">+8% from last week</div>
            </div>
            <div className="stat-icon">
              <TrendingUp size={24} />
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <h3>Revenue Today</h3>
              <div className="stat-number">$12,450</div>
              <div className="stat-change negative">-13% from last week</div>
            </div>
            <div className="stat-icon">
              <DollarSign size={24} />
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <h3>Active Users</h3>
              <div className="stat-number">892</div>
              <div className="stat-change positive">+3% from last week</div>
            </div>
            <div className="stat-icon">
              <Users size={24} />
            </div>
          </div>
        </div>
      </section>

      {/* Recent Auctions */}
      <section className="recent-auctions">
        <div className="section-header">
          <h2>Recent Auctions</h2>
          <p>Latest auction activity and status updates</p>
        </div>

        <div className="auctions-list">
          {/* Your existing recent auctions list */}
        </div>
      </section>
    </>
  );

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <h2>Trip<span>Bidz</span></h2>
        </div>
        <nav className="admin-sidebar-nav">
          {sidebarItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                className={`nav-item ${activeSection === item.name ? 'active' : ''}`}
                onClick={() => handleSidebarClick(item.name)}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="admin-main-content">
        {renderContent()}
      </main>

      {/* Logout Modal */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
      />
    </div>
  );
};

export default TravelAuctionDashboard;