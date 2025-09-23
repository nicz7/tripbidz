import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../../Homepage/Navbar/Navbar";
import { MdOutlineLocationCity, MdWifi, MdRestaurant, MdPool, MdFitnessCenter } from "react-icons/md";
import { IoCalendarNumber, IoBedOutline } from "react-icons/io5";
import { FaParking, FaSpa, FaConciergeBell } from "react-icons/fa";
import { RiCloseFill } from "react-icons/ri";
import './hoteldetails.css';

// Import the combined data set
import { allAuctionDeals } from '../../../../Data/AuctionData';

const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    // Find the specific deal from the main data array
    const deal = allAuctionDeals.find(deal => deal.id === parseInt(id));

    if (deal && deal.category === "Hotel") {
      // Create dynamic details based on the found hotel deal
      const today = new Date();
      
      // We need to generate a new end time to use for the countdown timer
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

      setHotel({
        ...deal,
        endTime: endTime,
        currentBid: `${(parseFloat(deal.price) + Math.random() * 0.1).toFixed(3)} ETH`,
        totalBids: numBids,
        bidHistory: bidHistory,
        description: `Room with one king bed, city view, free Wi-Fi, full toiletries, and breakfast included. Located in ${deal.location}, ${deal.title} blends modern comfort with elegant design—featuring an outdoor pool, sauna, and six dining venues. Perfect for two, just minutes from local attractions.`,
        amenities: [
          { icon: <MdWifi />, name: "Free Wi-Fi" },
          { icon: <MdRestaurant />, name: "Restaurant" },
          { icon: <MdPool />, name: "Swimming Pool" },
          { icon: <MdFitnessCenter />, name: "Fitness Center" },
          { icon: <FaParking />, name: "Free Parking" },
          { icon: <FaSpa />, name: "Spa & Wellness" },
          { icon: <FaConciergeBell />, name: "Concierge" },
          { icon: <IoBedOutline />, name: "King Bed" }
        ]
      });
    } else {
      setHotel(null); // Handle cases where no deal is found or it's not a hotel
    }
  }, [id]);

  useEffect(() => {
    if (!hotel) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = hotel.endTime.getTime() - now;

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
  }, [hotel]);

  const handlePlaceBid = () => {
    if (!bidAmount || parseFloat(bidAmount) <= parseFloat(hotel.currentBid)) {
      alert('Please enter a valid bid amount higher than the current bid.');
      return;
    }
    
    alert(`Bid placed successfully for ${bidAmount} ETH!`);
    setBidAmount('');
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (!hotel) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="hotel-details-app">
      <Navbar />
      
      <div className="hotel-details-container">
        <div className="hotel-details-content">
          <button className="back-btn" onClick={handleBack}>
            <RiCloseFill className="back-icon" />
          </button> 
          <div className="hotel-details-left">
            <div className="hotel-image-container">
              <img src={hotel.img} alt={hotel.title} className="hotel-details-img" />
            </div>

            <div className="hotel-description-section">
              <h3>Description:</h3>
              <p>{hotel.description}</p>
              <p><strong>Period:</strong> {hotel.startDate} - {hotel.endDate}</p>
            </div>

            <div className="hotel-amenities-section">
              <h3>Amenities:</h3>
              <div className="amenities-grid">
                {hotel.amenities.map((amenity, index) => (
                  <div key={index} className="amenity-item">
                    <span className="amenity-icon">{amenity.icon}</span>
                    <span className="amenity-name">{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="hotel-details-right">
            <div className="hotel-title-section">
              <h1 className="hotel-details-title">{hotel.title}</h1>
              <div className="hotel-location-info">
                <MdOutlineLocationCity className="location-icon" />
                <span>{hotel.location}</span>
              </div>
              <div className="hotel-dates-info">
                <IoCalendarNumber className="date-icon" />
                <span>{hotel.startDate} - {hotel.endDate}</span>
              </div>
            </div>

            <div className="auction-info-section">
              <div className="auction-stats">
                <div className="stat-item">
                  <span className="stat-label">Number of Bids</span>
                  <span className="stat-value">{hotel.totalBids}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Ends In</span>
                  <span className="stat-value time-left">{timeLeft}</span>
                </div>
              </div>

              <div className="current-bid-section">
                <span className="highest-bid-label">Highest Bid</span>
                <span className="highest-bid-amount">{hotel.currentBid}</span>
              </div>

              <div className="bid-input-section">
                <label htmlFor="bid-amount">Enter Your Bid</label>
                <div className="bid-input-container">
                  <input
                    type="number"
                    id="bid-amount"
                    placeholder={`Min. ${(parseFloat(hotel.currentBid) + 0.001).toFixed(3)}`}
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    step="0.001"
                    min={parseFloat(hotel.currentBid) + 0.001}
                  />
                  <span className="currency-label">ETH</span>
                </div>
              </div>

              <button className="hotel-place-bid-btn" onClick={handlePlaceBid}>
                Place Bid
              </button>

              <div className="bid-history-section">
                <h3>Bid History</h3>
                <div className="bid-history-list">
                  {hotel.bidHistory.slice(0, 5).map((bid, index) => (
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

export default HotelDetails;