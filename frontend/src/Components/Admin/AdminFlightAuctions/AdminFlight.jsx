import React, { useState } from "react";
import { Search, Plus, Eye, Settings, MapPin, Clock, Users, Plane } from "lucide-react";
import { allAuctionDeals } from "../../../Data/AuctionData";
import CreateFlightAuction from "../AdminCreateAuctions/CreateFlightAuction";
import "./AdminFlight.css";

// Helper: filter for only flight deals
const getFlightsAuctions = () =>
  allAuctionDeals.filter((deal) => deal.category === "Flights");

const AdminFlightsAuctions = () => {
  const [search, setSearch] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [flightAuctions, setFlightAuctions] = useState(getFlightsAuctions());

  // Filtered flight auctions
  const filteredAuctions = flightAuctions.filter(
    (auction) =>
      auction.title.toLowerCase().includes(search.toLowerCase()) ||
      (auction.location && auction.location.toLowerCase().includes(search.toLowerCase()))
  );

  // Helper to extract route (e.g., "Taipei → Tokyo") from time string
  const getRoute = (time) => (time && time.includes("→") ? time : "—");

  const handleCreateAuction = () => {
    setShowCreateModal(true);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
  };

  const handleSaveAuction = (newAuction) => {
    setFlightAuctions(prev => [newAuction, ...prev]);
    setShowCreateModal(false);
    alert('Flight auction created successfully!');
  };

  return (
    <div className="auction-page">
      {/* Header */}
      <header className="admin-header">
        <div className="header-title">
          <div>
            <h1>Flight Auctions</h1>
            <p>Manage flight auction listings</p>
          </div>
        </div>
        <div className="admin-header-actions">
          <div className="admin-search-container">
            <Search className="admin-search-icon" size={20} />
            <input
              type="text"
              placeholder="Search flights..."
              className="search-input"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <button 
            className="admin-new-auction-btn"
            onClick={handleCreateAuction}
          >
            <Plus size={20} />
            Create Auction
          </button>
        </div>
      </header>

      {/* Flight Auctions Section */}
      <section className="auctions-table-section">
        {/* Desktop Table */}
        <div className="table-container">
          <table className="auctions-table">
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>Image</th>
                <th style={{ textAlign: "center" }}>Flight</th>
                <th style={{ textAlign: "center" }}>Departure</th>
                <th style={{ textAlign: "center" }}>Duration</th>
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
                      style={{ width: "100px", height: "80px", borderRadius: 8, objectFit: "cover" }}
                    />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <div className="flight-cell" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                      <strong style={{ textAlign: "center", width: "100%" }}>{auction.title}</strong>
                    </div>
                  </td>
                  <td style={{ textAlign: "center" }}>{getRoute(auction.time)}</td>
                  <td style={{ textAlign: "center" }}>{auction.duration}</td>
                  <td style={{ textAlign: "center" }}>{auction.bids}</td>
                  <td style={{ textAlign: "center" }}>
                    <span className="current-bid">{auction.price}</span>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <span className="status-badge active">Active</span>
                  </td>
                  <td style={{ textAlign: "center" }}>—</td>
                  <td style={{ textAlign: "center" }}>
                    <div className="action-buttons">
                      <button className="action-btn view-btn">
                        <Eye size={16} />
                      </button>
                      <button className="action-btn settings-btn">
                        <Settings size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredAuctions.length === 0 && (
                <tr>
                  <td colSpan={9} style={{ textAlign: "center", padding: 24 }}>
                    No flight auctions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Create Flight Auction Modal */}
      {showCreateModal && (
        <CreateFlightAuction
          onClose={handleCloseModal}
          onSave={handleSaveAuction}
        />
      )}
    </div>
  );
};

export default AdminFlightsAuctions;