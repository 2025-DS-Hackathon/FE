import React from "react";
import styles from "../styles/TalentCard.module.css";
import { Body2 } from "./Typography/Typography";

const TalentCard = ({ type, isRegistered, talent, onClick }) => {
  const isTeach = type === "teach";


  const textStyle = isTeach ? styles.blueText : styles.orangeText;

  return (
    <div className={styles.cardWrapper}>

      <div className={`${styles.header} ${isTeach ? styles.blue : styles.orange}`}>
        {isTeach ? "내가 배움을 줄 수 있는 것" : "내가 배움을 받고 싶은 것"}
      </div>

      <div
        className={`${styles.cardBox} ${
          isTeach ? styles.blueBorder : styles.orangeBorder
        }`}
        onClick={onClick}
      >
        {!isRegistered || !talent ? (

          <>
            <div className={`${styles.plus} ${textStyle}`}>
              +
            </div>
            <Body2 className={`${styles.placeholder} ${textStyle}`}>
              {isTeach
                ? "내가 가르치고 싶은 재능을 등록해주세요"
                : "내가 배우고 싶은 재능을 등록해주세요"}
            </Body2>
          </>
        ) : (
          <div className={styles.content} style={{ padding: '10px', width: '100%' }}>
            <Body2 className={textStyle} style={{ fontWeight: 'bold', marginBottom: '4px' }}>
              {talent.category}
            </Body2>

            <div style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '6px' }}>
              {talent.title}
            </div>

            <Body2 style={{ marginBottom: '8px', color: '#555' }}>
                {talent.description}
            </Body2>

            <div style={{ fontSize: '0.85rem', color: '#888' }}>
              {talent.tags && talent.tags.split(',').map((tag, idx) => (
                 <span key={idx} style={{ marginRight: '6px' }}>#{tag.trim()}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TalentCard;