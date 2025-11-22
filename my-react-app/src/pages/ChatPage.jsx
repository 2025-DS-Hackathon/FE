import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import ChatBubble from '../components/ChatBubble.jsx';
import MessageInput from '../components/ChatInput.jsx'; 
import '../styles/Chat.css';
import ChatHeader from '../components/ChatHeader';
import info from '../assets/icon/info.png';
import { getChatDetail, sendMessage, markMessagesAsRead, blockUser } from '../services/messages.js';
import api from '../services/api.js';

const ChatPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  // [수정] URL 파라미터가 :matchId 인지 :id 인지 몰라도 둘 다 확인하도록 변경
  const matchId = params.matchId || params.id; 

  // 디버깅용 로그 (F12 콘솔에서 확인 가능)
  console.log("URL 파라미터:", params);
  console.log("현재 매칭 ID:", matchId);
  
  const [messages, setMessages] = useState([]);
  const [myUserId, setMyUserId] = useState(null);
  const [isBlocked, setIsBlocked] = useState(false); 
  const messagesEndRef = useRef(null); 

  // 1. 내 ID 가져오기
  useEffect(() => {
    const getMyId = async () => {
      try {
        const res = await api.get('/users/me'); 
        setMyUserId(res.data.user_id);
      } catch (err) {
        console.error("내 정보 로드 실패", err);
      }
    };
    getMyId();
  }, []);

  // 2. 데이터 로드 함수
  const loadData = async () => {
    if (!matchId) return; // ID가 없으면 실행 안 함
    try {
      const data = await getChatDetail(matchId);
      setMessages(data);
      await markMessagesAsRead(matchId);
    } catch (error) {
      console.error('메시지 로드 실패:', error);
    }
  };

  // 3. 초기 로드
  useEffect(() => {
    if (matchId) loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchId]);

  // 4. 스크롤 자동 이동
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 5. 메시지 전송 핸들러
  const handleSendMessage = async (inputContent) => {
    if (!inputContent || !inputContent.trim()) return;
    try {
      await sendMessage(matchId, inputContent);
      await loadData(); // 전송 후 목록 갱신
    } catch (error) {
      alert("전송 실패");
      console.error(error);
    }
  };

  // 6. 차단 핸들러
  const handleBlockUser = async () => {
      if(window.confirm("정말로 차단하시겠습니까?")) {
        try {
            await blockUser(matchId);
            setIsBlocked(true);
            alert("차단되었습니다.");
        } catch(err) {
            alert("차단 실패");
        }
      }
  };

  // UI용 데이터 매핑
  const partnerMsg = messages.find(m => m.sender_id !== myUserId);
  const currentChat = {
    interlocutorName: partnerMsg ? `상대방` : "매칭 상대", 
  };

  // matchId가 없으면 에러 메시지 표시
  if (!matchId) {
      return (
        <div style={{ padding: 20, textAlign: 'center' }}>
          <h3>잘못된 접근입니다.</h3>
          <p>URL에 매칭 ID가 없습니다.</p>
          <button onClick={() => navigate(-1)}>뒤로 가기</button>
        </div>
      );
  }

  return (
    <div className="chat-screen">
      <ChatHeader 
        interlocutorName={currentChat.interlocutorName} 
        infoText={currentChat.infoText} 
        onBlockUser={handleBlockUser} 
      />

      <div className="messages-container">
        {messages.map(msg => (
          <ChatBubble 
            key={msg.message_id} 
            message={msg.content} 
            time={new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} 
            isMine={msg.sender_id === myUserId}
            senderName={msg.sender_id === myUserId ? "나" : currentChat.interlocutorName} 
          />
        ))}
        <div ref={messagesEndRef} /> 
      </div>

      {isBlocked && (
          <div className="block-warning-message">
              <img src={info} alt="경고 아이콘" className="warning-icon-img" /> 차단된 사용자입니다. 쪽지를 보낼 수 없습니다.
          </div>
      )}

      <MessageInput onSendMessage={handleSendMessage} isBlocked={isBlocked}/>
    </div>
  );
};

export default ChatPage;