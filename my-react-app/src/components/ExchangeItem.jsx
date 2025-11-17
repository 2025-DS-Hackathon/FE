
import React from 'react';
import styles from '../styles/ExchangeItem.module.css'; 
import DropdownIcon from '../assets/icon/left.png';

const ExchangeItem = ({ title, category, content, isPartner = false }) => {
  const containerClass = isPartner 
    ? `${styles.itemContainer} ${styles.isPartner}`
    : `${styles.itemContainer} ${styles.isMine}`;
    
  const tagClass = isPartner 
    ? `${styles.categoryTag} ${styles.isPartner}`
    : `${styles.categoryTag} ${styles.isMine}`;

  return (
    <div className={containerClass}>
      <div className={styles.itemTitle}>{title}</div>
      <div className={styles.contentWrapper}>
        <span className={tagClass}>{category}</span>
        <span className={styles.exchangeContent}>{content}</span>
        <img 
          src={DropdownIcon} 
          alt="Dropdown arrow" 
          className={styles.dropdownIcon} 
        />
      </div>
    </div>
  );
};

export default ExchangeItem;