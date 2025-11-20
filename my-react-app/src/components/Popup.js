import React from 'react';
import styles from '../styles/Popup.module.css';

function Popup({ message, onClose }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <p>{message}</p>
        <button onClick={onClose}>확인</button>
      </div>
    </div>
  );
}

export default Popup;
