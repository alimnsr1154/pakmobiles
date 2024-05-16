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
            <button onClick={() => handleButtonClick('/')}>Dashboard</button>
            <button onClick={() => handleButtonClick('/CreateListing')}>Create Listing</button>
            <button onClick={() => handleButtonClick('/PhoneComparison')}>Compare Mobiles</button>
            <button>Button 4</button>
            <button>Button 5</button>
        </nav>
    );
};

export default Navbar;
