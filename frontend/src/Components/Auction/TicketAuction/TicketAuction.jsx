import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Homepage/Navbar/Navbar";

// Icons for AuctionNav (these are now directly imported into TicketAuction)
import { BsAirplane } from "react-icons/bs";
import { RiHotelLine } from "react-icons/ri";
import { GrTicket } from "react-icons/gr";
import { LuTrainFrontTunnel } from "react-icons/lu";

// Ticket-specific icon
import { MdOutlineLocationCity } from "react-icons/md";
import './ticketauction.css';

// 💡 1. Import the combined data set
import { allAuctionDeals } from '../../../Data/AuctionData';

const TicketAuction = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('All');
  const [visibleCount, setVisibleCount] = useState(3);
  const [deals, setDeals] = useState([]);

  // Data for AuctionNav icons (moved from AuctionNav.jsx)
  const auctionNavIcons = [
    { label: "Flights", icon: <BsAirplane size={80} />, path: "/auction/flight" },
    { label: "Hotels", icon: <RiHotelLine size={80} />, path: "/auction/hotel" },
    { label: "Tours & Tickets", icon: <GrTicket size={80} />, path: "/auction/tickets" },
    { label: "Transportation", icon: <LuTrainFrontTunnel size={70} />, path: "/auction/transportation" }
  ];

  // 💡 2. Filter the imported deals for "Tour" category
  const allTourDeals = allAuctionDeals.filter(deal => deal.category === 'Tour');

  useEffect(() => {
    applySorting();
  }, [sortBy, visibleCount, searchQuery]);

  useEffect(() => {
    applySorting();
  }, []); // Initial load

  const applySorting = () => {
    // 💡 3. Start with the pre-filtered array instead of the local mock data
    let filteredDeals = [...allTourDeals];

    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filteredDeals = filteredDeals.filter(
        deal =>
          deal.title.toLowerCase().includes(query) ||
          deal.location.toLowerCase().includes(query)
      );
    }

    switch (sortBy) {
      case 'Newest':
        // 💡 Use the new id, which is a better proxy for "newness" in your data
        filteredDeals.sort((a, b) => b.id - a.id);
        break;
      case 'Oldest':
        filteredDeals.sort((a, b) => a.id - b.id);
        break;
      case 'Popular':
        // 💡 The 'bids' property is a string, so we need to parse it
        filteredDeals.sort((a, b) => parseInt(b.bids.split(' ')[0]) - parseInt(a.bids.split(' ')[0]));
        break;
      case 'Price':
        filteredDeals.sort((a, b) => a.price - b.price);
        break;
      default:
        break;
    }

    setDeals(filteredDeals.slice(0, visibleCount));
  };

  const handleSearch = () => {
    setVisibleCount(3); // Reset visible count on new search
    applySorting(); // Trigger sorting with new search query
  };

  const handleSeeMore = () => {
    setVisibleCount(prev => prev + 3);
  };

  const handleCardClick = (dealId) => {
    navigate(`/ticket-details/${dealId}`);
  };

  return (
    <div className="ticket-auction-app">
      <Navbar />
      <div className="ticket-app-header">
        <h1>Your Journey, Your Price.</h1>
      </div>

      {/* AuctionNav integrated here */}
      <div className="auction-nav-integrated">
        <div className="nav-icons">
          {auctionNavIcons.map((item) => (
            <button key={item.label} className="icon-btn" onClick={() => navigate(item.path)}>
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="ticket-searchbar-wrapper">
        <input
          type="text"
          placeholder="Search by activity or location"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="ticket-search-input"
        />
        <button className="ticket-search-button" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className="ticket-deals-section">
        <div className="ticket-sort-section">
          <div className="ticket-sort-header">
            <h2 className="ticket-sort-title">Best Tour & Ticket Deals</h2>
          </div>
          <div className="ticket-sort-by">
            <label htmlFor="ticket-sort">Sort by:</label>
            <select
              id="ticket-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option>All</option>
              <option>Newest</option>
              <option>Oldest</option>
              <option>Popular</option>
              <option>Price</option>
            </select>
          </div>
        </div>

        <div className="ticket-deals-list">
          {deals.length > 0 ? (
            deals.map((deal) => (
              <div
                className="ticket-deal-card"
                key={deal.id}
                onClick={() => handleCardClick(deal.id)}
                style={{ cursor: 'pointer' }}
              >
                <img src={deal.img} alt={deal.title} className="ticket-deal-img" />
                <div className="ticket-deal-content">
                  <div className="ticket-deal-title">{deal.title}</div>
                  <div className="ticket-deal-location">
                    <span className="ticket-icon-text">
                      <MdOutlineLocationCity /> : {deal.location}
                    </span>
                  </div>
                  <div className="ticket-deal-meta">
                    <span>{deal.time}</span>
                    <span>{deal.bids} bids</span>
                  </div>
                </div>
                <div className="ticket-deal-price">{deal.price.toFixed(4)} ETH</div>
              </div>
            ))
          ) : (
            <div className="no-deals-message">No deals found for your search.</div>
          )}
        </div>

        {visibleCount < allTourDeals.length && deals.length > 0 && (
          <button className="ticket-see-more-btn" onClick={handleSeeMore}>
            See More
          </button>
        )}
      </div>
    </div>
  );
};

export default TicketAuction;