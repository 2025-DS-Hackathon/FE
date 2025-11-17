import React, { useEffect, useState } from "react";
import styles from "../styles/Mypage.module.css";

function HeaderBar() {
  return (
    <div className={styles.headerBar}>
      <span className={styles.backArrow} onClick={() => window.history.back()}>
        &lt;
      </span>
      <span className={styles.headerTitle}>내 정보</span>
    </div>
  );
}

function Mypage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/user/me")
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div>로딩중...</div>;

  /* 로그인 X */
  if (!user || !user.isLoggedIn) {
    return (
      <div className={styles.mobileWrapper}>
        <HeaderBar />

        <div className={styles.container}>
          <div className={styles.notLoginText}>
            로그인 후 <br /> 서비스 이용 가능합니다
          </div>

          <button className={styles.loginButton} onClick={() => window.location.href = "/login"}>
            로그인
          </button>

          <button className={styles.menuButton}>
            ⚙ 개인정보 및 이용약관 확인
          </button>
        </div>
      </div>
    );
  }

}
export default Mypage;
