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

import { UserProvider } from './Components/Homepage/UserContext/Usercontext';

function App() {
    return (
         <UserProvider>
            <Router>
                <Routes>
                    <Route path='/' element={<Main />} />
                    <Route path='/login' element ={<Login />} />
                    <Route path='/signup' element ={<SignUp />} />
                    <Route path="/itinerary" element={<Itinerary />} />
                    <Route path="/auction" element={<Auction />} />
                    <Route path="/reward" element={<Reward />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </Router>
         </UserProvider>
    );
}

export default App;