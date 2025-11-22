import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../styles/MypageUser.module.css";
import { getMyInfo } from "../services/user";
import api from "../services/api";

export default function MypageUser() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(location.state?.user || null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/login");
      return;
    }

    api
      .get("/users/me")
      .then((res) => {
        if (!res.data) {
          navigate("/login");
        } else {
          setUser(res.data);
        }
      })
      .catch(() => {
        localStorage.removeItem("access_token");
        navigate("/login");
      });
  }, [navigate]);

  useEffect(() => {
    const loadMyInfo = async () => {
      try {
        const data = await getMyInfo();
        console.log("내 정보:", data);
        setUser(data);
      } catch (err) {
        console.error("유저 정보 불러오기 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    loadMyInfo();
  }, []);

  if (loading) {
    return <div style={{ padding: 20 }}>유저 정보를 불러오는 중...</div>;
  }

  if (!user) {
    return <div style={{ padding: 20 }}>유저 정보를 찾을 수 없습니다.</div>;
  }

  const generation =
    user.user_type === "young"
      ? "청년 사용자"
      : user.user_type === "senior"
      ? "시니어 사용자"
      : "미분류";

  const tagColor = generation === "시니어 사용자" ? "#ffa04d" : "#4d77ff";

  const handleWithdraw = () => {
    setShowModal(false);
    alert("탈퇴되었습니다.");
    localStorage.removeItem("access_token");
    navigate("/");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.topBar}>
        <span className={styles.backArrow} onClick={() => navigate("/")}>
          &lt;
        </span>
        <span className={styles.title}>내 정보</span>
      </div>

      <div className={styles.profileSection}>
        <div className={styles.profileCircle}></div>

        <div className={styles.nicknameRow}>
          <span className={styles.nickname}>{user?.nickname}</span>

          <span
            className={styles.generationTag}
            style={{ color: tagColor, borderColor: tagColor }}
          >
            {generation}
          </span>

          {user?.unreadMessages > 0 && (
            <span className={styles.badge}>{user.unreadMessages}</span>
          )}
        </div>
      </div>

      <div className={styles.menuList}>
        <div className={styles.menuItem} onClick={() => navigate("/message")}>
          <span className={styles.icon}>✉</span>
          <span className={styles.centerText}>쪽지 수신함</span>

          {user.unreadMessages > 0 && (
            <span className={styles.badge}>{user.unreadMessages}</span>
          )}
        </div>

        <div
          className={styles.menuItem}
          onClick={() => navigate("/exchange")}
        >
          <span className={styles.icon}>⚙</span>
          <span className={styles.centerText}>결과 매칭보기</span>
        </div>

        <div className={styles.menuItem}>
          <span className={styles.icon}>↪</span>
          <button
            className={styles.logoutButton}
            onClick={() => {
              localStorage.removeItem("access_token");
              navigate("/");
            }}
          >
            로그아웃
          </button>
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

              <button className={styles.modalConfirm} onClick={handleWithdraw}>
                탈퇴
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
