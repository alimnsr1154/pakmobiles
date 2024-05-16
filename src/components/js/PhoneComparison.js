import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import PhoneCard from "./ComparisonCard"; // Import PhoneCard component
import "../css/PhoneComparison.css"; // Import the CSS file

const PhoneComparison = () => {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
  });

  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [message, setMessage] = useState("");
  const [phoneDetailsList, setPhoneDetailsList] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch("/api/brands");
        const data = await response.json();
        setBrands(data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchBrands();
  }, []);

  const fetchModels = async (brand) => {
    try {
      const response = await fetch(`/api/models/${brand}`);
      const data = await response.json();
      setModels(data);
    } catch (error) {
      console.error("Error fetching models:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "brand") {
      fetchModels(value);
    }
  };

  // Function to handle Add Phone button click
  const handleAddPhone = async (e) => {
    e.preventDefault();
    if (formData.model) {
      try {
        const response = await fetch(`/api/model/${formData.model}`);
        const data = await response.json();
        setPhoneDetailsList((prevList) => [...prevList, data]); // Add new phone details to the list
        setFormData({ brand: "", model: "" }); // Clear form data
      } catch (error) {
        console.error("Error fetching phone details:", error);
      }
    }
  };

  // Function to handle remove button click
  const handleRemovePhone = (phoneToRemove) => {
    const updatedList = phoneDetailsList.filter(
      (phone) => phone !== phoneToRemove
    );
    setPhoneDetailsList(updatedList);
  };

  return (
    <div>
      <Navbar />
      <h2>Compare Phones</h2>
      <form className="phone-comparison-container">
        <div>
          <label>Brand:</label>
          <select
            name="brand"
            value={formData.brand}
            onChange={handleInputChange}
            required
            className="phone-comparison-select"
          >
            <option value="">Select a brand</option>
            {brands.map((brand, index) => (
              <option key={index} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Model:</label>
          <select
            name="model"
            value={formData.model}
            onChange={handleInputChange}
            required
            disabled={!formData.brand}
            className="phone-comparison-select"
          >
            <option value="">Select a model</option>
            {models.map((model, index) => (
              <option key={index} value={model}>
                {model}
              </option>
            ))}
          </select>
        </div>
        <button class="phone-comparison-add-btn" type="submit" onClick={handleAddPhone}>
          Add Phone
        </button>
        <div class="comparison-card-container">
          {phoneDetailsList.map((phoneDetails, index) => (
            <PhoneCard
              key={index}
              phoneDetails={phoneDetails}
              onRemove={handleRemovePhone}
            />
          ))}
        </div>
      </form>
    </div>
  );
};

export default PhoneComparison;
