import React from 'react';
import { Headline1 } from './Typography/Typography';
import styles from '../styles/Header.module.css';
import MyPageIcon from '../assets/icon/user.png'; 
import NotificationIcon from '../assets/icon/bell.png';

const Header = ({ hasNotification, onMyPage, onNotification }) => {
  return (
    <header className={styles.header}>
      <button className={styles.iconBtn} onClick={onMyPage}>
        <img src={MyPageIcon} alt="My Page" className={styles.iconImg} />
      </button>

      <Headline1 className={styles.title}>GENBRIDGE</Headline1>

      <button className={styles.iconBtn} onClick={onNotification}>
        <img src={NotificationIcon} alt="Notifications" className={styles.iconImg} />
        {hasNotification && <span className={styles.dot}></span>}
      </button>
    </header>
  );
};

export default Header;
