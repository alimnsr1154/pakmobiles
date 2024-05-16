import React from 'react';
import '../css/Card.css';

const Card = ({ image, name, price, id }) => (
        <div className="card">
        <img src={`/${image}`} alt={name} />
            <h2>{name}</h2>
            <p>${price}</p>
        </div>
);

export default Card;