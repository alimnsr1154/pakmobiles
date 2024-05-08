import React from 'react';
import Card from './Card';
import './CardContainer.css'; // Import the CSS file

const CardContainer = ({ title, cards }) => (
  <div>
    <h1>{title}</h1>
    <div className="card-container"> {/* Add the CSS class here */}
      {cards.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </div>
  </div>
);

export default CardContainer;