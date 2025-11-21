import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function KakaoCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    if (!code) return;

    async function login() {
      try {
        const res = await API.get(`/auth/kakao/callback?code=${code}`);
        const { access_token } = res.data;

        localStorage.setItem("access_token", access_token);

        navigate("/extra-info");

      } catch (err) {
        console.error("카카오 로그인 실패", err);
      }
    }

    login();
  }, []);

  return <div>로그인 중입니다...</div>;
}
