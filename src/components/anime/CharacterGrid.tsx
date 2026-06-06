import styles from "./CharacterGrid.module.css";
import { Skeleton } from "../ui/Skeleton";
import { StateMessage } from "../ui/StateMessage";
import { useModal } from "../../context/ModalContext";
import { getThumbUrl } from "../../services/animeService";
import type { AsyncState } from "../../hooks/useAsync";
import type { MediaItem } from "../../types/jikan";

interface CharacterGridProps {
  state: AsyncState<MediaItem[]>;
  skeletonCount?: number;
}

export function CharacterGrid({ state, skeletonCount = 10 }: CharacterGridProps) {
  const { openModal } = useModal();
  const { data, loading, error, retry } = state;

  if (loading && !data) {
    return (
      <div className={styles.grid}>
        <Skeleton count={skeletonCount} ratio="1 / 1.2" />
      </div>
    );
  }

  if (error) {
    return (
      <StateMessage icon="fa-triangle-exclamation" message="Failed to load" onRetry={retry} />
    );
  }

  if (!data || data.length === 0) {
    return <StateMessage icon="fa-ghost" message="Nothing here yet" />;
  }

  return (
    <div className={styles.grid}>
      {data.map((char) => (
        <div
          key={char.mal_id}
          className={styles.card}
          onClick={() => openModal(char.mal_id, "characters")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && openModal(char.mal_id, "characters")}
        >
          <img className={styles.img} src={getThumbUrl(char)} alt="" loading="lazy" />
          <div className={styles.overlay}>
            <div className={styles.name}>{char.name}</div>
            <div className={styles.favs}>
              <i className="fas fa-heart" /> {(char.favorites ?? 0).toLocaleString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
