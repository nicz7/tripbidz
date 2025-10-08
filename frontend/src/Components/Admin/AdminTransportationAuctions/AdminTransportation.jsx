import React, { useState } from "react";
import { Search, Plus, Eye, Settings, Menu, X } from "lucide-react";
import { allAuctionDeals } from "../../../Data/AuctionData";
import CreateTransportAuction from "../AdminCreateAuctions/CreateTransportAuction";
import './AdminTransportation.css';

// Helper: filter for only transportation deals
const getTransportAuctions = () =>
  allAuctionDeals.filter((deal) => deal.category === "Transportation");

const AdminTransportAuctions = () => {
  const [search, setSearch] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [transportAuctions, setTransportAuctions] = useState(getTransportAuctions());

  // Filtered transport auctions
  const filteredAuctions = transportAuctions.filter(
    (auction) =>
      auction.title.toLowerCase().includes(search.toLowerCase()) ||
      (auction.location && auction.location.toLowerCase().includes(search.toLowerCase()))
  );

  const getLocation = (location) => location || "—";
  const getDate = (auction) => auction.startDate || auction.date || "—";
  const getType = (auction) => auction.type || "—";

  const handleCreateAuction = () => {
    setShowCreateModal(true);
    setMobileMenuOpen(false); // Close mobile menu if open
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
  };

  const handleSaveAuction = (newAuction) => {
    setTransportAuctions(prev => [newAuction, ...prev]);
    setShowCreateModal(false);
    alert('Transportation auction created successfully!');
  };

  return (
    <div className="transport-auction-page">
      {/* Header */}
      <header className="transport-admin-header">
        <div className="transport-header-title">
          <h1>Transportation Auctions</h1>
          <p>Manage transportation auction listings</p>
        </div>
        
        {/* Desktop Header Actions */}
        <div className="transport-admin-header-actions transport-desktop-only">
          <div className="transport-admin-search-container">
            <Search className="transport-admin-search-icon" size={20} />
            <input
              type="text"
              placeholder="Search transportation..."
              className="transport-search-input"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <button 
            className="transport-admin-new-auction-btn"
            onClick={handleCreateAuction}
          >
            <Plus size={16} />
            Create Auction
          </button>
        </div>

        {/* Mobile Search in Header */}
        <div className="transport-mobile-search-in-header transport-mobile-only">
          <div className="transport-mobile-search-container">
            <Search className="transport-mobile-search-icon" size={16} />
            <input
              type="text"
              className="transport-mobile-search-input"
              placeholder="Search transportation..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* Transportation Auctions Section */}
      <section className="transport-auctions-table-section">
        <div className="transport-table-container">
          <div className="transport-table-wrapper">
            <table className="transport-auctions-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Transport</th>
                  <th>Type</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Bids</th>
                  <th>Price (ETH)</th>
                  <th>Status</th>
                  <th>Time Left</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAuctions.map((auction) => (
                  <tr key={auction.id}>
                    <td>
                      <img
                        src={auction.img}
                        alt={auction.title}
                        style={{ 
                          width: "80px", 
                          height: "60px", 
                          borderRadius: 8, 
                          objectFit: "cover" 
                        }}
                      />
                    </td>
                    <td>
                      <div className="transport-cell">
                        <strong>{auction.title}</strong>
                      </div>
                    </td>
                    <td>{getType(auction)}</td>
                    <td>{getLocation(auction.location)}</td>
                    <td>{getDate(auction)}</td>
                    <td>{auction.bids}</td>
                    <td>
                      <span className="transport-current-bid">{auction.price}</span>
                    </td>
                    <td>
                      <span className="transport-status-badge active">Active</span>
                    </td>
                    <td>—</td>
                    <td>
                      <div className="transport-action-buttons">
                        <button className="transport-action-btn transport-view-btn">
                          <Eye size={16} />
                        </button>
                        <button className="transport-action-btn transport-settings-btn">
                          <Settings size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredAuctions.length === 0 && (
                  <tr>
                    <td colSpan={10} style={{ textAlign: "center", padding: 24 }}>
                      No transportation auctions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <>
          <div 
            className="transport-mobile-overlay" 
            onClick={() => setMobileMenuOpen(false)} 
          />
          <div className="transport-mobile-menu">
            <div className="transport-mobile-menu-header">
              <h3>Menu</h3>
              <button 
                className="transport-mobile-menu-close"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="transport-mobile-menu-content">
              <button 
                className="transport-mobile-create-btn"
                onClick={handleCreateAuction}
              >
                <Plus size={20} />
                Create Transportation Auction
              </button>
            </div>
          </div>
        </>
      )}

      {/* Floating Action Button */}
      <button 
        className="transport-floating-action-btn transport-mobile-only"
        onClick={handleCreateAuction}
        aria-label="Create new auction"
      >
        <Plus size={24} />
      </button>

      {/* Create Transportation Auction Modal */}
      {showCreateModal && (
        <CreateTransportAuction
          onClose={handleCloseModal}
          onSave={handleSaveAuction}
        />
      )}
    </div>
  );
};

export default AdminTransportAuctions;