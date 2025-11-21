import axios from "axios";

export const logout = () => {
  localStorage.removeItem("access_token");
};

export const getKakaoLoginUrl = async () => {
  try {
    const res = await axios.get("http://localhost:8000/auth/kakao/login");
    return res.data.auth_url;
  } catch (error) {
    console.error("카카오 로그인 URL 요청 실패:", error);
    throw error;
  }
};
