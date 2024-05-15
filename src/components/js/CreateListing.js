import React, { useState } from 'react';
import '../css/CreateListing.css'; // Import the CSS file

const CreateListing = () => {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    descrption: '',
    condition: '',
    price: '',
    images: [],
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imagesArray = files.map((file) => URL.createObjectURL(file));
    setFormData({ ...formData, images: [...formData.images, ...imagesArray] });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Send formData to backend or perform necessary actions
    console.log(formData);
    // Reset form after submission
    setFormData({
      brand: '',
      model: '',
      description: '',
      condition: '',
      price: '',
      images: [],
    });
  };

  return (
    <div>
      <h2>Create a Listing</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Brand:</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Model:</label>
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
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
          />
        </div>
        <div>
          <label>Images:</label>
          <input type="file" multiple onChange={handleImageUpload} />
        </div>
        <button type="submit">Create Listing</button>
      </form>
      {/* Display uploaded images */}
      {formData.images.length > 0 && (
        <div>
          <h3>Uploaded Images:</h3>
          <div>
            {formData.images.map((image, index) => (
              <img key={index} src={image} alt={`Uploaded ${index}`} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateListing;
