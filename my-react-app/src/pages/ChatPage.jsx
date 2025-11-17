import React, { useState, useRef, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import ChatBubble from '../components/ChatBubble.jsx';
import MessageInput from '../components/ChatInput.jsx'; 
import '../styles/Chat.css';
import ChatHeader from '../components/ChatHeader';
import info from '../assets/icon/info.png';


const myName = "사용자 닉네임";
const mockChatData = [
  {
    id: 1,
    interlocutorName: "이름없음", // 상대방 이름
    infoText: "디지털/IT 요리/생활", // 상대 카테고리 내 카테고리
    messages: [ // 👈 추가된 메시지 데이터
        { id: 1, text: "안녕하세요, 부동산 서류 때문에 요청 드렸는데, 교환에 동의해 주셔서 정말 감사해요!", time: "14:45", isMine: true, sender: myName },
        { id: 2, text: "네 저도 감사드려요! 저는 잠실 쪽에 사는데 혹시 거주지가 어디신가요? 직접 만나서 배워야 좋을 것 같아요.", time: "14:45", isMine: false, sender: "이름없음" },
        { id: 3, text: "저는 서울 강동구 쪽이에요! 다행히 거리가 가까워서 직접 만나는 것에 저도 찬성입니다", time: "14:45", isMine: true, sender: myName },
        { id: 4, text: "좋아요! 그럼 잠실역 근처에 있는 OO도서관 1층 카페 괜찮으세요?", time: "14:45", isMine: false, sender: "이름없음" },
        { id: 5, text: "네, 잠실역 OO도서관 좋습니다! 키오스크 실습은 근처 롯데리아에서 잠시 하는 건 어떨까요?", time: "14:45", isMine: true, sender: myName },
    ],
  },
  {
    id: 2,
    interlocutorName: "김민지",
    infoText: "여행/레저 독서/문화",
    messages: [
      // ... id 2번 채팅방의 메시지 데이터
    ]
  },
];

const ChatPage = () => {
  const { chatId } = useParams();
  const currentChatId = parseInt(chatId, 10);
  const currentChat = mockChatData.find(chat => chat.id === currentChatId);

  

  const [messages, setMessages] = useState(currentChat.messages);
  const messagesEndRef = useRef(null);

  const [isBlocked, setIsBlocked] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = (text) => {
    if (isBlocked) {
      alert("차단된 사용자에게는 메시지를 보낼 수 없습니다.");
      return;
    }
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    
    const newMessage = {
      id: messages.length + 1,
      text,
      time: timeString,
      isMine: true,
      sender: myName,
    };
    
    setMessages(prevMessages => [...prevMessages, newMessage]);
  };

  const handleBlockUser = () => {
      setIsBlocked(true);
      alert(`${currentChat.interlocutorName}님을 차단했습니다.`);
  };

  if (!currentChat) {
      return (
          <div className="chat-screen p-8 text-center text-red-500">
              <p className="text-xl font-bold">오류: 채팅방을 찾을 수 없습니다 (ID: {chatId})</p>
              <button onClick={() => window.history.back()} className="mt-4 p-2 bg-gray-200 rounded-md">뒤로 가기</button>
          </div>
      );
  }

  return (
    <div className="chat-screen">
      <ChatHeader interlocutorName={currentChat.interlocutorName} infoText={currentChat.infoText} onBlockUser={handleBlockUser} />

      <div className="messages-container">
        {messages.map(message => (
          <ChatBubble key={message.id} message={message.text} time={message.time} isMine={message.isMine}senderName={message.sender} />
        ))}
              
        <div ref={messagesEndRef} /> 
      </div>

      {/* 👈 차단 경고 메시지 */}
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