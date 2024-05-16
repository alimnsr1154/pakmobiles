import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();

    const handleButtonClick = (path) => {
        navigate(path);
    };

    return (
        <nav>
            <button onClick={() => handleButtonClick('/Dashboard')}>Dashboard</button>
            <button onClick={() => handleButtonClick('/CreateListing')}>Create Listing</button>
            <button onClick={() => handleButtonClick('/PhoneComparison')}>Compare Mobiles</button>
            <button onClick={() => handleButtonClick('/Chats')}>My Chats</button>
            <button style={{ backgroundColor: '#FF7F7F', color: 'white' }} onClick={() => handleButtonClick('/')}>Log Out</button>
        </nav>
    );
};

export default Navbar;
