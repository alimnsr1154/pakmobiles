import React from 'react';
import Navbar from './Navbar';
import CardContainer from './CardContainer';
import Sidebar from './Sidebar'; // Import the Sidebar component
import image from './iphone.jpeg';
import '../css/Dashboard.css'; // Import the CSS file

const Dashboard = () => {
    const cards = [
        { image: image, name: 'Name 1', price: '$100' },
        { image: image, name: 'Name 2', price: '$200' },
        { image: image, name: 'Name 3', price: '$300' },
        { image: image, name: 'Name 4', price: '$400' },
        { image: image, name: 'Name 5', price: '$500' },
        // Add more cards as needed
    ];

    return (
       
        <div className="dashboard">
            <Sidebar /> {/* Use the Sidebar component here */}
            <div className="content">
                <Navbar />
                <CardContainer title="My Cards" cards={cards} />
            </div>
        </div>
    );
};

export default Dashboard;