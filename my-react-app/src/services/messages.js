import api from "./api";  

export const getChatList = async () => {
  const response = await api.get("/messages/messages");
  return response.data;
};

export const getChatDetail = async (matchId) => {
  const response = await api.get(`/messages/messages/${matchId}`);
  return response.data;
};

export const sendMessage = async (matchId, content) => {
  const response = await api.post(`/messages/messages/${matchId}`, {
    content: content,
  });
  return response.data;
};

export const markMessagesAsRead = async (matchId) => {
  const response = await api.post(`/messages/messages/${matchId}/mark-read`);
  return response.data;
};

export const blockUser = async (matchId) => {
  const response = await api.post(`/messages/messages/${matchId}/block`);
  return response.data;
};