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

  const handleItemClick = (matchId) => {
    // 상세 페이지 URL 형식에 맞게 수정 (/Message/숫자)
    navigate(`/Message/${matchId}`);
  };

  // [수정] chats 데이터를 기반으로 정렬
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
                // MessageItem props에 맞게 데이터 전달
                id={chat.match_id}
                sender={chat.partner_nickname}
                content={chat.last_message || "대화 내용 없음"}
                time={chat.last_message_time}
                unreadCount={chat.unread_count}
                
                // 클릭 핸들러 연결
                onItemClick={() => handleItemClick(chat.match_id)}
            />
            ))
        )}
      </div>
    </div>
  );
}

export default MessageList;