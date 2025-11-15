// src/components/MatchButton.js
import React from 'react';
import styles from '../styles/MatchButton.module.css';

const MatchButton = ({ disabled, onClick }) => {
  return (
    <button
      className={`${styles.button} ${disabled ? styles.inactive : styles.active}`}
      disabled={disabled}
      onClick={onClick}
    >
      재능 공유 매칭 신청
    </button>
  );
};

export default MatchButton;
