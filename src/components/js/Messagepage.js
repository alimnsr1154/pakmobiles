import React, { useContext, useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";
import "../css/MessagePage.css";

const MessagePage = () => {
  const { email } = useContext(UserContext); // Get the current user's email
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    if (selectedContact) {
      fetchMessages();
    }
  }, [selectedContact]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/messages/${email}`
      );
      setMessages(response.data);
      const uniqueContacts = [
        ...new Set(
          response.data.map((msg) =>
            msg.sender === email ? msg.receiver : msg.sender
          )
        ),
      ];
      setContacts(uniqueContacts);
      if (uniqueContacts.length > 0 && !selectedContact) {
        setSelectedContact(uniqueContacts[0]);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = async () => {
    if (!selectedContact) return;

    try {
      const newMessage = { sender: email, receiver: selectedContact, text };
      const response = await axios.post(
        "http://localhost:3001/messages",
        newMessage
      );
      setMessages([...messages, response.data]);
      setText("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div>
      <Navbar />
      <div className="message-page">
        <div className="message-page-sidebar">
          <h2>Contacts</h2>
          <ul>
            {contacts.map((contact) => (
              <li
                key={contact}
                className={contact === selectedContact ? "selected" : ""}
                onClick={() => setSelectedContact(contact)}
              >
                {contact}
              </li>
            ))}
          </ul>
        </div>
        <div className="chat-container">
          <h1>Chat with {selectedContact}</h1>
          <div className="chat-box">
            {messages
              .filter(
                (msg) =>
                  (msg.sender === email && msg.receiver === selectedContact) ||
                  (msg.receiver === email && msg.sender === selectedContact)
              )
              .map((msg) => (
                <div
                key={msg._id}
                className={`message ${msg.sender === email ? 'sent' : 'received'}`}
              >
                <strong>{msg.sender === email ? 'You' : msg.sender}</strong>: {msg.text}{' '}
                <em>{new Date(msg.time).toLocaleTimeString()}</em>
              </div>
              ))}
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="Message"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyPress={handleKeyPress} // Add this line
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagePage;
