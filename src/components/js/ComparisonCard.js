import React from "react";
import "../css/ComparisonCard.css"; // Import the CSS file

const PhoneCard = ({ phoneDetails, onRemove }) => {
  const handleRemoveClick = () => {
    onRemove(phoneDetails); // Call the onRemove function passed from parent component
  };

  const generateStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
      "★".repeat(fullStars) + "½".repeat(halfStar) + "☆".repeat(emptyStars)
    );
  };

  return (
    <div className="comparison-card">
      <div class="comparison-card-rm-button-container">
        <button type="reset" class="comparison-card-rm-button" onClick={handleRemoveClick}>
          X
        </button>
      </div>
      <img
        class="comparison-card-image"
        src={phoneDetails.image}
        alt={phoneDetails.name}
      />
      <h2>{phoneDetails.name}</h2>
      <h3>Rating: <div class="comparison-card-stars">{generateStars(phoneDetails.rating)}</div></h3>
      <h3>Price: ${phoneDetails.price}</h3>
      <p>Description: {phoneDetails.description}</p>
      <h3>Build</h3>
      <p>OS: {phoneDetails.specs.build.OS}</p>
      <p>UI: {phoneDetails.specs.build.UI}</p>
      <p>Dimensions: {phoneDetails.specs.build.dimensions}</p>
      <p>Weight: {phoneDetails.specs.build.weight}</p>
      <p>SIM: {phoneDetails.specs.build.SIM}</p>
      <h3>Processor</h3>
      <p>CPU: {phoneDetails.specs.processor.CPU}</p>
      <p>Chipset: {phoneDetails.specs.processor.chipset}</p>
      <p>GPU: {phoneDetails.specs.processor.GPU}</p>
      <h3>Memory</h3>
      <p>Built-In Memory: {phoneDetails.specs.memory.builtIn}</p>
      <p>SD-Card: {phoneDetails.specs.memory.card}</p>
      <h3>Battery</h3>
      <p>Battery Capacity: {phoneDetails.specs.battery.capacity}</p>
    </div>
  );
};

export default PhoneCard;
