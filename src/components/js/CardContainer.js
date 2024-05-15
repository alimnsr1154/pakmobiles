import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Card from './Card';
import '../css/CardContainer.css';

const CardContainer = ({ title, cards }) => (
  <div>
    <h1>{title}</h1>
    <div className="card-container">
      {cards.map((card, index) => (
        <Link to="/phoneDetail" key={index}> {/* Wrap Card with Link */}
          <Card {...card} />
        </Link>
      ))}
    </div>
  </div>
);

export default CardContainer;