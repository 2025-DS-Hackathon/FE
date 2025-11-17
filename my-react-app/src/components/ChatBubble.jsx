import React from 'react';
import '../styles/Chat.css';

const ChatBubble = ({ message, time, isMine, senderName }) => {
  return (
    <div className={`chat-bubble-container ${isMine ? 'mine' : 'other'}`}>
      <div className="chat-bubble-content">
        {!isMine && <div className="sender-name">{senderName}</div>}
        <div className="chat-bubble">
          <p className="message-text">{message}</p>
          <span className="message-time">{time}</span>
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;