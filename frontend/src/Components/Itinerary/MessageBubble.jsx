import React from 'react';
import './messagebubble.css';

function MessageBubble({ sender, text }) {
  const isBot = sender === 'bot';

  // Get initials: 'TB' for 'TripBot', or fallback
  const getInitials = () => {
    if (isBot) return 'TB';
    return 'JG'; // You can dynamically generate this based on user name if needed
  };

  return (
    <div className={`chat-row ${isBot ? 'chat-bot' : 'chat-user'}`}>
      {isBot && (
        <div className="chat-avatar chat-avatar-bot">
          {getInitials()}
        </div>
      )}

      <div className={`chat-bubble ${isBot ? 'chat-bubble-bot' : 'chat-bubble-user'}`}>
        <span className="chat-text">{text}</span>
      </div>

      {!isBot && (
        <div className="chat-avatar chat-avatar-user">
          {getInitials()}
        </div>
      )}
    </div>
  );
}

export default MessageBubble;
