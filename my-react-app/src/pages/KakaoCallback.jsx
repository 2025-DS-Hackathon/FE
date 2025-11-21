import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function KakaoCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");

    if (!code) {
      alert("카카오 인가 코드가 없습니다.");
      return;
    }

    async function fetchToken() {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/auth/kakao/callback?code=${code}`
        );
        const data = await res.json();

        if (data.access_token) {
          console.log("📌 JWT 토큰 받아옴:", data.access_token);
          localStorage.setItem("access_token", data.access_token);
          navigate("/extra");
        } else {
          console.error("토큰 없음:", data);
          alert("로그인 실패: 토큰 없음");
        }
      } catch (err) {
        console.error("카카오 로그인 처리 중 오류:", err);
        alert("로그인 중 오류가 발생했습니다.");
      }
    }

    fetchToken();
  }, [navigate]);

  return <div>로그인 처리 중...</div>;
}
