import styles from "./Spinner.module.css";

export function Spinner() {
  return <div className={styles.loader} aria-label="Loading" role="status" />;
}
