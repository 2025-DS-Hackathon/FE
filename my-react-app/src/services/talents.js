// src/services/talents.js
import api from "./api";

// 1) Ping — 서버 체크용
export const pingTalents = async () => {
  const res = await api.get("/talents/talents/ping");
  return res.data;
};

// 2) 재능 생성
export const createTalent = async (payload) => {
  const res = await api.post("/talents/talents", payload);
  return res.data;
};

// 3) 재능 요약 조회
export const getMyTalentSummary = async () => {
  const res = await api.get("/talents/talents/my-summary");
  return res.data;
};
