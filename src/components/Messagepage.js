import React, { useState } from 'react';
import './MessagePage.css';

const MessagePage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  const chats = [
    //"D:\NUCES Record 2021-2025\Semester 6\Assignments\Web\git project\pakmobiles\src\components\image.JPG"
    { id: 1, title: 'Chat 1', avatar: 'https://via.placeholder.com/50' },
    { id: 2, title: 'Chat 2', avatar: 'https://via.placeholder.com/50' },
    { id: 3, title: 'Chat 3', avatar: 'https://via.placeholder.com/50' },
  ];

  const messages = [
    { id: 1, chatId: 1, text: 'Hello, this is Chat 1', sender: 'other' },
    { id: 2, chatId: 1, text: 'How are you?', sender: 'self' },
    { id: 3, chatId: 2, text: 'Hi, this is Chat 2', sender: 'other' },
    { id: 4, chatId: 2, text: 'Whats up?', sender: 'self' },
    { id: 5, chatId: 3, text: 'Hey, this is Chat 3', sender: 'other' },
    { id: 6, chatId: 3, text: 'Hows it going?', sender: 'self' },
  ];

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
        id: messages.length + 1,
        chatId: selectedChat,
        text: newMessage,
        sender: 'self',
      };
      messages.push(newMessageObj);
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
              key={chat.id}
              className={selectedChat === chat.id ? 'selected' : ''}
              onClick={() => handleChatClick(chat.id)}
            >
              <img src={chat.avatar} alt={chat.title} className="chat-avatar" />
              <span className="chat-title">{chat.title}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="chat-messages">
        <div className="chat-header">
          <img
            src={selectedChat ? chats.find((chat) => chat.id === selectedChat).avatar : ''}
            alt="Chat Avatar"
            className="chat-avatar"
          />
          <h2>{selectedChat ? chats.find((chat) => chat.id === selectedChat).title : 'Select a chat'}</h2>
        </div>
        <div className="message-list">
          {selectedChat && (
            <ul>
              {messages
                .filter((message) => message.chatId === selectedChat)
                .map((message) => (
                  <li key={message.id} className={message.sender === 'self' ? 'sent' : 'received'}>
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