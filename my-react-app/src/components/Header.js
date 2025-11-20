import React from 'react';
import { Headline1 } from './Typography/Typography';
import styles from '../styles/Header.module.css';
import MyPageIcon from '../assets/icon/user.png'; 
import NotificationIcon from '../assets/icon/bell.png';

const Header = ({ hasNotification, onMyPage, onNotification }) => {
  return (
    <header className={styles.header}>
      {/* 마이페이지 아이콘 */}
      <button className={styles.iconBtn} onClick={onMyPage}>
        <img src={MyPageIcon} alt="My Page" className={styles.iconImg} />
      </button>

      {/* 서비스명 */}
      <Headline1 className={styles.title}>Project Name</Headline1>

      {/* 알림 아이콘 */}
      <button className={styles.iconBtn} onClick={onNotification}>
        <img src={NotificationIcon} alt="Notifications" className={styles.iconImg} />
        {hasNotification && <span className={styles.dot}></span>}
      </button>
    </header>
  );
};

export default Header;
