import React from 'react';
import './about.css';

const About = () => {
    return(
        <div className="about-container">
                <h1 className="about-title">
                    About Trip
                    <span className="about-brand-accent">Bidz</span>
                </h1>
                <div className="about-content">
                    <section className="about-section">
                        <h2 className="about-section-title">What is TripBidz?</h2>
                            <p className="about-section-text">
                                TripBidz was born to simplify and revolutionize travel by combining AI-driven planning, blockchain-powered bidding, and a decentralized travel passport. We help travelers effortlessly craft personalized, real-time itineraries, secure unbeatable deals through NFT auctions, and earn rewards with every auction—all in one seamless platform.
                            </p>
                    </section>
                    <section className="about-section">
                        <h2 className="about-section-title">Our Goal</h2>
                        <p className="about-section-text">
                            We aim to democratize travel by making every journey seamless, engaging, and enriching—granting explorers full transparency, unparalleled choice, and a community-driven experience that transforms logistics into adventure.
                        </p>
                    </section>
                </div>
        </div>
    )
}

export default About