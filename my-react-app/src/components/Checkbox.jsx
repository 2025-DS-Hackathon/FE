import styles from "../styles/Checkbox.module.css";

export default function Checkbox({ checked, onChange, label }) {
  return (
    <label className={styles.checkboxWrapper}>
      {/* 실제 체크박스 (숨김) */}
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={styles.checkboxInput}
      />

      {/* 우리가 만드는 가짜 체크박스 */}
      <span className={styles.customBox}></span>

      {/* 텍스트 */}
      <span className={styles.checkboxLabel}>{label}</span>
    </label>
  );
}
