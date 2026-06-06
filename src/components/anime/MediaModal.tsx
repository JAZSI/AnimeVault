import { useEffect } from "react";
import styles from "./MediaModal.module.css";
import { Spinner } from "../ui/Spinner";
import { useModal } from "../../context/ModalContext";
import { useMediaDetails } from "../../hooks/useMediaDetails";
import { getDisplayTitle, getImageUrl } from "../../services/animeService";

export function MediaModal() {
  const { target, closeModal } = useModal();
  const { data: media, loading, error, retry } = useMediaDetails(target);

  const open = target !== null;

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeModal();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, closeModal]);

  const img = media ? getImageUrl(media) : "";
  const isScore = typeof media?.score === "number";

  return (
    <div
      className={`${styles.overlay} ${open ? styles.open : ""}`}
      onClick={closeModal}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={closeModal} aria-label="Close">
          <i className="fas fa-times" />
        </button>

        <div className={styles.banner}>
          {img && <img src={img} alt="" />}
          <div className={styles.bannerFade} />
        </div>

        <div className={styles.body}>
          {loading && (
            <div className={styles.center}>
              <Spinner />
            </div>
          )}

          {error && !loading && (
            <div className={styles.center}>
              <p className={styles.errorText}>Details unavailable</p>
              <button type="button" className={styles.retry} onClick={retry}>
                <i className="fas fa-rotate-right" /> RETRY
              </button>
            </div>
          )}

          {media && !loading && (
            <>
              <img className={styles.poster} src={img} alt="" />

              <div>
                <h2 className={styles.title}>{getDisplayTitle(media)}</h2>
                <div className={styles.stats}>
                  <div className={styles.stat}>
                    <span className={styles.statValue}>
                      {media.score ?? media.favorites ?? "--"}
                    </span>
                    <div className={styles.statLabel}>
                      {isScore ? "SCORE" : "FAVS"}
                    </div>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statValue}>#{media.rank ?? "--"}</span>
                    <div className={styles.statLabel}>RANK</div>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statValue}>{media.type || "N/A"}</span>
                    <div className={styles.statLabel}>TYPE</div>
                  </div>
                </div>
                <div className={styles.synopsisLabel}>Synopsis</div>
                <p className={styles.synopsis}>
                  {media.synopsis || media.about || "No record available."}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
