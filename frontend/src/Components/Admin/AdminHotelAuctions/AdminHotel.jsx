import React, { useState } from "react";
import { Search, Plus, Eye, Settings } from "lucide-react";
import { allAuctionDeals } from "../../../Data/AuctionData";
import CreateHotelAuction from "../AdminCreateAuctions/CreateHotelAuction";
import './AdminHotel.css';

// Helper: filter for only hotel deals
const getHotelsAuctions = () =>
  allAuctionDeals.filter((deal) => deal.category === "Hotel");

const AdminHotelsAuctions = () => {
  const [search, setSearch] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [hotelAuctions, setHotelAuctions] = useState(getHotelsAuctions());

  // Filtered hotel auctions
  const filteredAuctions = hotelAuctions.filter(
    (auction) =>
      auction.title.toLowerCase().includes(search.toLowerCase()) ||
      (auction.location && auction.location.toLowerCase().includes(search.toLowerCase()))
  );

  // Helper to extract hotel location (e.g., "Taipei, Taiwan")
  const getLocation = (location) => location || "—";
  const getCheckIn = (auction) => auction.startDate || auction.checkInDate || "—";
  const getCheckOut = (auction) => auction.endDate || auction.checkOutDate || "—";
  const getRoomType = (auction) => auction.roomType || "—";
  const getGuests = (auction) => auction.guests || "—";

  const handleCreateAuction = () => {
    setShowCreateModal(true);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
  };

  const handleSaveAuction = (newAuction) => {
    setHotelAuctions(prev => [newAuction, ...prev]);
    setShowCreateModal(false);
    alert('Hotel auction created successfully!');
  };

  return (
    <div className="hotel-auction-page">
      {/* Header */}
      <header className="hotel-admin-header">
        <div className="hotel-header-title">
          <div>
            <h1>Hotel Auctions</h1>
            <p>Manage hotel auction listings</p>
          </div>
        </div>
              
        {/* Desktop Header Actions - Search + Create Button */}
        <div className="hotel-admin-header-actions hotel-desktop-only">
          <div className="admin-search-container">
            <Search className="admin-search-icon" size={20} />
            <input
              type="text"
              placeholder="Search hotels..."
              className="search-input"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <button 
            className="hotel-admin-new-auction-btn"
            onClick={handleCreateAuction}
          >
            <Plus size={20} />
            Create Auction
          </button>
        </div>

        {/* Mobile Search Bar - Inside Header */}
        <div className="hotel-mobile-search-in-header hotel-mobile-only">
          <div className="hotel-mobile-search-container">
            <Search className="hotel-mobile-search-icon" size={20} />
            <input
              type="text"
              placeholder="Search hotels..."
              className="hotel-mobile-search-input"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* Floating Action Button for Mobile */}
      <button 
        className="hotel-floating-action-btn hotel-mobile-only"
        onClick={handleCreateAuction}
        aria-label="Create new auction"
      >
        <Plus size={24} />
      </button>

      {/* Hotel Auctions Section */}
      <section className="hotel-auctions-table-section">
        <div className="hotel-table-container">
          <div className="hotel-table-wrapper">
            <table className="hotel-auctions-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Hotel</th>
                  <th>Location</th>
                  <th>Check-in</th>
                  <th>Check-out</th>
                  <th>Guests</th>
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
                        className="hotel-auction-image"
                      />
                    </td>
                    <td>
                      <div className="hotel-cell">
                        <strong>{auction.title}</strong>
                      </div>
                    </td>
                    <td>{getLocation(auction.location)}</td>
                    <td>{getCheckIn(auction)}</td>
                    <td>{getCheckOut(auction)}</td>
                    <td>{getGuests(auction)}</td>
                    <td>{auction.bids}</td>
                    <td>
                      <span className="hotel-current-bid">{auction.price}</span>
                    </td>
                    <td>
                      <span className="hotel-status-badge hotel-status-active">Active</span>
                    </td>
                    <td>—</td>
                    <td>
                      <div className="hotel-action-buttons">
                        <button className="hotel-action-btn hotel-view-btn">
                          <Eye size={14} />
                        </button>
                        <button className="hotel-action-btn hotel-settings-btn">
                          <Settings size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredAuctions.length === 0 && (
                  <tr>
                    <td colSpan={11} style={{ textAlign: "center", padding: 24 }}>
                      No hotel auctions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Create Hotel Auction Modal */}
      {showCreateModal && (
        <CreateHotelAuction
          onClose={handleCloseModal}
          onSave={handleSaveAuction}
        />
      )}
    </div>
  );
};

export default AdminHotelsAuctions;