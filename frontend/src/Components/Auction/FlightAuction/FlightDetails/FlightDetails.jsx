import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../../Homepage/Navbar/Navbar";
import { 
  MdOutlineLocationCity, 
  MdWifi, 
  MdRestaurant, 
  MdLuggage,
  MdAirlineSeatReclineExtra,
  MdLocalMovies,
  MdOutlineFlightTakeoff,
  MdOutlineFlightLand
} from "react-icons/md";
import { IoCalendarNumber, IoPersonOutline, IoTimeOutline, IoAirplane } from "react-icons/io5";
import { FaPlane, FaWifi, FaCoffee, FaUsb } from "react-icons/fa";
import { RiCloseFill } from "react-icons/ri";
import { TbPlaneDeparture, TbPlaneArrival } from "react-icons/tb";
import './flightdetails.css';

// Import the combined data set
import { allAuctionDeals } from '../../../../Data/AuctionData';

const airports = {
  "Taipei": { code: "TPE", city: "Taipei", name: "Taiwan Taoyuan International Airport" },
  "Tokyo": { code: "NRT", city: "Tokyo", name: "Narita International Airport" },
  "Seoul": { code: "ICN", city: "Seoul", name: "Incheon International Airport" },
  "Hong Kong": { code: "HKG", city: "Hong Kong", name: "Hong Kong International Airport" },
  "Shanghai": { code: "PVG", city: "Shanghai", name: "Shanghai Pudong International Airport" },
  "Singapore": { code: "SIN", city: "Singapore", name: "Singapore Changi Airport" },
  "Bangkok": { code: "BKK", city: "Bangkok", name: "Suvarnabhumi Airport" },
  "Kuala Lumpur": { code: "KUL", city: "Kuala Lumpur", name: "Kuala Lumpur International Airport" },
  "Beijing": { code: "PEK", city: "Beijing", name: "Beijing Capital International Airport" },
  "Osaka": { code: "KIX", city: "Osaka", name: "Kansai International Airport" }
};

const aircraftTypes = [
  "Boeing 777-300ER",
  "Airbus A350-900",
  "Boeing 787-9 Dreamliner", 
  "Airbus A330-300",
  "Boeing 747-8F",
  "Airbus A380-800"
];

const FlightDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [flight, setFlight] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const deal = allAuctionDeals.find(deal => deal.id === parseInt(id));

    if (deal && deal.category === "Flights" && deal.time) {
      const [departureSegment, arrivalSegment] = deal.time.split(" → ");
      
      const departureTime = departureSegment ? departureSegment.trim() : '';
      const arrivalTime = arrivalSegment ? arrivalSegment.trim() : '';
      
      const departureCity = departureTime.split(" ")[1];
      const arrivalCity = arrivalTime.split(" ")[1];
      
      const departureAirport = airports[departureCity] || { code: "TPE", city: departureCity, name: `${departureCity} International Airport` };
      const arrivalAirport = airports[arrivalCity] || { code: "NRT", city: arrivalCity, name: `${arrivalCity} International Airport` };

      const departureDate = new Date(deal.departureDate);
      const formattedDate = departureDate.toLocaleDateString('en-US', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      });

      const today = new Date();
      const endTime = new Date();
      endTime.setDate(today.getDate() + Math.floor(Math.random() * 7) + 1);
      endTime.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));

      const bidHistory = [];
      const numBids = parseInt(deal.bids); 
      for (let i = 0; i < numBids; i++) {
        const bidDate = new Date();
        bidDate.setDate(today.getDate() - Math.floor(Math.random() * 5));
        const bidAmountVal = deal.price + (Math.random() * 0.3) - 0.15;
        bidHistory.push({
          bidder: `User${Math.floor(Math.random() * 900) + 100}`,
          amount: `${Math.max(0.1, bidAmountVal).toFixed(3)} ETH`,
          time: bidDate.toLocaleDateString('en-US', { 
            day: 'numeric', 
            month: 'short', 
            hour: '2-digit', 
            minute: '2-digit' 
          })
        });
      }
      bidHistory.sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount));

      const airlinePrefix = deal.title.split(' ')[0].substring(0, 2).toUpperCase();
      const flightNumber = `${airlinePrefix}${Math.floor(Math.random() * 900) + 100}`;

      setFlight({
        id: deal.id,
        img: deal.img,
        airline: deal.title,
        flightNumber: flightNumber,
        aircraft: aircraftTypes[Math.floor(Math.random() * aircraftTypes.length)],
        departure: {
          airport: departureAirport,
          time: departureTime.split(" ")[0],
          date: formattedDate
        },
        arrival: {
          airport: arrivalAirport,
          time: arrivalTime.split(" ")[0],
          date: formattedDate
        },
        duration: deal.duration,
        class: "Business Class",
        endTime: endTime,
        currentBid: `${deal.price.toFixed(3)}`,
        totalBids: deal.bids,
        bidHistory: bidHistory,
        description: `${deal.title} Business Class flight from ${departureCity} to ${arrivalCity}. Enjoy premium comfort with lie-flat seats, gourmet dining, priority boarding, and exclusive lounge access. Flight includes checked baggage, meal service, and entertainment system.`,
        amenities: [
          { icon: <MdWifi />, name: "Free Wi-Fi" },
          { icon: <MdRestaurant />, name: "Restaurant" },
          { icon: <MdAirlineSeatReclineExtra />, name: "Lie-flat Seats" },
          { icon: <MdLocalMovies />, name: "Entertainment" },
          { icon: <MdLuggage />, name: "Free Baggage" },
          { icon: <FaCoffee />, name: "Premium Lounge" }
        ]
      });
    } else {
      setFlight(null);
    }
  }, [id]);

  useEffect(() => {
    if (!flight) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = flight.endTime.getTime() - now;

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
  }, [flight]);

  const handlePlaceBid = () => {
    if (!bidAmount || parseFloat(bidAmount) <= parseFloat(flight.currentBid)) {
      alert('Please enter a valid bid amount higher than the current bid.');
      return;
    }
    
    alert(`Bid placed successfully for ${bidAmount} ETH!`);
    setBidAmount('');
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (!flight) {
    return (
      <div className="flight-details-app">
        <Navbar />
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flight-details-app">
      <Navbar />
      
      <div className="flight-details-container">
        <div className="flight-details-content">
          <button className="back-btn" onClick={handleBack}>
            <RiCloseFill className="back-icon" />
          </button>
          
          {/* Left Side - Image and Details */}
          <div className="flight-details-left">
            <div className="flight-image-container">
              <img src={flight.img} alt={flight.airline} className="flight-image" />
            </div>
            
            <div className="flight-info-section">
              <div className="description-section">
                <h3>Description</h3>
                <p>{flight.description}</p>
                <p className="period-info">
                  <strong>Period:</strong> {flight.departure.date}
                </p>
                <p><strong>Route:</strong> {flight.departure.airport.city} ({flight.departure.airport.code}) → {flight.arrival.airport.city} ({flight.arrival.airport.code})</p>
                <p><strong>Duration:</strong> {flight.duration}</p>
                <p><strong>Aircraft:</strong> {flight.aircraft}</p>
              </div>

              <div className="amenities-section">
                <h3>Amenities</h3>
                <div className="amenities-grid">
                  {flight.amenities.map((amenity, index) => (
                    <div key={index} className="amenity-item">
                      <span className="amenity-icon">{amenity.icon}</span>
                      <span className="amenity-name">{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Auction Panel */}
          <div className="flight-details-right">
            <div className="flight-title-section">
              <h2 className="flight-title">{flight.airline}</h2>
              <div className="flight-route">
                <IoAirplane className="route-icon" />
                <span>{flight.departure.airport.city} → {flight.arrival.airport.city}</span>
              </div>
              <div className="flight-date">
                <IoCalendarNumber className="date-icon" />
                <span>{flight.departure.date}</span>
              </div>
            </div>

            <div className="auction-stats">
              <div className="stat-item">
                <div className="stat-label">Number of Bids</div>
                <div className="stat-value">{flight.totalBids}</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">Ends In</div>
                <div className="stat-value time-left">{timeLeft}</div>
              </div>
            </div>

            <div className="current-bid-section">
              <div className="bid-label">Highest Bid</div>
              <div className="bid-amount">{flight.currentBid} ETH</div>
            </div>

            <div className="bid-input-section">
              <label className="input-label">Enter Your Bid</label>
              <div className="bid-input-wrapper">
                <input
                  type="number"
                  placeholder={`Min. ${(parseFloat(flight.currentBid) + 0.001).toFixed(3)}`}
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  step="0.001"
                  min={parseFloat(flight.currentBid) + 0.001}
                  className="bid-input"
                />
                <span className="currency-suffix">ETH</span>
              </div>
            </div>

            <button className="flight-place-bid-btn" onClick={handlePlaceBid}>
              Place Bid
            </button>

            <div className="bid-history-container">
              <h3 className="bid-history-title">Bid History</h3>
              <div className="bid-history-list">
                {flight.bidHistory.slice(0, 5).map((bid, index) => (
                  <div key={index} className="bid-history-item">
                    <div className="bidder-info">
                      <span className="bidder-name">{bid.bidder}</span>
                      <span className="bid-time">{bid.time}</span>
                    </div>
                    <span className="bid-amount-history">{bid.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightDetails;