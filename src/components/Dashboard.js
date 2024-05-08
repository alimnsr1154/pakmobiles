import React from 'react';
import Navbar from './Navbar';
import CardContainer from './CardContainer';
import image from './iphone.jpeg'; // Import the image

const Dashboard = () => {
    const cards = [
        { image: image, name: 'Name 1', price: '$100' },
        // Add more cards as needed
    ];

    return (
        <div>
            <Navbar />
            <CardContainer title="My Cards" cards={cards} />
        </div>
    );
};

export default Dashboard;