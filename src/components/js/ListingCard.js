import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../css/ListingCard.css"; // Import the CSS file
import { UserContext } from '../../contexts/UserContext';
import axios from 'axios';

const ListingCard = ({ adListing }) => {
  const { email } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  const navigate = useNavigate();

  const handleSendMessage = async () => {
    try {
      const newMessage = { sender: email, receiver: adListing.username, text: "Opened Chat" };
      const response = await axios.post('/messages', newMessage);
      setMessages([...messages, response.data]);
      setText('');
      navigate("/Chats")
    } catch (error) {
      console.error('Error sending message:', error);
    }
};

  return (
    <div className="listing-card">
      <img className="listing-card-image" src={adListing.pictures[0]} alt={adListing.model} />{" "}
      <h2>{adListing.model}</h2>
      <h3>Price: ${adListing.price}</h3>
      <p>Description: {adListing.description}</p>
      <p>Condition: {adListing.condition}</p>
      <p>Posted by: {adListing.username}</p>
      <button onClick={handleSendMessage}>Send Message</button>
    </div>
  );
};

export default ListingCard;
