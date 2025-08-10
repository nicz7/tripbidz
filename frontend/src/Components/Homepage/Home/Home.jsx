import React from 'react';
import './home.css';
import homeimages from '../../../Images/homeimage.jpg'

const Home = () => {
    return (
        <section className='home'>
            <div className='overlay'></div>
            <img src={homeimages} alt="Home" className='home-image' />

            <div className="home-content">
                <div className="headline">
                    <h1>
                        Unlock journeys<br />
                        beyond your dreams
                    </h1>
                </div>
                <div className="subtext">
                    <div className="vertical-line"></div>
                    <div>
                        <p>
                            Plan smarter, bid better, and travel<br />
                            your way — all in one place.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home;