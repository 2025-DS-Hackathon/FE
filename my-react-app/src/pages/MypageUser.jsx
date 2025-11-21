import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../styles/MypageUser.module.css";

export default function MypageUser() {
  const location = useLocation();
  const navigate = useNavigate();

  const user = location.state || {
    nickname: "고정은",
    generation: "청년 사용자",
    unreadMessages: 1,
  };

  const [showModal, setShowModal] = useState(false);

  const handleWithdraw = () => {
    setShowModal(false);
    alert("탈퇴되었습니다.");
    navigate("/login");
  };

  // 🔥 세대 색상
  const tagColor =
    user.generation === "시니어 사용자" ? "#ffa04d" : "#4d77ff";

  return (
    <div className={styles.wrapper}>
      <div className={styles.topBar}>
        <span className={styles.backArrow} onClick={() => navigate(-1)}>
          &lt;
        </span>
        <span className={styles.title}>내 정보</span>
      </div>

      <div className={styles.profileSection}>
        <div className={styles.profileCircle}></div>

        <div className={styles.nicknameRow}>
          <span className={styles.nickname}>{user.nickname}</span>

          <span
            className={styles.generationTag}
            style={{
              color: tagColor,
              borderColor: tagColor,
            }}
          >
            {user.generation}
          </span>
        </div>
      </div>

      <div className={styles.menuList}>
        <div
          className={styles.menuItem}
          onClick={() => navigate("/messages")}
        >
          <span className={styles.icon}>✉</span>
          <span className={styles.centerText}>쪽지 수신함</span>

          {user.unreadMessages > 0 && (
            <span className={styles.badge}>{user.unreadMessages}</span>
          )}
        </div>

        <div
          className={styles.menuItem}
          onClick={() => window.open("https://example.com/terms", "_blank")}
        >
          <span className={styles.icon}>⚙</span>
          <span className={styles.centerText}>개인정보 및 이용약관 확인</span>
        </div>

        <div
          className={styles.menuItem}
          onClick={() => navigate("/login")}
        >
          <span className={styles.icon}>↪</span>
          <span className={styles.centerText}>로그아웃</span>
        </div>
      </div>

      <div className={styles.withdraw} onClick={() => setShowModal(true)}>
        회원탈퇴
      </div>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <p className={styles.modalText}>정말 탈퇴하시겠습니까?</p>

            <div className={styles.modalButtons}>
              <button
                className={styles.modalCancel}
                onClick={() => setShowModal(false)}
              >
                취소
              </button>

              <button
                className={styles.modalConfirm}
                onClick={handleWithdraw}
              >
                탈퇴
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
