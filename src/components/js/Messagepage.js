import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/MessagePage.css';

const MessagePage = () => {
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [user1, setUser1] = useState(null);
  const [user2, setUser2] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const id = 2; // Assuming the user with id=1 is John Doe
  useEffect(() => {
    // Fetch chats on component mount
    const fetchChats = async () => {
      try {
        const response = await axios.get('http://localhost:5000/chats');
        setChats(response.data);
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };
    fetchChats();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      if (user1 && user2) {
        try {
          const response = await axios.get(`/api/messages/${user1}/${user2}`);
          const messages = response.data.map((message) => ({
            messageId: message.messageId,
            chatId: message.chatId,
            text: message.message,
            sender: message.sender_id === user1 ? 'self' : 'other',
          }));
          setMessages(messages);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      }
    };
    fetchMessages();
  }, [user1, user2]);
  const handleChatClick = (chatId) => {
    setSelectedChat(chatId);
  };

  const handleMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() !== '') {
      try {
        const messageData = {
          sender: user1,
          receiver: user2,
          text: newMessage,
          time: new Date()
        };
        await axios.post('http://localhost:3001/api/messages', messageData);
        setNewMessage(''); // Clear the input field
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <div className="message-page">
      <div className="chat-list">
        <div className="chat-list-header">
          <h2>Chats</h2>
        </div>
        <ul className="chat-list-items">
          {chats.map((chat) => (
            <li
              key={chat.chatId}
              className={selectedChat === chat.chatId ? 'selected' : ''}
              onClick={() => handleChatClick(chat.chatId)}
            >
              <img src={`/uploads/${chat.avatarFilename}`} alt={chat.title} className="chat-avatar" />
              <span className="chat-title">{chat.title}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="chat-messages">
        <div className="chat-header">
          <img
            src={selectedChat ? `/uploads/${chats.find((chat) => chat.chatId === selectedChat).avatarFilename}` : ''}
            alt="Chat Avatar"
            className="chat-avatar"
          />
          <h2>{selectedChat ? chats.find((chat) => chat.chatId === selectedChat).title : 'Select a chat'}</h2>
        </div>
        <div className="message-list">
          {messages && (
            <ul>
              {messages.map((message) => (
                <li key={message.messageId} className={message.sender === user1 ? 'sent' : 'received'}>
                  {message.text}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="message-input">
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={handleMessageChange}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default MessagePage;