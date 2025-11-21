// src/pages/Main.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Header from '../components/Header';
import TalentCard from '../components/TalentCard';
import MatchButton from '../components/MatchButton';
import Popup from '../components/Popup';
import { Body2, Headline1 } from '../components/Typography/Typography';
import styles from '../styles/Main.module.css';

function Main() {
  const navigate = useNavigate();
  const location = useLocation();

  // 임시 로그인 / 등록 상태
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [learnRegistered, setLearnRegistered] = useState(false);
  const [teachRegistered, setTeachRegistered] = useState(false);

  // 알림 뱃지
  const [hasNotification, setHasNotification] = useState(true);

  // 매칭 상태: normal / waiting / stopped
  const [matchStatus, setMatchStatus] = useState("normal");

  // 팝업 관리
  const [popupMessage, setPopupMessage] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);

  const openPopup = (msg) => {
    setPopupMessage(msg);
    setPopupOpen(true);
  };
  const closePopup = () => setPopupOpen(false);

  const canMatch = learnRegistered && teachRegistered;
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const isLoggedIn = !!token;
    setIsLoggedIn(!!token);
  }, []);
  // -----------------------------------------
  // ⭐ 헤더를 수정하지 않고 URL 감지해서 이동 처리
  // -----------------------------------------
  useEffect(() => {
    // 알림 아이콘 → /notifications
    if (location.pathname === "/go-notifications") {
      navigate("/notifications");
    }

    // 사람 아이콘
    if (location.pathname === "/go-profile") {
      if (isLoggedIn) navigate("/mypage-user");
      else navigate("/mypage");
    }
  }, [location.pathname, isLoggedIn, navigate]);

  // -----------------------------------------
  // 📌 재능 카드 클릭 처리
  // -----------------------------------------
  const handleTalentClick = (type, registered) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    if (!registered) {
      navigate("/target", { state: { mode: "create", type } });
      return;
    }

    const edit = window.confirm("등록된 재능을 수정하시겠습니까?");
    if (edit) {
      navigate("/target", { state: { mode: "edit", type } });
    }
  };

  // -----------------------------------------
  // 📌 랜덤 매칭 버튼 클릭 처리
  // -----------------------------------------
  const handleMatch = () => {
    if (!canMatch) {
      openPopup("두 재능을 모두 등록해야 매칭이 가능합니다.");
      return;
    }

    if (matchStatus === "stopped") {
      openPopup(
        "현재 서비스는 청년-시니어 매칭만 운영 중입니다.\n세대 조건이 맞지 않아 신청이 불가합니다."
      );
      return;
    }

    if (matchStatus === "waiting") {
      openPopup(
        "이미 신청 완료 상태입니다.\n매칭이 확정되면 알림으로 알려드릴게요!"
      );
      return;
    }

    if (matchStatus === "normal") {
      setMatchStatus("waiting");
      setHasNotification(true);

      openPopup(
        "신청 완료! 매칭이 확정되면 알림으로 알려드릴게요.\n잠시 후 마이페이지에서 확인해 보세요!"
      );
      navigate("/exchange");
    }
  };

  return (
    <div className={styles.container}>
        <Header 
      hasNotification={hasNotification}
      onMyPage={() => {
        if (isLoggedIn) navigate("/mypage-user");
        else navigate("/mypage");
      }}
      onNotification={() => navigate("/notifications")}
    />
      <main className={styles.main}>
        <Headline1>
          <br />
          Give & Take,<br />세대를 넘어 재능을 교환해 보세요!<br />
        </Headline1>

        {/* 재능 카드 */}
        <div className={styles.cardGroup}>
          <TalentCard
            type="teach"
            isRegistered={teachRegistered}
            onClick={() => handleTalentClick("teach", teachRegistered)}
          />
          <TalentCard
            type="learn"
            isRegistered={learnRegistered}
            onClick={() => handleTalentClick("learn", learnRegistered)}
          />
        </div>

        {/* 매칭 버튼 */}
        <div className={styles.buttonWrapper}>
          <MatchButton onClick={handleMatch} disabled={!canMatch} />
        </div>

        <Body2 className={styles.exchangeStats}>
          지금까지 총 519쌍이 재능을 교환했습니다! 🤝
        </Body2>
      </main>

      {/* 팝업 */}
      {popupOpen && (
        <Popup
          message={popupMessage}
          onClose={closePopup}
        />
      )}
    </div>
  );
}

export default Main;
