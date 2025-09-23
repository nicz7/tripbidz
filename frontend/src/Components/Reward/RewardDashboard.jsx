import React, { useState } from 'react';
import { rewardsDiscounts } from '../../Data/AuctionData';
import './rewarddashboard.css';

const RewardsDashboard = () => {
  // Use state to manage the user's points
  const [userPoints, setUserPoints] = useState(1250);
  const [activeFilter, setActiveFilter] = useState('All Discounts');

  const filters = [
    'All Discounts',
    'Flight Discounts',
    'Hotel Vouchers',
    'Ticket Discounts',
    'Transportation Discounts'
  ];

  const filteredDiscounts = activeFilter === 'All Discounts' 
    ? rewardsDiscounts 
    : rewardsDiscounts.filter(discount => discount.category === activeFilter);
    
  // Function to handle using a discount
  const handleUseDiscount = (discountPoints) => {
    if (userPoints >= discountPoints) {
      setUserPoints(userPoints - discountPoints);
      alert('Discount successfully used!');
      // A real application would likely also handle API calls and state updates
      // to remove the used voucher from the user's available rewards.
    } else {
      alert('Not enough points to use this discount.');
    }
  };

  return (
    <div className="rewards-dashboard">
      {/* Points Header */}
      <div className="rewards-header">
        <h1 className="rewards-title">Reward and Voucher</h1>
      </div>

      <div className="points-header">
        <div className="points-display">
          {/* Display points from state */}
          <h2 className="points-amount">{userPoints.toLocaleString()} points</h2>
          <div className="points-progress">
            <div className="progress-bar">
              {/* Progress bar width based on userPoints */}
              <div className="progress-fill" style={{ width: `${(userPoints / 1750) * 100}%` }}></div>
            </div>
            {/* Logic to show points until next reward */}
            <p className="progress-text">
              {1750 - userPoints > 0 ? `${1750 - userPoints} points until next reward` : 'You have earned a new reward!'}
            </p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="filter-section">
        <span className="filter-label">Filter:</span>
        <div className="filter-tabs">
          {filters.map(filter => (
            <button
              key={filter}
              className={`filter-tab ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Discount Cards */}
      <div className="discount-cards">
        {filteredDiscounts.map(discount => (
          <div key={discount.id} className="discount-card">
            <div className="card-image">
              <img src={discount.image} alt={discount.title} />
            </div>
            <div className="card-content">
              <h3 className="card-title">{discount.title}</h3>
              <p className="card-description">{discount.description}</p>
              <p className="card-expires">{discount.expires}</p>
            </div>
            <div className="card-points">
              <span className="points-value">{discount.points} points</span>
              <button 
                className="use-now-btn"
                // Disable button if user doesn't have enough points
                disabled={userPoints < discount.points}
                // Call the handler with the discount points
                onClick={() => handleUseDiscount(discount.points)}
              >
                Use Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Show message when no discounts match filter */}
      {filteredDiscounts.length === 0 && (
        <div className="no-discounts">
          <p>No discounts available for the selected category.</p>
        </div>
      )}
    </div>
  );
};

export default RewardsDashboard;