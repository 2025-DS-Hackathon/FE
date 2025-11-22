import api from "./api";

export async function submitMatchAgreement(matchId, isAgreed) {
  const response = await api.post(`/matches/${matchId}/agreement`, {
    is_agreed: isAgreed, 
  });
  return response.data;
}

export async function getMatchDetail(matchId) {
  const response = await api.get(`/matches/${matchId}`);
  return response.data;
}

export async function startMatching() {
  const response = await api.post("/matches/start");
  return response.data;
}

