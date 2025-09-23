import hotel1 from '../Images/grandhilal.jpg';
import hotel2 from '../Images/hotel-du-louvre.jpg';
import hotel3 from '../Images/hotelindonesia.webp';
import hotel4 from '../Images/ShinjukuGrandHotel.jpg';
import hotel5 from '../Images/SiamPalaceHotel.jpg';
import airline1 from '../Images/emirates.jpg';
import airline2 from '../Images/singapore-airlines.jpg';
import airline3 from '../Images/cathay-pacific.jpg';
import airline4 from '../Images/eva-air.jpg';
import airline5 from '../Images/china-airlines.jpg';
import ticket1 from '../Images/disneyland.jpg';
import ticket2 from '../Images/taipei101.jpg';
import ticket3 from '../Images/tokyolab.jpg';
import img1 from '../Images/buslogo.jpg';
import img2 from '../Images/ferry.jpg';
import img3 from '../Images/mrttokyo.jpg';
import img4 from '../Images/hsr.jpg';

const allFlightDeals = [
    { id: 1, img: airline1, title: "Aloha Airlines", time: "06:00 Taipei → 09:00 Tokyo", bids: "12", price: 0.45, departureDate: "2025-08-01", duration: "3h 0m" },
    { id: 2, img: airline2, title: "Bravo Air", time: "07:10 Taipei → 10:50 Seoul", bids: "33", price: 0.3, departureDate: "2025-08-01", duration: "2h 40m" },
    { id: 3, img: airline3, title: "Charlie Jet", time: "09:15 Taipei → 13:45 Hong Kong", bids: "17", price: 0.6, departureDate: "2025-08-02", duration: "1h 30m" },
    { id: 4, img: airline4, title: "Delta Sky", time: "11:00 Taipei → 14:00 Shanghai", bids: "40", price: 0.75, departureDate: "2025-08-02", duration: "2h 0m" },
    { id: 5, img: airline5, title: "Echo Express", time: "12:30 Taipei → 16:00 Singapore", bids: "8", price: 0.5, departureDate: "2025-08-03", duration: "3h 30m" },
    { id: 6, img: airline1, title: "Falcon Airways", time: "14:20 Taipei → 17:10 Kuala Lumpur", bids: "25", price: 0.35, departureDate: "2025-08-03", duration: "4h 50m" },
    { id: 7, img: airline2, title: "Gamma Fly", time: "15:45 Taipei → 18:20 Bangkok", bids: "14", price: 0.55, departureDate: "2025-08-04", duration: "3h 35m" },
    { id: 8, img: airline3, title: "Hawk Airlines", time: "17:00 Taipei → 20:30 Tokyo", bids: "29", price: 0.4, departureDate: "2025-08-04", duration: "3h 30m" },
    { id: 9, img: airline4, title: "Indigo Air", time: "18:10 Taipei → 21:40 Beijing", bids: "20", price: 0.6, departureDate: "2025-08-05", duration: "3h 30m" },
    { id: 10, img: airline5, title: "Jetstream", time: "19:00 Taipei → 22:00 Hong Kong", bids: "10", price: 0.38, departureDate: "2025-08-05", duration: "1h 45m" },
    { id: 11, img: airline1, title: "Kappa Wings", time: "20:15 Taipei → 23:45 Osaka", bids: "19", price: 0.65, departureDate: "2025-08-06", duration: "2h 30m" },
    { id: 12, img: airline2, title: "Lunar Air", time: "21:30 Taipei → 01:00 Seoul", bids: "15", price: 0.55, departureDate: "2025-08-06", duration: "2h 30m" },
    { id: 13, img: airline3, title: "Meteor Jet", time: "22:45 Taipei → 02:30 Shanghai", bids: "36", price: 0.42, departureDate: "2025-08-07", duration: "2h 45m" },
    { id: 14, img: airline4, title: "Nova Airways", time: "23:50 Taipei → 03:10 Tokyo", bids: "11", price: 0.47, departureDate: "2025-08-07", duration: "3h 20m" },
];

const allHotelDeals = [
    { id: 15, img: hotel1, title: "Grand Hilai Taipei - Deluxe Suite", location: "Taipei", bids: "32", price: 0.8 },
    { id: 16, img: hotel2, title: "Caesar Hotel Premium", location: "Kaohsiung", bids: "25", price: 0.5 },
    { id: 17, img: hotel3, title: "W Hotel Executive Room", location: "Taipei", bids: "55", price: 1.2 },
    { id: 18, img: hotel4, title: "Mandarin Oriental Suite", location: "Taipei", bids: "18", price: 1.5 },
    { id: 19, img: hotel5, title: "The Okura Prestige Room", location: "Taichung", bids: "40", price: 0.9 },
    { id: 20, img: hotel1, title: "Hotel Resonance Taipei", location: "Taipei", bids: "21", price: 0.75 },
    { id: 21, img: hotel2, title: "Humble House Taipei", location: "Taipei", bids: "14", price: 1.1 },
    { id: 22, img: hotel3, title: "Sheraton Grand Taipei", location: "Taipei", bids: "48", price: 0.95 },
    { id: 23, img: hotel4, title: "Palais de Chine Hotel", location: "Taipei", bids: "30", price: 1.3 },
    { id: 24, img: hotel5, title: "Hotel Proverbs Taipei", location: "Taipei", bids: "19", price: 1.05 },
    { id: 25, img: hotel1, title: "The Westin Taipei", location: "Taipei", bids: "28", price: 0.88 },
    { id: 26, img: hotel2, title: "CitizenM Hotel Taipei", location: "Taipei", bids: "37", price: 0.65 },
    { id: 27, img: hotel3, title: "Kimpton Da An Hotel", location: "Taipei", bids: "22", price: 1.15 },
    { id: 28, img: hotel4, title: "Hotel Royal Nikko Taipei", location: "Taipei", bids: "16", price: 0.72 },
];

