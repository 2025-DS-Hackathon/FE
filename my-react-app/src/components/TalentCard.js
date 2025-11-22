import React from "react";
import styles from "../styles/TalentCard.module.css";


const TalentCard = ({ type, isRegistered, talent, onClick }) => {
  const isTeach = type === "teach";
  const bgClass = isTeach ? styles.blue : styles.orange;
  const borderClass = isTeach ? styles.blueBorder : styles.orangeBorder;
  const textClass = isTeach ? styles.blueText : styles.orangeText;

  return (
    <div className={styles.cardWrapper}>

      <div className={`${styles.header} ${bgClass}`}>
        {isTeach ? "내가 배움을 줄 수 있는 것" : "내가 배움을 받고 싶은 것"}
      </div>

      <div
        className={`${styles.cardBox} ${borderClass}`}
        onClick={onClick}
      >
        {!isRegistered || !talent ? (
          <div className={styles.emptyContainer}>
            <div className={`${styles.plus} ${textClass}`}>+</div>
            <div className={`${styles.placeholder} ${textClass}`}>
              {isTeach
                ? "내가 가르치고 싶은 재능을 등록해주세요"
                : "내가 배우고 싶은 재능을 등록해주세요"}
            </div>
          </div>
        ) : (
          <div className={styles.contentContainer}>
            <span className={`${styles.categoryBadge} ${textClass} ${borderClass}`}>
              {talent.category}
            </span>

            <div className={styles.title}>
              {talent.title}
            </div>

            <div className={styles.description}>
              {talent.description}
            </div>

            <div className={styles.tags}>
              {talent.tags &&
                talent.tags.split(",").map((tag, idx) => (
                  <span key={idx} style={{ marginRight: "8px" }}>
                    #{tag.trim()}
                  </span>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TalentCard;