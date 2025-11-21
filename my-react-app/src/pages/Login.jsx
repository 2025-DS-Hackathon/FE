import { useState } from "react";
import Checkbox from "../components/Checkbox";
import SocialButton from "../components/SocialButton";
import styles from "../styles/Login.module.css";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Login() {
  const [agreements, setAgreements] = useState({
    personal: false,
    middleAge: false,
  });

  const navigate = useNavigate();

  const allChecked = agreements.personal && agreements.middleAge;

  // 🔥 카카오 로그인 URL 받아서 이동
  const handleKakaoLogin = async () => {
    try {
      const res = await API.get("/auth/kakao/login");
      const kakaoUrl = res.data.auth_url;

      window.location.href = kakaoUrl; // 카카오 인증 페이지 이동
    } catch (error) {
      console.error("카카오 로그인 URL 요청 실패", error);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.textCenter}>
        <h1>Project Name</h1>
        <p>세대를 넘어 재능을 교환해 보세요!</p>
      </div>

      <div className={styles.agreementArea}>
        <Checkbox
          checked={agreements.personal}
          onChange={() =>
            setAgreements((prev) => ({ ...prev, personal: !prev.personal }))
          }
          label="서비스 이용을 위한 개인정보 수집에 동의합니다"
        />

        <Checkbox
          checked={agreements.middleAge}
          onChange={() =>
            setAgreements((prev) => ({ ...prev, middleAge: !prev.middleAge }))
          }
          label="중년(40~54세) 사용자는 서비스 이용이 불가합니다."
        />
      </div>

      <div className={styles.buttonArea}>
        <SocialButton
          type="kakao"
          disabled={!allChecked}
          onClick={handleKakaoLogin}
        />
      </div>
    </div>
  );
}
