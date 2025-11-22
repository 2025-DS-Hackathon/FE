import api from "./api"; // axios instance

// 1) 쪽지방 목록 조회
export const getMessageRooms = () => {
  return api.get("/messages/rooms", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// 2) 특정 쪽지방 메시지 조회
export const getMessagesInRoom = (roomId) => {
  return api.get(`/messages/rooms/${roomId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// 3) 메시지 전송
export const sendMessage = (roomId, content) => {
  return api.post(
    `/messages/rooms/${roomId}`,
    { content },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};
