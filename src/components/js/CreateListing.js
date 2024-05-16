import React, { useContext, useState, useEffect } from "react";
import Navbar from "./Navbar";
import { UserContext } from '../../contexts/UserContext';
import "../css/CreateListing.css"; // Import the CSS file

const CreateListing = () => {
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [message, setMessage] = useState("");

  const { email } = useContext(UserContext);

  const [formData, setFormData] = useState({
    username: "", 
    brand: "",
    model: "",
    description: "",
    condition: "",
    price: "",
    images: [],
  });

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

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imagesArray = files.map((file) => URL.createObjectURL(file));
    setFormData({ ...formData, images: [...formData.images, ...imagesArray] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    formData.username = email

    const listingData = {
      ...formData,
      pictures: formData.images, // Ensure pictures is an array of image URLs
    };

    try {
      const response = await fetch("/api/listings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(listingData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Listing created successfully");
        setFormData({
          username: email, // Reset with the current email
          brand: "",
          model: "",
          description: "",
          condition: "",
          price: "",
          images: [],
        });
      } else {
        setMessage(`Failed to create listing: ${result.error}`);
      }
    } catch (error) {
      setMessage(`Failed to create listing: ${error.message}`);
    }
  };

  return (
    <div>
      <Navbar />
      <h2>Create a Listing</h2>
      <form className="create-listing-container" onSubmit={handleSubmit}>
        <div>
          <label>Brand:</label>
          <select
            name="brand"
            value={formData.brand}
            onChange={handleInputChange}
            required
            className="create-listing-select"
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
            className="create-listing-select"
          >
            <option value="">Select a model</option>
            {models.map((model, index) => (
              <option key={index} value={model}>
                {model}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            className="create-listing-input"
          />
        </div>
        <div>
          <label>Condition:</label>
          <input
            type="text"
            name="condition"
            value={formData.condition}
            onChange={handleInputChange}
            required
            className="create-listing-input"
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
            className="create-listing-input"
          />
        </div>
        <div>
          <label>Images:</label>
          <input className="create-listing-add-file" type="file" multiple onChange={handleImageUpload} />
        </div>
        <button className="create-listing-button" type="submit">Create Listing</button>
      </form>
      {message && <p>{message}</p>}
      {formData.images.length > 0 && (
        <div>
          <h3>Uploaded Images:</h3>
          <div>
            {formData.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Uploaded ${index}`}
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateListing;
