import React from "react";


export default function MessageItem({ sender, date, content, id, onItemClick }){
  const handleClick = () => {
    if (onItemClick) {
        onItemClick(id, sender); 
    }
  };
  
    return (
    <div className="message-item" onClick={handleClick}>
      <div className="avatar" />
      <div className="content">
        <div className="main-info">
            <span className="sender-name">{sender}</span>
            <span className="message-content">{content}</span>
        </div>
      </div>
      <span className="date-right">{date}</span>
    </div>
  );
}
