import styles from "../styles/SocialButton.module.css";

export default function SocialButton({ disabled, onClick }) {
  const className = disabled
    ? styles.kakaoDisabled
    : styles.kakaoActive;

  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled}
      style={{ width: "100%" }}   // ← 강제 중앙/100% 해결
    >
      카카오톡으로 시작하기
    </button>
  );
}
