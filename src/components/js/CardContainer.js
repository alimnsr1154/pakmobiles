import React from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import '../css/CardContainer.css';

const CardContainer = ({ title, cards }) => (
  <div>
    <h1>{title}</h1>
    <div className="card-container">
      {cards.map((card, index) => {
        // Log the card data
        console.log(card);
        return (
          <Link
            to={`/PhoneDetail`}
            state={{ phone: card }}
            key={index}
          >
            <Card {...card} />
          </Link>
        );
      })}
    </div>
  </div>
);

export default CardContainer;
