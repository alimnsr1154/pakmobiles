import React from 'react';
import Card from './Card';

const CardContainer = ({ title, cards }) => (
    <div className="card-container">
        <h1>{title}</h1>
        <hr />
        {cards.map((card, index) => <Card key={index} {...card} />)}
    </div>
);

export default CardContainer;