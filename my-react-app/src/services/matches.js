import api from "./api";

// 매칭 수락/거절
export async function submitMatchAgreement(matchId, isAgreed) {
  const response = await api.post(`/matches/${matchId}/agreement`, {
    is_agreed: isAgreed, 
  });
  return response.data;
}

// 매칭 상세 정보 조회
export async function getMatchDetail(matchId) {
  const response = await api.get(`/matches/${matchId}`);
  return response.data;
}

// 매칭 시작 요청
export async function startMatching() {
  const response = await api.post("/matches/start");
  return response.data;
}

