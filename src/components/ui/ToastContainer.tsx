import { useToast } from "../../context/ToastContext";
import styles from "./ToastContainer.module.css";

export function ToastContainer() {
  const { toasts } = useToast();

  return (
    <div className={styles.container}>
      {toasts.map((t) => (
        <div key={t.id} className={styles.toast}>
          <i className={`fas ${t.icon}`} />
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}
