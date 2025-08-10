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
    <div className={`message-row ${isBot ? 'bot' : 'user'}`}>
      {isBot && (
        <div className="avatar-circle bot-avatar">
          {getInitials()}
        </div>
      )}

      <div className={`message-bubble ${isBot ? 'bot' : 'user'}`}>
        <span className="message-text">{text}</span>
      </div>

      {!isBot && (
        <div className="avatar-circle user-avatar">
          {getInitials()}
        </div>
      )}
    </div>
  );
}

export default MessageBubble;
