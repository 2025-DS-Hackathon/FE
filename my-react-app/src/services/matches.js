import api from "./api";

// 1. 매칭 동의/거절
export async function submitMatchAgreement(matchId, isAgreed) {
  const response = await api.post(`/matches/${matchId}/agreement`, {
    is_agreed: isAgreed, 
  });
  return response.data;
}

// 2. [누락되었던 함수 복구] 매칭 상세 정보 조회
export async function getMatchDetail(matchId) {
  const response = await api.get(`/matches/${matchId}`);
  return response.data;
}

// 3. [중복 제거됨] 매칭 시작 요청
export async function startMatching() {
  const response = await api.post("/matches/start");
  return response.data;
}

// 4. (선택) 오늘 매칭 통계 조회
export async function getTodayMatchStats() {
  const response = await api.get("/matches/stats/today");
  return response.data;
}