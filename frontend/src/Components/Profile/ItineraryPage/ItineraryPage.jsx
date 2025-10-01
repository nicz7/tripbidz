import React from "react";
import { useNavigate } from "react-router-dom";
import './itinerarypage.css';

const itineraries = [
  {
    title: "Japan Adventure",
    location: "Tokyo, Japan",
    dateRange: "Jun 17 - Jun 24, 2025",
    timeAgo: "23 hours ago",
  },
  {
    title: "France Adventure",
    location: "Paris, France",
    dateRange: "Jul 17 - Jul 26, 2025",
    timeAgo: "16 hours ago",
  },
  {
    title: "Thailand Adventure",
    location: "Tokyo, Japan",
    dateRange: "Sep 11 - Sep 14, 2025",
    timeAgo: "10 hours ago",
  },
  {
    title: "Indonesia Adventure",
    location: "Jakarta, Indonesia",
    dateRange: "Dec 17 - Dec 20, 2025",
    timeAgo: "8 hours ago",
  },
];

const ItineraryPage = () => {
  const navigate = useNavigate();

  const goToChatbot = () => {
    navigate("/chatbot");
  };

  return(
    <div className="content">
      <h2 className="itinerary-header">Itinerary History</h2>
      {itineraries.map((trip, index) => (
        <div className="itinerary-item" key={index} onClick={goToChatbot}>
          <div className="item-header">
            <span className="trip-title">{trip.title}</span>
            <span className="trip-time">{trip.timeAgo}</span>
          </div>
          <div className="trip-location">{trip.location}</div>
          <div className="trip-dates">{trip.dateRange}</div>
        </div>
      ))}
    </div>
  )
}

export default ItineraryPage