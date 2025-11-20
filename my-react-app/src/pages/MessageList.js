import React from 'react';
import MessageItem from '../components/MessageItem'; 
import Back from '../components/Back';
import '../styles/MessageList.css'
import { useNavigate } from 'react-router-dom';

const messages = [
  { id: 1, sender: '김민지', content: '첫 번째 쪽지입니다.', date: '11/15' },
  { id: 3, sender: '박서준', content: '가장 최근에 온 쪽지입니다!', date: '11/17' },
  { id: 2, sender: '이고은', content: '두 번째 쪽지입니다.', date: '11/16' },
];

function MessageList() {
  const navigate = useNavigate();
  const handleBack = () => {
    console.log("뒤로 가기 버튼 클릭됨");
    navigate(-1);
  };

  const handleItemClick = (messageId, senderName) => {
    console.log(`쪽지 항목 클릭됨: ID=${messageId}, 발신자=${senderName}`);
    navigate(`/Message/${messageId}`);
  };

  const sortedMessages = [...messages].sort((a, b) => b.id - a.id);

  return (
    <div className="message-inbox">
      <Back 
              title="쪽지함" 
              onBack={handleBack} 
            />

      <div className="message-list">
        {sortedMessages.map((msg) => (
          <MessageItem
            key={msg.id}
            {...msg}
            onItemClick={handleItemClick}
          />
        ))}
      </div>
    </div>
  );
}

export default MessageList;