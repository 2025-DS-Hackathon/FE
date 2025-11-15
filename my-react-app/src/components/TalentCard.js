import React from "react";
import styles from "../styles/TalentCard.module.css";
import { Body2 } from "./Typography/Typography";

const TalentCard = ({ type, isRegistered, onClick }) => {
  const isTeach = type === "teach";

  return (
    <div className={styles.cardWrapper}>
      {/* 상단 컬러 헤더 */}
      <div className={`${styles.header} ${isTeach ? styles.blue : styles.orange}`}>
        {isTeach ? "내가 배움을 줄 수 있는 것" : "내가 배움을 받고 싶은 것"}
      </div>

      {/* 아래 흰 배경 박스 */}
      <div
        className={`${styles.cardBox} ${
          isTeach ? styles.blueBorder : styles.orangeBorder
        }`}
        onClick={onClick}
      >
        {!isRegistered ? (
          <>
            <div
              className={`${styles.plus} ${
                isTeach ? styles.blueText : styles.orangeText
              }`}
            >
              +
            </div>
            <Body2
              className={`${styles.placeholder} ${
                isTeach ? styles.blueText : styles.orangeText
              }`}
            >
              {isTeach
                ? "내가 가르치고 싶은 재능을 등록해주세요"
                : "내가 배우고 싶은 재능을 등록해주세요"}
            </Body2>
          </>
        ) : (
          <>
            <Body2>카테고리명</Body2>
            <Body2>재능명</Body2>
            <Body2>짧은 설명</Body2>
            <Body2>#태그</Body2>
          </>
        )}
      </div>
    </div>
  );
};

export default TalentCard;
