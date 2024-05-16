import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/MessagePage.css';

const MessagePage = () => {
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
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
    // Fetch messages for the selected chat
    // const fetchMessages = async () => {
    //   if (selectedChat) {
    //     try {
    //       const response = await axios.get(`http://localhost:5000/messages/${selectedChat}`);
    //       setMessages(response.data);
    //     } catch (error) {
    //       console.error('Error fetching messages:', error);
    //     }
    //   }
    // };
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/messages/${id}`);
        const messages = response.data.map((message) => ({
          messageId: message.messageId,
          chatId: message.chatId,
          text: message.message,
          sender: message.sender_id === id ? 'self' : 'other',
        }));
        setMessages(messages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchMessages();
  }, [selectedChat]);

  const handleChatClick = (chatId) => {
    setSelectedChat(chatId);
  };

  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      // Add new message to the messages array
      const newMessageObj = {
        messageId: messages.length + 1,
        chatId: selectedChat,
        text: newMessage,
        sender: 'self',
      };
      setMessages([...messages, newMessageObj]);
      setNewMessage('');
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
          {selectedChat && (
            <ul>
              {messages.map((message) => (
                <li key={message.messageId} className={message.sender === 'self' ? 'sent' : 'received'}>
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