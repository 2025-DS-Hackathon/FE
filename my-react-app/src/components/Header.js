import React from 'react';
import { Headline1 } from '../components/Typography/Typography';
import styles from '../styles/Header.module.css';

const Header = ({ hasNotification, onMyPage, onNotification }) => {
  return (
    <header className={styles.header}>
      {/* 마이페이지 아이콘 */}
      <button className={styles.iconBtn} onClick={onMyPage}>
        👤
      </button>

      {/* 서비스명 */}
      <Headline1 className={styles.title}>Project Name</Headline1>

      {/* 알림 아이콘 */}
      <button className={styles.iconBtn} onClick={onNotification}>
        🔔
        {hasNotification && <span className={styles.dot}></span>}
      </button>
    </header>
  );
};

export default Header;
