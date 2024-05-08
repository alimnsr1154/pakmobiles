import React from 'react';
import { Link } from 'react-router-dom'; // Import the Link component
import './Card.css';

const Card = ({ image, name, price, id }) => (
    <Link to={`/phonedetails/${id}`}> {/* Wrap the card in a Link component */}
        <div className="card">
            <img src={image} alt={name} />
            <h2>{name}</h2>
            <p>{price}</p>
        </div>
    </Link>
);

export default Card;