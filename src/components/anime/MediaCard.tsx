import { memo } from "react";
import styles from "./MediaCard.module.css";
import { useModal } from "../../context/ModalContext";
import {
  formatScore,
  getDisplayTitle,
  getImageUrl,
} from "../../services/animeService";
import type { MediaItem, MediaType } from "../../types/jikan";

interface MediaCardProps {
  item: MediaItem;
  type: Extract<MediaType, "anime" | "manga">;
}

export const MediaCard = memo(function MediaCard({ item, type }: MediaCardProps) {
  const { openModal } = useModal();
  const img = getImageUrl(item);
  const count = type === "anime" ? item.episodes : item.chapters;
  const unit = type === "anime" ? "EPS" : "CH";

  return (
    <div
      className={styles.card}
      onClick={() => openModal(item.mal_id, type)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && openModal(item.mal_id, type)}
    >
      <div className={styles.posterWrap}>
        <img className={styles.poster} src={img} alt="" loading="lazy" />
        <div className={styles.score}>{formatScore(item.score)}</div>
        <div className={styles.overlay}>
          <div className={styles.title}>{getDisplayTitle(item)}</div>
          <div className={styles.meta}>
            <span>{item.type || "N/A"}</span>
            <span>
              {count ?? "?"} {unit}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});
