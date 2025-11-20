import { useState } from "react";
import Checkbox from "../components/Checkbox";
import SocialButton from "../components/SocialButton";
import { kakaoLogin } from "../services/socialAuth";
import styles from "../styles/Login.module.css";

export default function Login() {
  const [agreements, setAgreements] = useState({
    personal: false,
    middleAge: false,
  });

  const allChecked = agreements.personal && agreements.middleAge;

  const handleLogin = async () => {
    const userData = await kakaoLogin();
    const birthYear = Number(userData.birthyear);
    const age = new Date().getFullYear() - birthYear + 1;

    let generation = "";
    if (age >= 15 && age <= 39) generation = "청년";
    else if (age >= 55) generation = "시니어";

    await fetch("/api/user/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nickname: userData.nickname,
        birthyear: birthYear,
        email: userData.email,
        generation,
      }),
    });

    window.location.href = "/main";
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
          label={
            <>
              서비스 이용을 위한 사용자 개인정보 (출생연도,
              이름, 이메일) 수집 동의
            </>
          }
/>

        <Checkbox
          checked={agreements.middleAge}
          onChange={() =>
            setAgreements((prev) => ({ ...prev, middleAge: !prev.middleAge }))
          }
          label="중년(만 40세~만 54세) 사용자는 서비스 이용이 불가합니다."
        />
      </div>

      <div className={styles.buttonArea}>
        <SocialButton type="kakao" disabled={!allChecked} onClick={handleLogin} />
      </div>
    </div>
  );
}