const allTicketDeals = [
    { id: 29, img: ticket1, title: "Tokyo Disneyland & Tokyo DisneySea Park Tickets", location: "Tokyo", bids: "45", price: 0.08 },
    { id: 30, img: ticket2, title: "Taipei 101 Observatory", location: "Taipei", bids: "60", price: 0.03 },
    { id: 31, img: ticket3, title: "Tokyo teamLab Planets Ticket", location: "Tokyo", bids: "30", price: 0.06 },
    { id: 32, img: ticket1, title: "Universal Studios Japan Pass", location: "Osaka", bids: "52", price: 0.1 },
    { id: 33, img: ticket2, title: "Sun Moon Lake Boat Cruise", location: "Nantou", bids: "27", price: 0.04 },
    { id: 34, img: ticket3, title: "Singapore Night Safari Entry", location: "Singapore", bids: "38", price: 0.07 },
    { id: 35, img: ticket1, title: "Gardens by the Bay Tickets", location: "Singapore", bids: "29", price: 0.05 },
    { id: 36, img: ticket2, title: "Bangkok Floating Market Tour", location: "Bangkok", bids: "15", price: 0.09 },
    { id: 37, img: ticket3, title: "Mount Fuji Day Trip", location: "Yamanashi", bids: "22", price: 0.12 },
    { id: 38, img: ticket1, title: "Ghibli Museum Admission", location: "Mitaka", bids: "41", price: 0.15 },
    { id: 39, img: ticket2, title: "Seoul N Tower Observatory", location: "Seoul", bids: "24", price: 0.05 },
    { id: 40, img: ticket3, title: "Busan Aquarium Entry", location: "Busan", bids: "18", price: 0.04 },
    { id: 41, img: ticket1, title: "Hong Kong Peak Tram", location: "Hong Kong", bids: "33", price: 0.03 },
    { id: 42, img: ticket2, title: "Macau Tower Bungee Jump", location: "Macau", bids: "11", price: 0.25 },
];

const allTransportationDeals = [
    { id: 43, img: img1, title: "Bus (Taipei - Taichung)", location: "Taipei - Taichung", bids: "28", price: 0.0027, type: "Bus" },
    { id: 44, img: img2, title: "Taitung to Lanyu Ferry Ticket", location: "Taitung - Lanyu", bids: "8", price: 0.025, type: "Ferry" },
    { id: 45, img: img4, title: "Taipei – ZuoYing HSR Ticket", location: "Taipei - ZuoYing", bids: "58", price: 0.012, type: "HSR" },
    { id: 46, img: img3, title: "Train (Hualien - Taipei)", location: "Hualien - Taipei", bids: "34", price: 0.003, type: "Train" },
    { id: 47, img: img1, title: "Kaohsiung MRT Day Pass", location: "Kaohsiung", bids: "12", price: 0.004, type: "Subway" },
    { id: 48, img: img2, title: "Pingtung - Kenting Shuttle", location: "Pingtung - Kenting", bids: "19", price: 0.002, type: "Bus" },
    { id: 49, img: img4, title: "Alishan Forest Railway", location: "Chiayi - Alishan", bids: "22", price: 0.005, type: "Train" },
    { id: 50, img: img3, title: "Sun Moon Lake Cruise Pass", location: "Nantou", bids: "9", price: 0.01, type: "Cruise" },
    { id: 51, img: img1, title: "Taipei Metro Unlimited 3-Day Pass", location: "Taipei", bids: "16", price: 0.006, type: "Subway" },
    { id: 52, img: img2, title: "Rental Scooter in Hualien", location: "Hualien", bids: "14", price: 0.007, type: "Rental" },
    { id: 53, img: img4, title: "Keelung to Matsu Ferry", location: "Keelung - Matsu", bids: "6", price: 0.03, type: "Ferry" },
    { id: 54, img: img3, title: "Tainan – Chiayi Shuttle Bus", location: "Tainan - Chiayi", bids: "20", price: 0.0023, type: "Bus" },
];

