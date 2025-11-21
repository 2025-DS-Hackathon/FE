import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Header from '../components/Header';
import TalentCard from '../components/TalentCard';
import MatchButton from '../components/MatchButton';
import Popup from '../components/Popup';
import { Body2, Headline1 } from '../components/Typography/Typography';
import styles from '../styles/Main.module.css';
import { getMyInfo } from "../services/user";
import { getMyTalentSummary } from "../services/talents";
import { startMatching } from "../services/matches";

function Main() {
  const navigate = useNavigate();
  const location = useLocation();

  // 로그인 여부
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Teach / Learn 등록 여부
  const [teachRegistered, setTeachRegistered] = useState(false);
  const [learnRegistered, setLearnRegistered] = useState(false);

  // 유저 정보 / 재능 요약
  const [user, setUser] = useState(null);
  const [summary, setSummary] = useState(null);

  // 팝업
  const [popupMessage, setPopupMessage] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);

  // 알림 뱃지
  const [hasNotification, setHasNotification] = useState(true);

  // 매칭 상태
  const [matchStatus, setMatchStatus] = useState("normal");

  const openPopup = (msg) => {
    setPopupMessage(msg);
    setPopupOpen(true);
  };

  const closePopup = () => setPopupOpen(false);

  // 로그인 여부 판별
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);
  }, []);

  // 유저 정보 로딩
  useEffect(() => {
    if (!isLoggedIn) return;

    async function loadUser() {
      try {
        const info = await getMyInfo();
        setUser(info);
      } catch (e) {
        console.error("유저 정보 불러오기 실패", e);
      }
    }

    loadUser();
  }, [isLoggedIn]);

  // Teach / Learn 재능 요약 로딩
  useEffect(() => {
    if (!isLoggedIn) return;

    async function fetchSummary() {
      try {
        const data = await getMyTalentSummary();
        console.log("📌 내 재능 요약:", data);
        setSummary(data);

        // teach/learn 등록 여부 반영
        setTeachRegistered(!!data.teach);
        setLearnRegistered(!!data.learn);
      } catch (err) {
        console.error("❌ 재능 요약 조회 실패:", err);
      }
    }

    fetchSummary();
  }, [isLoggedIn]);

  // 마이페이지 접근 경로 처리
  useEffect(() => {
    if (location.pathname === "/go-profile") {
      if (isLoggedIn) navigate("/mypage-user");
      else navigate("/login");
    }
  }, [location.pathname, isLoggedIn, navigate]);

  // 재능 카드 클릭
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

  // 매칭 시작 버튼
  const canMatch = teachRegistered && learnRegistered;

  const handleMatch = async () => {
    if (!canMatch) {
      openPopup("두 재능을 모두 등록해야 매칭이 가능합니다.");
      return;
    }

    if (matchStatus === "normal" || matchStatus === "stopped" || matchStatus === "waiting") {
      try {
        const data = await startMatching();
        console.log("매칭 시작 응답:", data);

        if (data.match_id) {
           openPopup("매칭 확인 페이지로 이동합니다. (테스트 모드)");
           navigate("/exchange", { state: { matchId: data.match_id } });
        } else {
           openPopup(data.message);
        }

      } catch (e) {
        console.error(e);
        openPopup("매칭 신청 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <Header
        hasNotification={hasNotification}
        onMyPage={() => {
          if (isLoggedIn) navigate("/mypage-user", { state: { user } });
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
            talent={summary?.teach ?? null}
            onClick={() => handleTalentClick("teach", teachRegistered)}
          />

          <TalentCard
            type="learn"
            isRegistered={learnRegistered}
            talent={summary?.learn ?? null}
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
