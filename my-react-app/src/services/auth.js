import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const saveAccessToken = (token) => {
  if (!token) return;
  localStorage.setItem("access_token", token);
};

export const kakaoLogin = async () => {
  const res = await axios.get(`${API_BASE_URL}/auth/kakao/login`);
  return res.data.auth_url; 
};

export const handleKakaoCallback = async (code) => {
  const res = await axios.get(`${API_BASE_URL}/auth/kakao/callback?code=${code}`);
  const token = res.data.access_token;
  saveAccessToken(token);
  return token;
};
