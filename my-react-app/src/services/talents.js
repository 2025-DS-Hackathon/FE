import api from "./api";  // axios 인스턴스 (토큰 자동 첨부)

export async function createTalent(payload) {
  const res = await api.post(`/talents`, payload);
  return res.data;
}

export async function getMyTalentSummary() {
  const res = await api.get(`/talents/my-summary`);
  return res.data;
}
