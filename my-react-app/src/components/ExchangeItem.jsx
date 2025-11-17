import React, { useState } from 'react';
import styles from '../styles/ExchangeItem.module.css'; 
import DropdownIcon from '../assets/icon/left.png';

const ExchangeItem = ({ itemTitle, category, isPartner = false, exchangeContent, detailContent, tags }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const containerClass = isPartner 
    ? `${styles.itemContainer} ${styles.isPartner}`
    : `${styles.itemContainer} ${styles.isMine}`;
    
  const tagClass = isPartner 
    ? `${styles.categoryTag} ${styles.isPartner}`
    : `${styles.categoryTag} ${styles.isMine}`;

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={containerClass}>
      <div className={styles.itemTitle}>{itemTitle}</div>
      <div className={styles.contentWrapper}>
        <span className={tagClass}>{category}</span>
        <span className={styles.exchangeContent}>{exchangeContent}</span>
        
        <img 
          src={DropdownIcon} 
          alt="Dropdown arrow" 
          className={styles.dropdownIcon} 
          onClick={handleToggle}
        />
      </div>

      {isExpanded && (
        <div className={styles.expandedContent}> 
          <div className={styles.detailContent}>
            {detailContent}
          </div>
          <div className={styles.tagsWrapper}>
            {tags && tags.map((tag, index) => (
              <span key={index} className={styles.tagItem}>
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExchangeItem;