import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Homepage/Navbar/Navbar";

import { BsAirplane } from "react-icons/bs";
import { RiHotelLine } from "react-icons/ri";
import { GrTicket } from "react-icons/gr";
import { LuTrainFrontTunnel } from "react-icons/lu";

import { MdOutlineLocationCity } from "react-icons/md";
import { IoCalendarNumber } from "react-icons/io5";

import './hotelauction.css';

// Import only the final, processed data from your data file
import { allAuctionDeals } from '../../../Data/AuctionData';

const HotelAuction = () => {
    const navigate = useNavigate();
    const [destination, setDestination] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [sortBy, setSortBy] = useState('All');
    const [visibleCount, setVisibleCount] = useState(3);

    // Filter the deals to show only Hotel deals
    const allHotelDeals = allAuctionDeals.filter(deal => deal.category === 'Hotel');
    const [filteredDeals, setFilteredDeals] = useState(allHotelDeals);
    const [deals, setDeals] = useState(allHotelDeals.slice(0, 3));

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
        const filtered = allHotelDeals.filter((deal) => {
            const matchesDestination = destination
                ? deal.location.toLowerCase().includes(destination.toLowerCase())
                : true;

            let matchesDate = true;
            if (checkIn && checkOut) {
                const checkInDateObj = new Date(checkIn);
                const checkOutDateObj = new Date(checkOut);
                const dealCheckInDateObj = new Date(deal.startDate); // Use `startDate` from standardized data
                const dealCheckOutDateObj = new Date(deal.endDate); // Use `endDate` from standardized data

                matchesDate = (dealCheckInDateObj >= checkInDateObj && dealCheckInDateObj <= checkOutDateObj) ||
                              (dealCheckOutDateObj >= checkInDateObj && dealCheckOutDateObj <= checkOutDateObj) ||
                              (checkInDateObj >= dealCheckInDateObj && checkInDateObj <= dealCheckOutDateObj);
            }

            return matchesDestination && matchesDate;
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

    const handleCardClick = (dealId) => {
        navigate(`/hotel-details/${dealId}`);
    };

    return (
        <div className="hotel-auction-app">
            <Navbar />
            <div className="hotel-app-header">
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
            <div className="hotel-searchbar-container">
                <label className="hotel-label">Destination :</label>
                <input
                    type="text"
                    placeholder="Destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="hotel-destination-input"
                />
                <div className="hotel-date-group">
                    <div className="hotel-date-field">
                        <label className="hotel-label">Check-in :</label>
                        <input
                            type="date"
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                            className="hotel-date-input"
                        />
                    </div>
                    <div className="hotel-date-field">
                        <label className="hotel-label">Check-out :</label>
                        <input
                            type="date"
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                            className="hotel-date-input"
                        />
                    </div>
                </div>
                <div className="hotel-search-btn-container">
                    <button className="hotel-search-btn" onClick={handleSearch}>
                        Search
                    </button>
                </div>
            </div>
            <div className="hotel-deals-section">
                <div className="hotel-sort-section">
                    <div className="hotel-sort-header">
                        <h2 className="hotel-sort-title">Best Hotel Deals</h2>
                    </div>
                    <div className="hotel-sort-by">
                        <label htmlFor="hotel-sort">Sort by:</label>
                        <select
                            id="hotel-sort"
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
                <div className="hotel-deals-list">
                    {deals.length > 0 ? (
                        deals.map((deal) => (
                            <div
                                className="hotel-deal-card"
                                key={deal.id}
                                onClick={() => handleCardClick(deal.id)}
                                style={{ cursor: 'pointer' }}
                            >
                                <img src={deal.img} alt={deal.title} className="hotel-deal-img" />
                                <div className="hotel-deal-info">
                                    <div className="hotel-deal-title">{deal.title}</div>
                                    <div className="hotel-deal-location">
                                        <span className="hotel-icon-text"><MdOutlineLocationCity /> : {deal.location}</span>
                                    </div>
                                    <div className="hotel-deal-dates">
                                        <span className="hotel-icon-text"><IoCalendarNumber /> : {deal.startDate} - {deal.endDate}</span>
                                    </div>
                                    <div className="hotel-deal-meta">
                                        <span>{deal.time}</span>
                                        <span>{deal.bids} bids</span>
                                    </div>
                                </div>
                                <div className="hotel-deal-price">{deal.price.toFixed(3)} ETH</div>
                            </div>
                        ))
                    ) : (
                        <div className="no-deals-message">No deals found for your search.</div>
                    )}
                </div>
                {visibleCount < filteredDeals.length && deals.length > 0 && (
                    <button className="hotel-see-more-btn" onClick={handleSeeMore}>
                        See More
                    </button>
                )}
            </div>
        </div>
    );
};

export default HotelAuction;