import styles from "./RankList.module.css";
import { Spinner } from "../ui/Spinner";
import { StateMessage } from "../ui/StateMessage";
import { useModal } from "../../context/ModalContext";
import { getDisplayTitle, getThumbUrl } from "../../services/animeService";
import type { AsyncState } from "../../hooks/useAsync";
import type { MediaItem, MediaType } from "../../types/jikan";

interface RankListProps {
  state: AsyncState<MediaItem[]>;
  type: MediaType;
  limit?: number;
}

export function RankList({ state, type, limit = 10 }: RankListProps) {
  const { openModal } = useModal();
  const { data, loading, error, retry } = state;

  if (loading && !data) {
    return (
      <div className={styles.center}>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <StateMessage icon="fa-triangle-exclamation" message="Failed to load" onRetry={retry} />
    );
  }

  if (!data || data.length === 0) {
    return <StateMessage icon="fa-ghost" message="No data" />;
  }

  return (
    <div className={styles.list}>
      {data.slice(0, limit).map((item, i) => (
        <div
          key={item.mal_id}
          className={styles.item}
          onClick={() => openModal(item.mal_id, type)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && openModal(item.mal_id, type)}
        >
          <div className={styles.num}>{i + 1}</div>
          <img className={styles.poster} src={getThumbUrl(item)} alt="" loading="lazy" />
          <div className={styles.info}>
            <div className={styles.title}>{getDisplayTitle(item)}</div>
            <div className={styles.meta}>
              {typeof item.score === "number"
                ? `SCORE: ${item.score}`
                : `FAVS: ${item.favorites ?? 0}`}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
