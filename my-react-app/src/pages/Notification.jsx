import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Notification.module.css";

const DUMMY_NOTIFICATIONS = [
  {
    id: 1,
    date: "25.11.15",
    type: "message_new",
    title: "새 쪽지가 있습니다. 지금 확인해보세요!",
    body: "",
    isRead: false,
  },
  {
    id: 2,
    date: "25.11.14",
    type: "match_success",
    title: "매칭이 성공 되었습니다.",
    body: "지금 바로 쪽지함을 통해 재능을 공유해보세요!",
    isRead: false,
  },
  {
    id: 3,
    date: "25.11.14",
    type: "match_ready",
    title: "고정은님과 재능 교환 가능성이 생겼습니다!",
    body: "",
    isRead: false,
  },
  {
    id: 4,
    date: "25.11.13",
    type: "match_cancel",
    title: "매칭이 취소되었습니다.",
    body: "다시 재능 공유를 신청해보세요.",
    isRead: false,
  },
  {
    id: 5,
    date: "25.11.12",
    type: "match_fail",
    title: "매칭 대기시간(24시간)이 만료되어",
    body: "매칭에 실패했습니다.",
    isRead: false,
  },
];

export default function Notification() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(DUMMY_NOTIFICATIONS);

 
  useEffect(() => {
    setNotifications((prev) =>
      prev.map((n) => ({
        ...n,
        isRead: true,
      }))
    );

   
    
  }, []);

  const handleBack = () => {
    
    navigate("/main");
  };

  const handleClickNotification = (item) => {
    if (item.type === "message_new" || item.type === "match_success") {
      navigate("/messages"); 
    } else if (item.type === "match_ready") {
      navigate("/match-agree"); 
    } else if (item.type === "match_fail" || item.type === "match_cancel") {
      
      return;
    }
  };

  return (
    <div className={styles.wrapper}>
      <header className={styles.topBar}>
        <span className={styles.backArrow} onClick={handleBack}>
          &lt;
        </span>
        <span className={styles.title}>알림함</span>
      </header>

      <main className={styles.listWrapper}>
        {notifications.map((item) => (
          <div
            key={item.id}
            className={`${styles.item} ${
              item.isRead ? styles.read : styles.unread
            }`}
            onClick={() => handleClickNotification(item)}
          >
            <div className={styles.rowTop}>
              <span className={styles.date}>{item.date}</span>
             
              <span className={styles.arrow}>&gt;</span>
            </div>

            <div className={styles.message}>
              <p className={styles.mainText}>{item.title}</p>
              {item.body && <p className={styles.subText}>{item.body}</p>}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}