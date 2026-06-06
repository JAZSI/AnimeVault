import styles from "./MediaGrid.module.css";
import { MediaCard } from "./MediaCard";
import { Skeleton } from "../ui/Skeleton";
import { StateMessage } from "../ui/StateMessage";
import type { AsyncState } from "../../hooks/useAsync";
import type { MediaItem, MediaType } from "../../types/jikan";

interface MediaGridProps {
  state: AsyncState<MediaItem[]>;
  type: Extract<MediaType, "anime" | "manga">;
  skeletonCount?: number;
}

export function MediaGrid({ state, type, skeletonCount = 12 }: MediaGridProps) {
  const { data, loading, error, retry } = state;

  if (loading && !data) {
    return (
      <div className={styles.grid}>
        <Skeleton count={skeletonCount} />
      </div>
    );
  }

  if (error) {
    return (
      <StateMessage
        icon="fa-triangle-exclamation"
        message="Failed to load"
        onRetry={retry}
      />
    );
  }

  if (!data || data.length === 0) {
    return <StateMessage icon="fa-ghost" message="Nothing here yet" />;
  }

  return (
    <div className={styles.grid}>
      {data.map((item) => (
        <MediaCard key={item.mal_id} item={item} type={type} />
      ))}
    </div>
  );
}
