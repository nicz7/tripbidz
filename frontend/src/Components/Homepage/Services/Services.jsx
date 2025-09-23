import React from 'react';
import './services.css';
import maplogo from '../../../Images/maplogo.png'
import planelogo from '../../../Images/planelogo.png'
import ticketlogo from '../../../Images/ticketlogo.png'

const Services = () => {
    return (
        <div className="services-outer">
            <h1 className="services-title">Our Services</h1>
            <div className="services-list">
                <div className="service-card">
                    <div className="service-icon">
                        <img src={maplogo} alt="map" className='picturelogo' />
                    </div>
                    <div className="service-label">Smart<br/>Itinerary Plan</div>
                    <div className="service-desc1">
                        Plan your perfect trip with a smart chatbot that creates personalized, real-time itineraries based on your preferences and live travel data.
                    </div>
                </div>
                <div className="service-card">
                    <div className="service-icon">
                        <img src={planelogo} alt="plane" className='picturelogo' />
                    </div>
                    <div className="service-label">Airstay<br/>Bidding Market</div>
                    <div className="service-desc2">
                        Bid on NFT-based flight, hotel, and tour deals using your Metamask wallet.
                    </div>
                </div>
                <div className="service-card">
                    <div className="service-icon">
                        <img src={ticketlogo} alt="ticket" className='picturelogo' />
                    </div>
                    <div className="service-label">Web3 Reward</div>
                    <div className="service-desc3">
                        Collect tokens to redeem for exclusive bidding discounts.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Services;