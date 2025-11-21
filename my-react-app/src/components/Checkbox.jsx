import styles from "../styles/Checkbox.module.css";

export default function Checkbox({ checked, onChange, label }) {
  return (
    <label className={styles.checkboxWrapper}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={styles.checkboxInput}
      />

      <span className={styles.customBox}></span>

      <span className={styles.checkboxLabel}>{label}</span>
    </label>
  );
}
