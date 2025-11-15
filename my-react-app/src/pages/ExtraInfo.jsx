import { useState } from "react";
import styles from "../styles/ExtraInfo.module.css";

export default function ExtraInfo() {
  const [birth, setBirth] = useState("");
  const isValid = birth.length === 4 && Number(birth) > 1900;

  const handleStart = () => {
    if (!isValid) return;

    console.log("입력된 출생연도:", birth);
    window.location.href = "/main";
  };

  return (
    <div className={styles.container}>
      {/* 상단바 */}
      <div className={styles.topBar}>
        <span className={styles.backArrow}>←</span>
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
              placeholder="숫자 4자리로 입력해주세요 (예: 2004)"
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
