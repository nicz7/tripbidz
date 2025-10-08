import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Homepage/Navbar/Navbar";

// Icons for AuctionNav (these are now directly imported into TransportationAuction)
import { BsAirplane } from "react-icons/bs";
import { RiHotelLine } from "react-icons/ri";
import { GrTicket } from "react-icons/gr";
import { LuTrainFrontTunnel } from "react-icons/lu";

// Transportation-specific icons
import { MdOutlineLocationCity } from "react-icons/md";
import { FaTrainSubway } from "react-icons/fa6";
import './transportationauction.css';

// 💡 1. Import the combined data set
import { allAuctionDeals } from '../../../Data/AuctionData';

const TransportationAuction = () => {
    const navigate = useNavigate();
    const [sortBy, setSortBy] = useState('All');
    const [visibleCount, setVisibleCount] = useState(3);
    const [deals, setDeals] = useState([]);
    const [location, setLocation] = useState("");
    const [category, setCategory] = useState("All");

    // Data for AuctionNav icons (moved from AuctionNav.jsx)
    const auctionNavIcons = [
        { label: "Flights", icon: <BsAirplane size={80} />, path: "/auction/flight" },
        { label: "Hotels", icon: <RiHotelLine size={80} />, path: "/auction/hotel" },
        { label: "Tours & Tickets", icon: <GrTicket size={80} />, path: "/auction/tickets" },
        { label: "Transportation", icon: <LuTrainFrontTunnel size={70} />, path: "/auction/transportation" }
    ];

    // 💡 2. Filter the imported deals for the "Transportation" category
    const allTransportationDeals = allAuctionDeals.filter(deal => deal.category === 'Transportation');

    // Function to parse time strings into minutes for sorting
    const parseTimeToMinutes = (timeString) => {
        const parts = timeString.match(/(\d+)\s*d|(\d+)\s*h|(\d+)\s*m/g);
        let totalMinutes = 0;
        if (parts) {
            parts.forEach(part => {
                const num = parseInt(part.match(/\d+/)[0]);
                if (part.includes('d')) totalMinutes += num * 1440;
                else if (part.includes('h')) totalMinutes += num * 60;
                else if (part.includes('m')) totalMinutes += num;
            });
        }
        return totalMinutes;
    };

    const applySort = (sortOption, dealsToSort) => {
        let sorted = [...dealsToSort];
        switch (sortOption) {
            case 'Newest':
                sorted.sort((a, b) => a.timeInMinutes - b.timeInMinutes);
                break;
            case 'Oldest':
                sorted.sort((a, b) => b.timeInMinutes - a.timeInMinutes);
                break;
            case 'Popular':
                sorted.sort((a, b) => parseInt(b.bids) - parseInt(a.bids));
                break;
            case 'Price':
                sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
                break;
            default:
                break;
        }
        return sorted;
    };

    const applyFilters = () => {
        // 💡 3. Start with the filtered array instead of the local mock data
        let filtered = [...allTransportationDeals];
        
        if (location) filtered = filtered.filter(d => d.location.toLowerCase().includes(location.toLowerCase()));
        if (category !== "All") filtered = filtered.filter(d => d.type === category); // Changed from .category to .type to match your data structure

        return applySort(sortBy, filtered);
    };

    useEffect(() => {
        const filteredSorted = applyFilters();
        setDeals(filteredSorted.slice(0, visibleCount));
    }, [location, category, sortBy, visibleCount]);

    const handleSearch = () => {
        setVisibleCount(3);
        // useEffect will re-run and apply filters/sort based on state changes
    };

    const handleSeeMore = () => {
        setVisibleCount(prev => prev + 3);
    };

    const handleCardClick = (id) => {
        navigate(`/transportation-details/${id}`);
    };

    return (
        <div className="auction-app">
            <Navbar />
            <div className="transportation-app-header">
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

            <div className="transportation-searchbar-wrapper">
                <div className="transportation-searchbar-fields">
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="transportation-search-options"
                    >
                        <option value="All">Types (Trains / Rail passes / Buses / Rentals / Cruises)</option>
                        <option value="Bus">Bus</option>
                        <option value="Ferry">Ferry</option>
                        <option value="HSR">HSR</option>
                        <option value="Train">Train</option>
                        <option value="Subway">Subway</option>
                        <option value="Rail Pass">Rail Pass</option>
                        <option value="Cruise">Cruise</option>
                        <option value="Rental">Rental</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="transportation-search-input"
                    />
                </div>
                <button onClick={handleSearch} className="transportation-search-button">
                    Search
                </button>
            </div>

            <div className="transportation-deals-section">
                <div className="transportation-sort-section">
                    <div className="transportation-sort-header">
                        <h2 className="transportation-sort-title">Best Transportation Deals</h2>
                    </div>
                    <div className="transportation-sort-by">
                        <label htmlFor="transportation-sort">Sort by:</label>
                        <select
                            id="transportation-sort"
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

                <div className="transportation-deals-list">
                    {deals.length > 0 ? (
                        deals.map((deal) => (
                            <div
                                className="transportation-deal-card"
                                key={deal.id}
                                onClick={() => handleCardClick(deal.id)}
                                style={{ cursor: 'pointer' }}
                            >
                                <img src={deal.img} alt={deal.title} className="transportation-deal-img" />
                                <div className="transportation-deal-content">
                                    <div className="transportation-deal-title">{deal.title}</div>
                                    <div className="transportation-deal-location">
                                        <span className="transportation-icon-text">
                                            <MdOutlineLocationCity /> : {deal.location}
                                        </span>
                                        <span className="transportation-icon-text">
                                            <FaTrainSubway /> : {deal.type}
                                        </span>
                                    </div>
                                    <div className="transportation-deal-meta">
                                        <span>{deal.time}</span>
                                        <span>{deal.bids} bids</span>
                                    </div>
                                </div>
                                <div className="transportation-deal-price">{deal.price.toFixed(4)} ETH</div>
                            </div>
                        ))
                    ) : (
                        <div className="no-deals-message">No deals found for your search.</div>
                    )}
                </div>

                {visibleCount < allTransportationDeals.length && deals.length > 0 && (
                    <button className="transportation-see-more-btn" onClick={handleSeeMore}>
                        See More
                    </button>
                )}
            </div>
        </div>
    );
};

export default TransportationAuction;