// Rewards/Discounts Data
const allDiscounts = [
    {
        id: 1,
        image: airline1,
        title: '0.0065 ETH off Airlines Discount Bidding',
        description: 'AI-suggested deal for any trip',
        expires: 'Expires in 5 days',
        points: 1000,
        category: 'Flight Discounts',
        discountValue: 0.0065
    },
    {
        id: 2,
        image: hotel1,
        title: '0.0130 ETH Hotel Discount Bidding',
        description: 'Best deal for your hotel price',
        expires: 'Expires in 10 days',
        points: 1750,
        category: 'Hotel Vouchers',
        discountValue: 0.0130
    },
    {
        id: 3,
        image: airline2,
        title: '0.0135 ETH off Airlines Discount Bidding',
        description: 'AI-suggested deal for any trip',
        expires: 'Expires in 15 days',
        points: 2000,
        category: 'Flight Discounts',
        discountValue: 0.0135
    },
    {
        id: 4,
        image: hotel2,
        title: '0.02 ETH Hotel Discount Bidding',
        description: 'Best deal for your hotel price',
        expires: 'Expires in 31 days',
        points: 2500,
        category: 'Hotel Vouchers',
        discountValue: 0.02
    },
    {
        id: 5,
        image: ticket1,
        title: '0.005 ETH off Ticket Discount Bidding',
        description: 'Great savings on attraction tickets',
        expires: 'Expires in 20 days',
        points: 800,
        category: 'Ticket Discounts',
        discountValue: 0.005
    },
    {
        id: 6,
        image: ticket2,
        title: '0.008 ETH off Tour Discount Bidding',
        description: 'Explore more with discount tours',
        expires: 'Expires in 12 days',
        points: 1200,
        category: 'Ticket Discounts',
        discountValue: 0.008
    },
    {
        id: 7,
        image: img1,
        title: '0.003 ETH Transportation Discount',
        description: 'Save on local transport',
        expires: 'Expires in 7 days',
        points: 600,
        category: 'Transportation Discounts',
        discountValue: 0.003
    },
    {
        id: 8,
        image: img4,
        title: '0.01 ETH HSR Discount Bidding',
        description: 'High-speed rail savings',
        expires: 'Expires in 25 days',
        points: 1500,
        category: 'Transportation Discounts',
        discountValue: 0.01
    },
    {
        id: 9,
        image: airline3,
        title: '0.025 ETH Premium Flight Discount',
        description: 'Business class savings',
        expires: 'Expires in 18 days',
        points: 3000,
        category: 'Flight Discounts',
        discountValue: 0.025
    },
    {
        id: 10,
        image: hotel3,
        title: '0.035 ETH Luxury Hotel Discount',
        description: '5-star hotel special offer',
        expires: 'Expires in 14 days',
        points: 4000,
        category: 'Hotel Vouchers',
        discountValue: 0.035
    }
];

const generateRandomTime = () => {
    const d = Math.floor(Math.random() * 7) + 1;
    const h = Math.floor(Math.random() * 24);
    const m = Math.floor(Math.random() * 60);
    return `${d} d ${h} h ${m} m`;
};

const generateRandomDates = () => {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() + Math.floor(Math.random() * 30) + 1);

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + Math.floor(Math.random() * 7) + 1);

    const formatDate = (date) => {
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        const yyyy = date.getFullYear();
        return `${mm}/${dd}/${yyyy}`;
    };

    return {
        startDate: formatDate(startDate),
        endDate: formatDate(endDate)
    };
};

const generateAuctionDeals = () => {
    const standardizedHotelDeals = allHotelDeals.map(deal => ({
        ...deal,
        category: "Hotel",
        time: generateRandomTime(),
        ...generateRandomDates(),
    }));

    // Updated flight deals - preserve original time and duration data
    const standardizedFlightDeals = allFlightDeals.map(deal => ({
        ...deal,
        category: "Flights",
        // Ensure time and duration are preserved from original data
        time: deal.time || "TBD → TBD", // Fallback if time is missing
        duration: deal.duration || "TBD", // Fallback if duration is missing
        startDate: deal.departureDate,
        endDate: generateRandomDates().endDate,
        location: deal.time ? (deal.time.split('→')[0]?.split(' ')[1]?.trim() || 'Unknown') : 'Unknown',
        bids: typeof deal.bids === 'string' ? deal.bids.replace(' bids', '') : deal.bids.toString(),
    }));

    const standardizedTicketDeals = allTicketDeals.map(deal => ({
        ...deal,
        category: "Tour",
        time: generateRandomTime(),
        ...generateRandomDates(),
    }));

    const standardizedTransportationDeals = allTransportationDeals.map(deal => ({
        ...deal,
        category: "Transportation",
        time: generateRandomTime(),
        ...generateRandomDates(),
    }));

    const combinedDeals = [
        ...standardizedHotelDeals,
        ...standardizedFlightDeals,
        ...standardizedTicketDeals,
        ...standardizedTransportationDeals
    ];

    const dealsWithUniqueIds = combinedDeals.map((deal, index) => ({
        ...deal,
        id: index + 1
    }));
    
    return dealsWithUniqueIds.sort(() => Math.random() - 0.5);
};

export const allAuctionDeals = generateAuctionDeals();
export const rewardsDiscounts = allDiscounts;