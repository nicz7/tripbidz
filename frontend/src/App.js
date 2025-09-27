import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './app.css';
import Main from './Pages/Mainpage';
import Login from './Pages/Loginpage';
import SignUp from './Pages/Signuppage';
import Itinerary from './Pages/Itinerarypage';
import Auction from './Pages/Auctionpage';
import Reward from './Pages/Rewardpage';
import Profile from './Pages/Profilepage';
import FlightAuction from './Components/Auction/FlightAuction/FlightAuction';
import FlightDetails from './Components/Auction/FlightAuction/FlightDetails/FlightDetails';
import HotelAuction from './Components/Auction/HotelAuction/HotelAuction';
import HotelDetails from './Components/Auction/HotelAuction/HotelDetails/HotelDetails';
import TicketAuction from './Components/Auction/TicketAuction/TicketAuction';
import TicketDetails from './Components/Auction/TicketAuction/TicketDetails/TicketDetails';
import TransportationAuction from './Components/Auction/Transportation/TransportationAuction';
import TransportationDetails from './Components/Auction/Transportation/TransportationDetails/TransportationDetails';
import TravelAdminpage from './Pages/admin/TravelAdminpage';
import AdminLogin from './Components/Admin/AdminLogin/AdminLogin';
import AdminSignup from './Components/Admin/AdminSignup/AdminSignup';
import RoleSelection from './Pages/RoleSelection';

import { UserProvider } from './Components/Homepage/UserContext/Usercontext';

function App() {
    return (
         <UserProvider>
            <Router>
                <Routes>
                    <Route path='/' element={<Main />} />
                    <Route path='/role-selection' element={<RoleSelection />} />
                    <Route path='/login' element ={<Login />} />
                    <Route path='/signup' element ={<SignUp />} />
                    <Route path="/itinerary" element={<Itinerary />} />
                    <Route path="/auction" element={<Auction />} />
                    <Route path="/auction/flight" element={<FlightAuction />} />
                    <Route path="/flight-details/:id" element={<FlightDetails />} />
                    <Route path="/auction/hotel" element={<HotelAuction />} />
                    <Route path="/hotel-details/:id" element={<HotelDetails />} />
                    <Route path="/auction/tickets" element={<TicketAuction />} />  
                    <Route path="/ticket-details/:id" element={<TicketDetails />} />
                    <Route path="/auction/transportation" element={<TransportationAuction />} />
                    <Route path="/transportation-details/:id" element={<TransportationDetails />} />
                    <Route path="/reward" element={<Reward />} />
                    <Route path="/profile" element={<Profile />} />

                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin/signup" element={<AdminSignup />} />
                    <Route path="/admin/dashboard" element={<TravelAdminpage />} />
                </Routes>
            </Router>
         </UserProvider>
    );
}

export default App;
