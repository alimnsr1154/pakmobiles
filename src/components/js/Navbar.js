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
            <button className="navbar-button" onClick={() => handleButtonClick('/Dashboard')}>Dashboard</button>
            <button className="navbar-button" onClick={() => handleButtonClick('/CreateListing')}>Create Listing</button>
            <button className="navbar-button" onClick={() => handleButtonClick('/PhoneComparison')}>Compare Mobiles</button>
            <button className="navbar-button" onClick={() => handleButtonClick('/Chats')}>My Chats</button>
            <button className="logout-button" onClick={() => handleButtonClick('/')}>Log Out</button>
        </nav>
    );
};

export default Navbar;
