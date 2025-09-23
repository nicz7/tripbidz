import React, { useState } from "react";
import { Search, Plus, Eye, Settings } from "lucide-react";
import { allAuctionDeals } from "../../../Data/AuctionData";
import CreateTransportAuction from "../AdminCreateAuctions/CreateTransportAuction";

// Helper: filter for only transportation deals
const getTransportAuctions = () =>
  allAuctionDeals.filter((deal) => deal.category === "Transportation");

const AdminTransportAuctions = () => {
  const [search, setSearch] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [transportAuctions, setTransportAuctions] = useState(getTransportAuctions());

  // Filtered transport auctions
  const filteredAuctions = transportAuctions.filter(
    (auction) =>
      auction.title.toLowerCase().includes(search.toLowerCase()) ||
      (auction.location && auction.location.toLowerCase().includes(search.toLowerCase()))
  );

  const getLocation = (location) => location || "—";
  const getDate = (auction) => auction.startDate || auction.date || "—";
  const getType = (auction) => auction.type || "—"; // CHANGE HERE to use .type

  const handleCreateAuction = () => {
    setShowCreateModal(true);
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
    <div className="auction-page">
      {/* Header */}
      <header className="admin-header">
        <div className="header-title">
          <div>
            <h1>Transportation Auctions</h1>
            <p>Manage transportation auction listings</p>
          </div>
        </div>
        <div className="admin-header-actions">
          <div className="admin-search-container">
            <Search className="admin-search-icon" size={20} />
            <input
              type="text"
              placeholder="Search transportation..."
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

      {/* Transportation Auctions Section */}
      <section className="auctions-table-section">
        <div className="table-container">
          <table className="auctions-table">
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>Image</th>
                <th style={{ textAlign: "center" }}>Transport</th>
                <th style={{ textAlign: "center" }}>Type</th>
                <th style={{ textAlign: "center" }}>Location</th>
                <th style={{ textAlign: "center" }}>Date</th>
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
                    <div className="transport-cell" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                      <strong style={{ textAlign: "center", width: "100%" }}>{auction.title}</strong>
                    </div>
                  </td>
                  <td style={{ textAlign: "center" }}>{getType(auction)}</td>
                  <td style={{ textAlign: "center" }}>{getLocation(auction.location)}</td>
                  <td style={{ textAlign: "center" }}>{getDate(auction)}</td>
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
                  <td colSpan={10} style={{ textAlign: "center", padding: 24 }}>
                    No transportation auctions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

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