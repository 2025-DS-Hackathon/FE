import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/ExtraInfo.module.css";
import { updateMyProfile, getMyInfo } from "../services/user";

export default function ExtraInfo() {
  const [birth, setBirth] = useState("");
  const navigate = useNavigate();

  const isValid = birth.length === 4 && Number(birth) > 1900;
  const [birthYear, setBirthYear] = useState("");
  // 출생연도 → 세대 자동 판별
  const getGeneration = () => {
    const year = Number(birth);
    const age = new Date().getFullYear() - year + 1;

    if (age >= 15 && age <= 39) return "청년 사용자";
    if (age >= 55) return "시니어 사용자";
    return "일반 사용자";
  };

  const handleStart = async () => {
    if (!isValid) return;

    try {
      await updateMyProfile(birth, true);
      const updated = await getMyInfo();

      localStorage.setItem("user", JSON.stringify(updated));

      navigate("/mypage-user");
    } catch (err) {
      alert("업데이트 실패");
    }
  };


  const handleSubmit = async () => {
    try {
      await updateMyProfile(birth, true);
      const updated = await getMyInfo();
      localStorage.setItem("user", JSON.stringify(updated));
      console.log("업데이트 결과:", updated);
      navigate("/mypage-user");
    } catch (err) {
      alert("업데이트 실패");
    }
  };

  return (
    <div className={styles.container}>
      {/* 상단바 */}
      <div className={styles.topBar}>
        <span className={styles.backArrow} onClick={() => navigate(-1)}>
          &lt;
        </span>
        <span className={styles.title}>추가 정보 입력</span>
      </div>

      {/* 본문 */}
      <div className={styles.content}>
        <p className={styles.guideTitle}>
          서비스 이용을 위해<br />출생연도를 입력해주세요
        </p>

        <div className={styles.inputBoxWrapper}>
          <label className={styles.label}>출생연도</label>

          <div className={styles.row}>
            <input
              type="number"
              className={styles.inputBox}
              placeholder="숫자 4자리 (예: 2004)"
              value={birth}
              onChange={(e) => setBirth(e.target.value)}
            />
            <span className={styles.inputSuffix}>입력</span>
          </div>

          <div className={styles.underline}></div>
        </div>
      </div>

      {/* 버튼 */}
      <div className={styles.buttonArea}>
        <button
          disabled={!isValid}
          className={isValid ? styles.buttonActive : styles.buttonDisabled}
          onClick={handleStart}
        >
          시작하기
        </button>
      </div>
    </div>
  );
}
