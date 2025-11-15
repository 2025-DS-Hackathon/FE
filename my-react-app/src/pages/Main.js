import React, { useState } from 'react';
import Header from '../components/Header';
import TalentCard from '../components/TalentCard';
import MatchButton from '../components/MatchButton';
import Popup from '../components/Popup';
import { Body2, Headline1 } from '../components/Typography/Typography';
import styles from '../styles/Main.module.css';



function Main() {
  const [isLoggedIn] = useState(true);
  const [learnRegistered, setLearnRegistered] = useState(false);
  const [teachRegistered, setTeachRegistered] = useState(false);
  const [hasNotification, setHasNotification] = useState(true);

  const canMatch = learnRegistered && teachRegistered;

  const handleMatch = () => {
    if (!canMatch) return alert('두 재능을 모두 등록해야 매칭이 가능합니다.');
    alert('신청 완료! 매칭이 확정되면 알림으로 알려드릴게요.');
  };

  const handleTalentClick = (type, registered) => {
    if (!isLoggedIn) return alert('로그인이 필요합니다!');
    if (!registered) return alert('재능 등록 페이지로 이동');
    const edit = window.confirm('등록된 재능을 수정하시겠습니까?');
    if (edit) alert('등록 수정 페이지로 이동');
  };

  return (
    <div className={styles.container}>
      <Header />

   <main className={styles.main}>
    <Headline1>
      <br />Give & Take,<br />세대를 넘어 재능을 교환해 보세요!<br />
    </Headline1>

    {/* 카드 묶음 */}
    <div className={styles.cardGroup}>
      <TalentCard
        type="teach"
        isRegistered={teachRegistered}
        onClick={() => handleTalentClick('teach', teachRegistered)}
      />
      <TalentCard
        type="learn"
        isRegistered={learnRegistered}
        onClick={() => handleTalentClick('learn', learnRegistered)}
      />
    </div>

    {/* 버튼 */}
    <div className={styles.buttonWrapper}>
      <MatchButton onClick={handleMatch} disabled={!canMatch} />
    </div>

    <Body2 className={styles.exchangeStats}>
      지금까지 총 519쌍이 재능을 교환했습니다! 🤝
    </Body2>
</main>
    </div>
  );
}

export default Main;
