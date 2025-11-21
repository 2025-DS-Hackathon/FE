import api from "./api";  

export async function createTalent(payload) {
  const res = await api.post(`/talents`, payload);
  return res.data;
}

export async function getMyTalentSummary() {
  const res = await api.get(`/talents/my-summary`);
  return res.data;
}
