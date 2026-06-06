import styles from "./StateMessage.module.css";

interface StateMessageProps {
  icon: string;
  message: string;
  onRetry?: () => void;
}

export function StateMessage({ icon, message, onRetry }: StateMessageProps) {
  return (
    <div className={styles.wrap}>
      <i className={`fas ${icon} ${styles.icon}`} />
      <span className={styles.text}>{message}</span>
      {onRetry && (
        <button type="button" className={styles.retry} onClick={onRetry}>
          <i className="fas fa-rotate-right" /> RETRY
        </button>
      )}
    </div>
  );
}
