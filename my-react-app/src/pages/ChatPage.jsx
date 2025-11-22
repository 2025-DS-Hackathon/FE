import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ChatBubble from '../components/ChatBubble.jsx';
import MessageInput from '../components/ChatInput.jsx';
import '../styles/Chat.css';
import ChatHeader from '../components/ChatHeader';
import info from '../assets/icon/info.png';

import { getMessagesInRoom, sendMessage } from "../services/message";

// 🔥 mock 3명 고정
const myName = "사용자 닉네임";
const mockChats = {
  1: {
    name: "김민지",
    category: "디지털/IT 요리/생활",
  },
  2: {
    name: "이고은",
    category: "악기 요리/공예",
  },
  3: {
    name: "박서준",
    category: "스포츠/헬스 언어",
  },
};

// 🔥 mock 메시지도 고정
const mockMessages = [
  { id: 1, text: "안녕하세요, 부동산 서류 때문에 요청 드렸는데, 교환에 동의해 주셔서 정말 감사해요!", time: "14:45", isMine: true, sender: myName },
  { id: 2, text: "네 저도 감사드려요! 저는 잠실 쪽에 사는데 혹시 거주지가 어디신가요? 직접 만나서 배워야 좋을 것 같아요.", time: "14:45", isMine: false, sender: "상대방" },
  { id: 3, text: "저는 서울 강동구 쪽이에요! 다행히 거리가 가까워서 직접 만나는 것에 저도 찬성입니다", time: "14:45", isMine: true, sender: myName },
  { id: 4, text: "좋아요! 그럼 잠실역 근처에 있는 OO도서관 1층 카페 괜찮으세요?", time: "14:45", isMine: false, sender: "상대방" },
  { id: 5, text: "네, 잠실역 OO도서관 좋습니다! 키오스크 실습은 근처 롯데리아에서 잠시 하는 건 어떨까요?", time: "14:45", isMine: true, sender: myName },
];

const ChatPage = () => {
  const { chatId } = useParams();
  const roomId = parseInt(chatId, 10);

  // ⬇ 기본 이름 = mock 3명 중 하나
  const defaultName = mockChats[roomId]?.name || null;
  const defaultCategory = mockChats[roomId]?.category || null;

  const [messages, setMessages] = useState(mockMessages);
  const [roomInfo, setRoomInfo] = useState({
    partner_nickname: defaultName || "새로운 사용자",
    shared_category: defaultCategory || "",
  });

  const [isBlocked, setIsBlocked] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    console.log("📌 API 요청 보냄 → /messages/rooms/" + roomId);
    getMessagesInRoom(roomId)
      .then(res => {
        console.log("📌 API 응답:", res.data);
        if (!res?.data) return;

        // ⬇ 새 채팅(4번 이상)일 때 백엔드 이름 적용
        if (roomId >= 4 && res.data.partner_nickname) {
          setRoomInfo({
            partner_nickname: res.data.partner_nickname,
            shared_category: res.data.shared_category || "",
          });
        }

        const serverMessages = res.data.messages;
        if (!Array.isArray(serverMessages) || serverMessages.length === 0) return; // mock 유지

        const formatted = serverMessages.map((m, index) => ({
          id: m.message_id || index,
          text: m.content,
          time: m.created_at?.slice(11, 16) || "",
          isMine: res.data.my_user_id ? m.sender_id === res.data.my_user_id : false,
          sender: m.sender,
        }));
        setMessages(formatted);
      })
      .catch(() => {
        setMessages(mockMessages);
      });
  }, [roomId]);

  const handleSendMessage = async (text) => {
    if (isBlocked) return alert("차단된 사용자에게는 메시지를 보낼 수 없습니다.");

    try {
      const res = await sendMessage(roomId, text);
      setMessages(prev => [
        ...prev,
        {
          id: res.data.message_id,
          text: res.data.content,
          time: res.data.created_at?.slice(11, 16) || "",
          isMine: true,
          sender: myName,
        }
      ]);
    } catch {
      const now = new Date();
      const t = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
      setMessages(prev => [...prev, { id: prev.length + 1, text, time: t, isMine: true, sender: myName }]);
    }
  };

  const handleBlockUser = () => {
    setIsBlocked(true);
    alert(`${roomInfo.partner_nickname}님을 차단했습니다.`);
  };

  return (
    <div className="chat-screen">
      <ChatHeader
        interlocutorName={roomInfo.partner_nickname}
        infoText={roomInfo.shared_category}
        onBlockUser={handleBlockUser}
      />

      <div className="messages-container">
        {messages.map(msg => (
          <ChatBubble
            key={msg.id}
            message={msg.text}
            time={msg.time}
            isMine={msg.isMine}
            senderName={msg.sender}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {isBlocked && (
        <div className="block-warning-message">
          <img src={info} alt="icon" className="warning-icon-img" />
          차단된 사용자입니다. 쪽지를 보낼 수 없습니다.
        </div>
      )}

      <MessageInput onSendMessage={handleSendMessage} isBlocked={isBlocked} />
    </div>
  );
};

export default ChatPage;
