import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "../css/PhoneDetail.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import AdListingCard from "./ListingCard"; // Import the AdListingCard component

const PhoneDetail = () => {
  const location = useLocation();
  const [phone, setPhone] = useState(null);
  const [rating, setRating] = useState("");
  const [adListings, setAdListings] = useState([]);

  const generateStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
      "★".repeat(fullStars) + "½".repeat(halfStar) + "☆".repeat(emptyStars)
    );
  };

  useEffect(() => {
    if (location.state && location.state.phone) {
      setPhone(location.state.phone);

      // Fetch ad listings based on the phone's model name
      fetchAdListings(location.state.phone.name);
    }
  }, [location]);

  const fetchAdListings = async (modelName) => {
    try {
      const response = await axios.get(`/api/adlistings/${modelName}`);
      setAdListings(response.data);
    } catch (error) {
      console.error("Error fetching ad listings:", error);
    }
  };

  if (!phone) {
    return <div>Loading...</div>;
  }

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleRatingSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `/api/mobiles/${phone.name}`,
        {
          rating: (phone.rating + Number(rating)) / 2,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      } else {
        alert("Rating has been submitted successfully");

        // Fetch the updated phone data
        const updatedPhoneResponse = await axios.get(
          `/api/mobiles/${phone.name}`
        );
        if (updatedPhoneResponse.status !== 200) {
          throw new Error("Failed to fetch updated phone data");
        }

        const updatedPhone = updatedPhoneResponse.data;
        if (updatedPhone && updatedPhone.name) {
          setPhone(updatedPhone);
          window.location.reload();
        } else {
          throw new Error("Invalid data from server");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="phone-detail">
        <h1>Phone Details</h1>
        <div className="phone-detail-row">
          <img src={phone.image} alt={phone.name} />
          <div>
            <h2>{phone.name}</h2>
            <p><div class="phone-detail-stars">{generateStars(phone.rating)}</div></p>
            <p className="phone-detail-price">${phone.price}</p>
            <p>{phone.description}</p>
            <form onSubmit={handleRatingSubmit} className="rating-form">
              <label>
                Rate this phone: &nbsp;&nbsp;
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={rating}
                  onChange={handleRatingChange}
                  required
                />
              </label>
              <button type="submit">Submit rating</button>
            </form>
          </div>
        </div>

        <div className="phone-detail-specs">
          <h2>Detailed Specifications</h2>
          <table>
            <tr>
              <th rowSpan="5">Build</th>
              <th>OS</th>
              <td>{phone.specs.build.OS}</td>
            </tr>
            <tr>
              <th>UI</th>
              <td>{phone.specs.build.UI}</td>
            </tr>
            <tr>
              <th>Dimensions</th>
              <td>{phone.specs.build.dimensions}</td>
            </tr>
            <tr>
              <th>Weight</th>
              <td>{phone.specs.build.weight}</td>
            </tr>
            <tr>
              <th>SIM</th>
              <td>{phone.specs.build.SIM}</td>
            </tr>
            <tr>
              <th rowSpan="3">Processor</th>
              <th>CPU</th>
              <td>{phone.specs.processor.CPU}</td>
            </tr>
            <tr>
              <th>Chipset</th>
              <td>{phone.specs.processor.chipset}</td>
            </tr>
            <tr>
              <th>GPU</th>
              <td>{phone.specs.processor.GPU}</td>
            </tr>
            <tr>
              <th rowSpan="2">Memory</th>
              <th>Built-in</th>
              <td>{phone.specs.memory.builtIn}</td>
            </tr>
            <tr>
              <th>Card</th>
              <td>{phone.specs.memory.card}</td>
            </tr>
            <tr>
              <th>Battery</th>
              <th>Capacity</th>
              <td>{phone.specs.battery.capacity}</td>
            </tr>
          </table>
        </div>
      </div>
      <div>
        <h2>Ad Listings for {phone.name}</h2>
        <div className="listing-card-container">
          {adListings.map((adListing) => (
            <AdListingCard key={adListing.id} adListing={adListing} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhoneDetail;
