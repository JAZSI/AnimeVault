import styles from "./LoadingScreen.module.css";
import { Spinner } from "./Spinner";
import logo from "../../assets/logo.svg";

export function LoadingScreen({ fadingOut }: { fadingOut: boolean }) {
  return (
    <div className={`${styles.screen} ${fadingOut ? styles.hidden : ""}`}>
      <div className={styles.logoBox}>
        <img src={logo} alt="AnimeVault" className={styles.logoImg} />
      </div>
      <Spinner />
      <div className={styles.label}>Loading AnimeVault...</div>
    </div>
  );
}
