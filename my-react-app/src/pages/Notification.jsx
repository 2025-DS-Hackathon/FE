// src/pages/Notification.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Notification.module.css";
import { getNotifications } from "../services/notifications";
import Back from "../components/Back";

export default function Notification() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    getNotifications().then((data) => {
      const mapped = data.map((item) => ({
        id: item.notif_id,
        title: item.content,
        date: item.timestamp.split("T")[0],
        isRead: item.is_read,
        type: item.type,
        link: item.link_path,
      }));
      setNotifications(mapped);
    });
  }, []);

  const handleBack = () => {
    navigate("/");
  };

  const handleClickNotification = (item) => {
    if (item.type === "NEW_MESSAGE" || item.type === "MATCH_SUCCESS") {
      navigate("/messages");
    } else if (item.type === "MATCH_FOUND") {
      navigate("/match-agree");
    } else {
      return;
    }
  };

  return (
    <div className={styles.wrapper}>
      <Back title="알림함" onBack={handleBack} />

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
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
