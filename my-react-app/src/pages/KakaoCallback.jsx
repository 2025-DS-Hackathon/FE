import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function KakaoCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URL(window.location.href).searchParams;
    const token = searchParams.get("token"); 
    const code = searchParams.get("code");   


    if (token) {
      console.log("✅ 로그인 성공! 토큰 저장:", token);
      localStorage.setItem("access_token", token);
      
      navigate("/extra"); 
      return; 
    }

    if (code) {
       return;
    }
    


  }, [navigate]);

  return <div>로그인 처리 중... 화면이 넘어갑니다.</div>;
}