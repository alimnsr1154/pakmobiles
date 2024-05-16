import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import CardContainer from './CardContainer';
import Sidebar from './Sidebar';
import '../css/Dashboard.css';
import axios from 'axios'; // Import axios to make HTTP requests

const Dashboard = () => {
    const [cards, setCards] = useState([]); // Initialize state for cards
    const [selectedBrand, setSelectedBrand] = useState(null); // Initialize state for selected brand
    const [selectedPriceRange, setSelectedPriceRange] = useState([0, Infinity]); // Initialize state for selected price range

    useEffect(() => {
        // Define async function to fetch data
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/mobiles');
                setCards(response.data);
                // Print the data to the console
                console.log(response.data);

            } catch (err) {
                console.error("Error fetching data from server:", err);
            }
        };

        // Call the function to fetch data
        fetchData();
    }, []); // Empty dependency array means this effect runs once on mount

    // Filter cards based on selected brand and price range
    const filteredCards = cards.filter(card =>
        (!selectedBrand || card.brand === selectedBrand) &&
        card.price >= selectedPriceRange[0] && card.price <= selectedPriceRange[1]
    );

    return (
        <div className="dashboard">
            <Sidebar setSelectedBrand={setSelectedBrand} setSelectedPriceRange={setSelectedPriceRange} />
            <div className="content">
                <Navbar />
                <CardContainer title="My Cards" cards={filteredCards} />
            </div>
        </div>
    );
};

export default Dashboard;