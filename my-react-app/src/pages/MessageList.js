import React, { useEffect, useState } from 'react';
import MessageItem from '../components/MessageItem'; 
import Back from '../components/Back';
import '../styles/MessageList.css'
import { useNavigate } from 'react-router-dom';
import { getChatList } from '../services/messages';

function MessageList() {

  const [chats, setChats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const data = await getChatList();
        setChats(data);
      } catch (error) {
        console.error('채팅 목록 로딩 실패:', error);
      }
    };
    fetchChats();
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleItemClick = (matchId, partnerName) => {
    navigate(`/Message/${matchId}`, { 
      state: { partnerName: partnerName } 
    });
  };

  const sortedChats = [...chats].sort((a, b) => {
      const timeA = new Date(a.last_message_time || 0);
      const timeB = new Date(b.last_message_time || 0);
      return timeB - timeA;
  });

  return (
    <div className="message-inbox">
      <Back 
          title="쪽지함" 
          onBack={handleBack} 
      />

      <div className="message-list">
        {sortedChats.length === 0 ? (
            <div style={{padding: '20px', textAlign:'center', color:'#888'}}>
                아직 대화가 없습니다.
            </div>
        ) : (
            sortedChats.map((chat) => (
            <MessageItem
                key={chat.match_id}
                id={chat.match_id}
                sender={chat.partner_nickname}
                content={chat.last_message || "대화 내용 없음"}
                time={chat.last_message_time}
                unreadCount={chat.unread_count}
                
                onItemClick={() => handleItemClick(chat.match_id, chat.partner_nickname)}
            />
            ))
        )}
      </div>
    </div>
  );
}

export default MessageList;