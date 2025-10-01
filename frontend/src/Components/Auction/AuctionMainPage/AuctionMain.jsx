import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Homepage/Navbar/Navbar";

// Icons for AuctionNav
import { BsAirplane } from "react-icons/bs";
import { RiHotelLine } from "react-icons/ri";
import { GrTicket } from "react-icons/gr";
import { LuTrainFrontTunnel } from "react-icons/lu";

import { MdOutlineLocationCity } from "react-icons/md";
import { IoCalendarNumber } from "react-icons/io5";
import { FaPlane, FaHotel, FaTicketAlt, FaTrain } from "react-icons/fa";

// Import your unified data from the new file
import { allAuctionDeals } from '../../../Data/AuctionData';

import './auctionpage.css';

const AuctionMain = () => {
    const navigate = useNavigate();
    const [destination, setDestination] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [category, setCategory] = useState('All');
    const [sortBy, setSortBy] = useState('All');
    const [visibleCount, setVisibleCount] = useState(3);
    const [filteredDeals, setFilteredDeals] = useState(allAuctionDeals);
    const [deals, setDeals] = useState(allAuctionDeals.slice(0, 3));

    const auctionNavIcons = [
        { label: "Flights", icon: <BsAirplane size={80} />, path: "/auction/flight" },
        { label: "Hotels", icon: <RiHotelLine size={80} />, path: "/auction/hotel" },
        { label: "Tours & Tickets", icon: <GrTicket size={80} />, path: "/auction/tickets" },
        { label: "Transportation", icon: <LuTrainFrontTunnel size={70} />, path: "/auction/transportation" }
    ];

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
                sorted.sort((a, b) => parseTimeToMinutes(a.time) - parseTimeToMinutes(b.time));
                break;
            case 'Oldest':
                sorted.sort((a, b) => parseTimeToMinutes(b.time) - parseTimeToMinutes(a.time));
                break;
            case 'Popular':
                sorted.sort((a, b) => parseInt(b.bids) - parseInt(a.bids));
                break;
            case 'Price':
                sorted.sort((a, b) => a.price - b.price);
                break;
            default:
                break;
        }
        return sorted;
    };

    useEffect(() => {
        const sorted = applySort(sortBy, filteredDeals);
        setDeals(sorted.slice(0, visibleCount));
    }, [sortBy, filteredDeals, visibleCount]);

    const handleSearch = () => {
        const filtered = allAuctionDeals.filter((deal) => {
            const matchesDestination = destination
                ? deal.location.toLowerCase().includes(destination.toLowerCase())
                : true;
            const matchesCategory = category === 'All' || deal.category.toLowerCase() === category.toLowerCase();
            let matchesDate = true;
            
            if (dateFrom && dateTo) {
                const fromDateObj = new Date(dateFrom);
                const toDateObj = new Date(dateTo);
                const dealStartDateObj = new Date(deal.startDate);
                const dealEndDateObj = new Date(deal.endDate);

                matchesDate = (dealStartDateObj >= fromDateObj && dealStartDateObj <= toDateObj) ||
                              (dealEndDateObj >= fromDateObj && dealEndDateObj <= toDateObj) ||
                              (fromDateObj >= dealStartDateObj && fromDateObj <= dealEndDateObj);
            }
            return matchesDestination && matchesCategory && matchesDate;
        });

        const sortedFiltered = applySort(sortBy, filtered);
        setFilteredDeals(filtered);
        setVisibleCount(3);
        setDeals(sortedFiltered.slice(0, 3));
    };

    const handleSeeMore = () => {
        const nextCount = visibleCount + 3;
        const sorted = applySort(sortBy, filteredDeals);
        setDeals(sorted.slice(0, nextCount));
        setVisibleCount(nextCount);
    };

    const handleCardClick = (deal) => {
        switch (deal.category) {
            case 'Flights':
                navigate(`/flight-details/${deal.id}`);
                break;
            case 'Hotel':
                navigate(`/hotel-details/${deal.id}`);
                break;
            case 'Tour':
                navigate(`/ticket-details/${deal.id}`);
                break;
            case 'Transportation':
                navigate(`/transportation-details/${deal.id}`);
                break;
            default:
                navigate(`/auction-details/${deal.id}`);
        }
    };

    const getCategoryIcon = (categoryName) => {
        switch (categoryName) {
            case 'Flight':
                return <FaPlane className="category-icon" />;
            case 'Hotel':
                return <FaHotel className="category-icon" />;
            case 'Tour':
                return <FaTicketAlt className="category-icon" />;
            case 'Transportation':
                return <FaTrain className="category-icon" />;
            default:
                return null;
        }
    };

    return (
        <div className="auction-main-app">
            <Navbar />
            <div className="auction-app-header">
                <h1>Your Journey, Your Price.</h1>
            </div>
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
            <div className="auction-searchbar-container">
                <div className="search-row">
                    <div className="search-field">
                        <label className="auction-label">Destination :</label>
                        <input
                            type="text"
                            placeholder="Enter destination"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            className="auction-destination-input"
                        />
                    </div>
                    <div className="search-field">
                        <label className="auction-label">Category :</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="auction-category-select"
                        >
                            <option value="All">All Categories</option>
                            <option value="Flight">Flights</option>
                            <option value="Hotel">Hotels</option>
                            <option value="Tour">Tours & Tickets</option>
                            <option value="Transportation">Transportation</option>
                        </select>
                    </div>
                </div>
                <div className="auction-date-group">
                    <div className="auction-date-field">
                        <label className="auction-label">From Date :</label>
                        <input
                            type="date"
                            value={dateFrom}
                            onChange={(e) => setDateFrom(e.target.value)}
                            className="auction-date-input"
                        />
                    </div>
                    <div className="auction-date-field">
                        <label className="auction-label">To Date :</label>
                        <input
                            type="date"
                            value={dateTo}
                            onChange={(e) => setDateTo(e.target.value)}
                            className="auction-date-input"
                        />
                    </div>
                </div>
                <div className="auction-search-btn-container">
                    <button className="auction-search-btn" onClick={handleSearch}>
                        Search
                    </button>
                </div>
            </div>
            <div className="auction-deals-section">
                <div className="auction-sort-section">
                    <div className="auction-sort-header">
                        <h2 className="auction-sort-title">Live Auction Deals</h2>
                    </div>
                    <div className="auction-sort-by">
                        <label htmlFor="auction-sort">Sort by:</label>
                        <select
                            id="auction-sort"
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
                <div className="auction-deals-grid">
                    {deals.length > 0 ? (
                        deals.map((deal) => (
                            <div 
                                className="auction-deal-card" 
                                key={deal.id}
                                onClick={() => handleCardClick(deal)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="auction-card-image-container">
                                    <img src={deal.img} alt={deal.title} className="auction-deal-img" />
                                    <div className="auction-category-badge">
                                        {getCategoryIcon(deal.category)}
                                        <span>{deal.category}</span>
                                    </div>
                                </div>
                                <div className="auction-deal-info">
                                    <div className="auction-deal-title">{deal.title}</div>
                                    <div className="auction-deal-location">
                                        <span className="auction-icon-text">
                                            <MdOutlineLocationCity /> {deal.location}
                                        </span>
                                    </div>
                                    <div className="auction-deal-dates">
                                        <span className="auction-icon-text">
                                            <IoCalendarNumber /> {deal.startDate} - {deal.endDate}
                                        </span>
                                    </div>
                                    <div className="auction-deal-meta">
                                        <span className="auction-time-remaining">{deal.time}</span>
                                        <span className="auction-bid-count">{deal.bids} bids</span>
                                    </div>
                                    <div className="auction-deal-price">
                                        {deal.price.toFixed(3)} ETH
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-deals-message">No deals found for your search.</div>
                    )}
                </div>
                {visibleCount < filteredDeals.length && deals.length > 0 && (
                    <button className="auction-see-more-btn" onClick={handleSeeMore}>
                        See More
                    </button>
                )}
            </div>
        </div>
    );
};

export default AuctionMain;