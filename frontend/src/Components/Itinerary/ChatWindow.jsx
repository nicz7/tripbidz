import React, { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import './chatwindow.css';
import { IoIosSend } from "react-icons/io";

function ChatWindow() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Awesome! Which city are you thinking of exploring on your next adventure?' },
    { sender: 'user', text: 'Japan on 2025/01/10–2025/01/17' },
    { sender: 'user', text: 'Tokyo, Osaka' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: 'user', text: input }]);
    setInput('');
  };

  // Add this function to handle Enter key
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-wrapper">
      <div className="chat-box">
        <div className="chat-logo-watermark">Trip<span>Bidz</span></div>
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <MessageBubble key={index} sender={msg.sender} text={msg.text} />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Send a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown} // <-- Add this line
          />
          <button onClick={handleSend}><IoIosSend className='send-logo'/></button>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;