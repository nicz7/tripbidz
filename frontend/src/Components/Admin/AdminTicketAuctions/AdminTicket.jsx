import React, { useState } from "react";
import { Search, Plus, Eye, Settings } from "lucide-react";
import { allAuctionDeals } from "../../../Data/AuctionData";
import CreateTourAuction from "../AdminCreateAuctions/CreateTourAuction";

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
    <div className="auction-page">
      {/* Header */}
      <header className="admin-header">
        <div className="header-title">
          <div>
            <h1>Tour Auctions</h1>
            <p>Manage tour auction listings</p>
          </div>
        </div>
        <div className="admin-header-actions">
          <div className="admin-search-container">
            <Search className="admin-search-icon" size={20} />
            <input
              type="text"
              placeholder="Search tours..."
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

      {/* Tour Auctions Section */}
      <section className="auctions-table-section">
        <div className="table-container">
          <table className="auctions-table">
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>Image</th>
                <th style={{ textAlign: "center" }}>Tour</th>
                <th style={{ textAlign: "center" }}>Location</th>
                <th style={{ textAlign: "center" }}>Date</th>
                <th style={{ textAlign: "center" }}>Tickets</th> {/* Added Tickets column */}
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
                    <div className="tour-cell" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                      <strong style={{ textAlign: "center", width: "100%" }}>{auction.title}</strong>
                    </div>
                  </td>
                  <td style={{ textAlign: "center" }}>{getLocation(auction.location)}</td>
                  <td style={{ textAlign: "center" }}>{getDate(auction.date)}</td>
                  <td style={{ textAlign: "center" }}>{getTickets(auction)}</td> {/* Tickets cell */}
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
                    No tour auctions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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