import React from 'react';
import './biddinghistory.css';
import hotel1 from '../../../Images/grandhilal.jpg';


const bids = [
  {
    id: 1,
    image: '../../Images/grandhilal.jpg',
    name: 'Shinjuku Grand Hotel',
    rating: '4.5 ★',
    description: 'Breakfast Included',
    location: 'Tokyo, Japan',
    dateFrom: '2025/06/17',
    dateTo: '2025/06/24',
    bid: '0.079 ETH',
    status: 'Success',
  },
  {
    id: 2,
    image: '/images/hotel2.jpg',
    name: 'Hôtel du Louvre',
    rating: '4.5 ★',
    description: 'Near Eiffel Tower',
    location: 'Paris, France',
    dateFrom: '2025/07/17',
    dateTo: '2025/07/26',
    bid: '0.11 ETH',
    status: 'Success',
  },
  {
    id: 3,
    image: '/images/hotel3.jpg',
    name: 'Siam Palace Hotel',
    rating: '4.5 ★',
    description: 'Free Airport Pickup',
    location: 'Bangkok, Thailand',
    dateFrom: '2025/09/11',
    dateTo: '2025/09/14',
    bid: '0.054 ETH',
    status: 'Success',
  },
  {
    id: 4,
    image: '/images/hotel4.jpg',
    name: 'Hotel Indonesia Kempinski Jakarta',
    rating: '4.5 ★',
    description: 'Rooftop',
    location: 'Jakarta, Indonesia',
    dateFrom: '2025/12/17',
    dateTo: '2025/12/20',
    bid: '0.057 ETH',
    status: 'Fail',
  },
  {
    id: 5,
    image: '/images/hotel5.jpg',
    name: 'Grand Hilai Taipei',
    rating: '4.5 ★',
    description: 'Deluxe Suite',
    location: 'Taipei, Taiwan',
    dateFrom: '2026/01/15',
    dateTo: '2026/01/22',
    bid: '0.11 ETH',
    status: 'Pending',
  },
];

const BiddingHistory = () => {
  return (
    <div className="content">
        <div className="bidding-history-container">
          <h1>My Bidding History</h1>
          <p>Track the status of your travel bids and manage your offers.</p>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Hotel Info</th>
                  <th>Travel Date</th>
                  <th>Bid Amount</th>
                  <th colSpan={2}>Status</th>
                </tr>
              </thead>
              <tbody>
                {bids.map((bid) => (
                  <tr key={bid.id}>
                    <td className="hotel-info">
                      <img src={bid.image} alt={bid.name} />
                      <div>
                        <strong>{bid.name}</strong>
                        <p>
                          <span className="star">{bid.rating}</span> • {bid.description}
                        </p>
                        <p className="location">{bid.location}</p>
                      </div>
                    </td>
                    <td>
                      {bid.dateFrom} <br /> ~ {bid.dateTo}
                    </td>
                    <td>{bid.bid}</td>
                    <td>
                      <span className={`status ${bid.status.toLowerCase()}`}>
                        {bid.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    </div>
    
  );
};

export default BiddingHistory;
