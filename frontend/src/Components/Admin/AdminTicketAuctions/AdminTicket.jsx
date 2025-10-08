import React, { useState } from "react";
import { Search, Plus, Eye, Settings } from "lucide-react";
import { allAuctionDeals } from "../../../Data/AuctionData";
import CreateTourAuction from "../AdminCreateAuctions/CreateTourAuction";
import './AdminTicket.css';

// Helper: filter for only tour deals
const getToursAuctions = () =>
  allAuctionDeals.filter((deal) => deal.category === "Tour");

const AdminToursAuctions = () => {
  const [search, setSearch] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [tourAuctions, setTourAuctions] = useState(getToursAuctions());

  // Filtered tour auctions
  const filteredAuctions = tourAuctions.filter(
    (auction) =>
      auction.title.toLowerCase().includes(search.toLowerCase()) ||
      (auction.location && auction.location.toLowerCase().includes(search.toLowerCase()))
  );

  const getLocation = (location) => location || "—";
  const getDate = (date) => date || "—";
  const getTickets = (auction) => auction.tickets || "—";

  const handleCreateAuction = () => {
    setShowCreateModal(true);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
  };

  const handleSaveAuction = (newAuction) => {
    setTourAuctions(prev => [newAuction, ...prev]);
    setShowCreateModal(false);
    alert('Tour auction created successfully!');
  };

  return (
    <div className="tour-auction-page">
      {/* Header */}
      <header className="tour-admin-header">
        <div className="tour-header-title">
          <div>
            <h1>Tour Auctions</h1>
            <p>Manage tour auction listings</p>
          </div>
        </div>
        
        {/* Desktop Header Actions */}
        <div className="tour-admin-header-actions tour-desktop-only">
          <div className="tour-admin-search-container">
            <Search className="tour-admin-search-icon" size={20} />
            <input
              type="text"
              placeholder="Search tours..."
              className="tour-search-input"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <button 
            className="tour-admin-new-auction-btn"
            onClick={handleCreateAuction}
          >
            <Plus size={20} />
            Create Auction
          </button>
        </div>

        {/* Mobile Search Bar */}
        <div className="tour-mobile-header-actions tour-mobile-only">
          <div className="tour-mobile-search-in-header">
            <div className="tour-mobile-search-container">
              <Search className="tour-mobile-search-icon" size={16} />
              <input
                type="text"
                className="tour-mobile-search-input"
                placeholder="Search tours..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Floating Action Button for Mobile */}
      <button 
        className="tour-floating-action-btn tour-mobile-only"
        onClick={handleCreateAuction}
        aria-label="Create new auction"
      >
        <Plus size={24} />
      </button>

      {/* Tour Auctions Section */}
      <section className="tour-auctions-table-section">
        <div className="tour-table-container">
          <div className="tour-table-wrapper">
            <table className="tour-auctions-table">
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>Image</th>
                  <th style={{ textAlign: "center" }}>Tour</th>
                  <th style={{ textAlign: "center" }}>Location</th>
                  <th style={{ textAlign: "center" }}>Date</th>
                  <th style={{ textAlign: "center" }}>Tickets</th>
                  <th style={{ textAlign: "center" }}>Bids</th>
                  <th style={{ textAlign: "center" }}>Price (ETH)</th>
                  <th style={{ textAlign: "center" }}>Status</th>
                  <th style={{ textAlign: "center" }}>Time Left</th>
                  <th style={{ textAlign: "center" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAuctions.map((auction) => (
                  <tr key={auction.id}>
                    <td style={{ textAlign: "center" }}>
                      <img
                        src={auction.img}
                        alt={auction.title}
                        className="tour-auction-image"
                      />
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <div className="tour-cell">
                        <strong>{auction.title}</strong>
                      </div>
                    </td>
                    <td style={{ textAlign: "center" }}>{getLocation(auction.location)}</td>
                    <td style={{ textAlign: "center" }}>{getDate(auction.date)}</td>
                    <td style={{ textAlign: "center" }}>{getTickets(auction)}</td>
                    <td style={{ textAlign: "center" }}>{auction.bids}</td>
                    <td style={{ textAlign: "center" }}>
                      <span className="tour-current-bid">{auction.price}</span>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <span className="tour-status-badge tour-status-active">Active</span>
                    </td>
                    <td style={{ textAlign: "center" }}>—</td>
                    <td style={{ textAlign: "center" }}>
                      <div className="tour-action-buttons">
                        <button className="tour-action-btn tour-view-btn">
                          <Eye size={16} />
                        </button>
                        <button className="tour-action-btn tour-settings-btn">
                          <Settings size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredAuctions.length === 0 && (
                  <tr>
                    <td colSpan={10} style={{ textAlign: "center", padding: 24 }}>
                      No tour auctions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Create Tour Auction Modal */}
      {showCreateModal && (
        <CreateTourAuction
          onClose={handleCloseModal}
          onSave={handleSaveAuction}
        />
      )}
    </div>
  );
};

export default AdminToursAuctions;