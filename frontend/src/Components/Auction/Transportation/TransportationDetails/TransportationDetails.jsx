import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../../Homepage/Navbar/Navbar";
import { MdOutlineLocationCity, MdDirectionsBus, MdDirectionsBoat } from "react-icons/md";
import { IoCalendarNumber, IoTimeOutline } from "react-icons/io5";
import { FaTrainSubway } from "react-icons/fa6";
import { RiCloseFill } from "react-icons/ri";
import './transportationdetails.css';

// 💡 1. Import the combined data set
import { allAuctionDeals } from '../../../../Data/AuctionData';

// Helper to get an icon based on category
const getCategoryIcon = (type) => {
  switch (type) {
    case "Bus":
    case "Shuttle":
      return <MdDirectionsBus />;
    case "Ferry":
    case "Cruise":
      return <MdDirectionsBoat />;
    case "HSR":
    case "Train":
    case "Subway":
    case "Rail Pass":
      return <FaTrainSubway />;
    case "Rental":
      return <IoTimeOutline />; // Using time outline as a generic icon for rental
    default:
      return <FaTrainSubway />;
  }
};

const TransportationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [transportation, setTransportation] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    // 💡 2. Find the specific transportation deal from the main data array
    const deal = allAuctionDeals.find(deal => deal.id === parseInt(id));

    if (deal && deal.category === "Transportation") {
      // 💡 3. Generate dynamic details using the found deal
      const today = new Date();
      const endTime = new Date();
      endTime.setDate(today.getDate() + Math.floor(Math.random() * 7) + 1);
      endTime.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));

      const bidHistory = [];
      const numBids = Math.floor(Math.random() * 10) + 3;
      for (let i = 0; i < numBids; i++) {
        const bidDate = new Date();
        bidDate.setDate(today.getDate() - Math.floor(Math.random() * 5));
        bidHistory.push({
          bidder: `User${Math.floor(Math.random() * 900) + 100}`,
          amount: `${(Math.random() * 0.15 + 0.05).toFixed(3)} ETH`,
          time: bidDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
        });
      }
      bidHistory.sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount));

      // The `time` property from the data is a string, so we'll use it as the duration.
      // `deal.startDate` and `deal.endDate` would be needed to show a range, but for a simple component,
      // we can just use the single date. Let's create a dynamic date.
      const departureDate = new Date();
      departureDate.setDate(today.getDate() + Math.floor(Math.random() * 30) + 1);
      const formatDate = (date) => {
          const options = { day: 'numeric', month: 'long', year: 'numeric' };
          return date.toLocaleDateString('en-US', options);
      };

      setTransportation({
        ...deal,
        img: deal.img,
        departureDate: formatDate(departureDate),
        arrivalDate: formatDate(new Date(departureDate.getTime() + 86400000)), // Add one day
        departureTime: '8:00 AM',
        arrivalTime: '11:00 AM',
        duration: deal.time, // Re-using the time string from the original data
        endTime: endTime,
        currentBid: `${(parseFloat(deal.price) + Math.random() * 0.1).toFixed(3)} ETH`,
        totalBids: numBids,
        bidHistory: bidHistory,
        description: `This auction is for a **${deal.type}** ticket for the route from ${deal.location}. Enjoy a comfortable and efficient journey. This is a one-way ticket for a single passenger.`,
        details: [
          { icon: getCategoryIcon(deal.type), name: deal.type },
          { icon: <IoTimeOutline />, name: `Duration: ${deal.time}` },
          { icon: <IoCalendarNumber />, name: "Flexible Date" },
        ]
      });
    } else {
      setTransportation(null);
    }
  }, [id]);

  useEffect(() => {
    if (!transportation) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = transportation.endTime.getTime() - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        
        setTimeLeft(`${days}d ${hours}h ${minutes}m`);
      } else {
        setTimeLeft('Auction Ended');
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [transportation]);

  const handlePlaceBid = () => {
    if (!bidAmount || parseFloat(bidAmount) <= parseFloat(transportation.currentBid)) {
      alert('Please enter a valid bid amount higher than the current bid.');
      return;
    }
    
    alert(`Bid placed successfully for ${bidAmount} ETH!`);
    setBidAmount('');
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (!transportation) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="transportation-details-app">
      <Navbar />
      
      <div className="transportation-details-container">
        <div className="transportation-details-content">
          <button className="back-btn" onClick={handleBack}>
            <RiCloseFill className="back-icon" />
          </button> 
          <div className="transportation-details-left">
            <div className="transportation-image-container">
              <img src={transportation.img} alt={transportation.title} className="transportation-details-img" />
            </div>

            <div className="transportation-description-section">
              <h3>Description:</h3>
              <p>{transportation.description}</p>
              <p><strong>Route:</strong> {transportation.location}</p>
              <p><strong>Departure:</strong> {transportation.departureDate} at {transportation.departureTime}</p>
              <p><strong>Arrival:</strong> {transportation.arrivalDate} at {transportation.arrivalTime}</p>
            </div>

            <div className="transportation-details-section">
              <h3>Transportation Details:</h3>
              <div className="details-grid">
                {transportation.details.map((detail, index) => (
                  <div key={index} className="detail-item">
                    <span className="detail-icon">{detail.icon}</span>
                    <span className="detail-name">{detail.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="transportation-details-right">
            <div className="transportation-title-section">
              <h1 className="transportation-details-title">{transportation.title}</h1>
              <div className="transportation-location-info">
                <MdOutlineLocationCity className="location-icon" />
                <span>{transportation.location}</span>
              </div>
              <div className="transportation-dates-info">
                <IoCalendarNumber className="date-icon" />
                <span>{transportation.departureDate} - {transportation.arrivalDate}</span>
              </div>
              <div className="transportation-time-info">
                <IoTimeOutline className="time-icon" />
                <span>{transportation.duration}</span>
              </div>
            </div>

            <div className="auction-info-section">
              <div className="auction-stats">
                <div className="stat-item">
                  <span className="stat-label">Number of Bids</span>
                  <span className="stat-value">{transportation.totalBids}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Ends In</span>
                  <span className="stat-value time-left">{timeLeft}</span>
                </div>
              </div>

              <div className="current-bid-section">
                <span className="highest-bid-label">Highest Bid</span>
                <span className="highest-bid-amount">{transportation.currentBid}</span>
              </div>

              <div className="bid-input-section">
                <label htmlFor="bid-amount">Enter Your Bid</label>
                <div className="bid-input-container">
                  <input
                    type="number"
                    id="bid-amount"
                    placeholder={`Min. ${(parseFloat(transportation.currentBid) + 0.001).toFixed(3)}`}
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    step="0.001"
                    min={parseFloat(transportation.currentBid) + 0.001}
                  />
                  <span className="currency-label">ETH</span>
                </div>
              </div>

              <button className="transportation-place-bid-btn" onClick={handlePlaceBid}>
                Place Bid
              </button>

              <div className="bid-history-section">
                <h3>Bid History</h3>
                <div className="bid-history-list">
                  {transportation.bidHistory.slice(0, 5).map((bid, index) => (
                    <div key={index} className="bid-history-item">
                      <span className="bidder-name">{bid.bidder}</span>
                      <span className="bid-time">{bid.time}</span>
                      <span className="bid-amount-history">{bid.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransportationDetails;