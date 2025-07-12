import React from 'react';
import About from '../Components/Homepage/About/About'
import Member from '../Components/Homepage/Member/Member'
import Navbar from '../Components/Homepage/Navbar/Navbar';
import Footer from '../Components/Homepage/Footer/Footer';
import Services from '../Components/Homepage/Services/Services';
import Home from '../Components/Homepage/Home/Home';

const Main = ()=> {
    return (
        <>
            <Navbar />
            <Home />
            <About />
            <Services />
            <Member />
            <Footer />
            
        </>
    )
}

export default Main;