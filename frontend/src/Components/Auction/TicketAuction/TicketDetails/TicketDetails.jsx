import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../../Homepage/Navbar/Navbar";
import { MdOutlineLocationCity } from "react-icons/md";
import { IoCalendarNumber, IoPersonOutline } from "react-icons/io5";
import { RiCloseFill } from "react-icons/ri";
import { GiTicket } from "react-icons/gi";
import './ticketdetails.css';

// 💡 Import the combined data set
import { allAuctionDeals } from '../../../../Data/AuctionData';

const TicketDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    // 💡 Find the specific deal from the main data array
    const deal = allAuctionDeals.find(deal => deal.id === parseInt(id));

    if (deal && deal.category === "Tour") {
      // 💡 Create dynamic details based on the found deal
      const today = new Date();
      
      // We need a dynamic end time for the countdown, so we create one
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

      setTicket({
        ...deal,
        eventDate: deal.startDate,
        endTime: endTime,
        currentBid: `${(parseFloat(deal.price) + Math.random() * 0.1).toFixed(3)} ETH`,
        totalBids: numBids,
        bidHistory: bidHistory,
        description: `This ticket grants admission to the incredible ${deal.title} on ${deal.startDate}. The event is located at the famous ${deal.location}. Don't miss this one-of-a-kind experience!`,
        details: [
          { icon: <IoPersonOutline />, name: "1 Ticket" },
          { icon: <GiTicket />, name: `Premium Entry` },
        ]
      });
    } else {
      setTicket(null);
    }
  }, [id]);

  useEffect(() => {
    if (!ticket) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = ticket.endTime.getTime() - now;

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
  }, [ticket]);

  const handlePlaceBid = () => {
    if (!bidAmount || parseFloat(bidAmount) <= parseFloat(ticket.currentBid)) {
      alert('Please enter a valid bid amount higher than the current bid.');
      return;
    }
    
    alert(`Bid placed successfully for ${bidAmount} ETH!`);
    setBidAmount('');
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (!ticket) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="ticket-details-app">
      <Navbar />
      
      <div className="ticket-details-container">
        <div className="ticket-details-content">
          <button className="back-btn" onClick={handleBack}>
            <RiCloseFill className="back-icon" />
          </button> 
          <div className="ticket-details-left">
            <div className="ticket-image-container">
              <img src={ticket.img} alt={ticket.title} className="ticket-details-img" />
            </div>

            <div className="ticket-description-section">
              <h3>Description:</h3>
              <p>{ticket.description}</p>
              <p><strong>Event Date:</strong> {ticket.eventDate}</p>
            </div>

            <div className="ticket-details-section">
              <h3>Ticket Details:</h3>
              <div className="details-grid">
                {ticket.details.map((detail, index) => (
                  <div key={index} className="detail-item">
                    <span className="detail-icon">{detail.icon}</span>
                    <span className="detail-name">{detail.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="ticket-details-right">
            <div className="ticket-title-section">
              <h1 className="ticket-details-title">{ticket.title}</h1>
              <div className="ticket-location-info">
                <MdOutlineLocationCity className="location-icon" />
                <span>{ticket.location}</span>
              </div>
              <div className="ticket-dates-info">
                <IoCalendarNumber className="date-icon" />
                <span>{ticket.eventDate}</span>
              </div>
            </div>

            <div className="auction-info-section">
              <div className="auction-stats">
                <div className="stat-item">
                  <span className="stat-label">Number of Bids</span>
                  <span className="stat-value">{ticket.totalBids}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Ends In</span>
                  <span className="stat-value time-left">{timeLeft}</span>
                </div>
              </div>

              <div className="current-bid-section">
                <span className="highest-bid-label">Highest Bid</span>
                <span className="highest-bid-amount">{ticket.currentBid}</span>
              </div>

              <div className="bid-input-section">
                <label htmlFor="bid-amount">Enter Your Bid</label>
                <div className="bid-input-container">
                  <input
                    type="number"
                    id="bid-amount"
                    placeholder={`Min. ${(parseFloat(ticket.currentBid) + 0.001).toFixed(3)}`}
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    step="0.001"
                    min={parseFloat(ticket.currentBid) + 0.001}
                  />
                  <span className="currency-label">ETH</span>
                </div>
              </div>

              <button className="ticket-place-bid-btn" onClick={handlePlaceBid}>
                Place Bid
              </button>

              <div className="bid-history-section">
                <h3>Bid History</h3>
                <div className="bid-history-list">
                  {ticket.bidHistory.slice(0, 5).map((bid, index) => (
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

export default TicketDetails;