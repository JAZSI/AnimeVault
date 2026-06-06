import styles from "./SearchResults.module.css";
import { MediaGrid } from "../components/anime/MediaGrid";
import { useSearch } from "../context/SearchContext";
import { useAnimeSearch } from "../hooks/useAnimeSearch";

export function SearchResults() {
  const { query, clear } = useSearch();
  const state = useAnimeSearch(query);
  const count = state.data?.length ?? 0;

  return (
    <div>
      <div className={styles.head}>
        <div>
          <h1 className={styles.title}>
            Results for <span className={styles.query}>“{query}”</span>
          </h1>
          {!state.loading && !state.error && (
            <div className={styles.count}>
              {count} {count === 1 ? "title" : "titles"} found
            </div>
          )}
        </div>
        <button type="button" className={styles.clear} onClick={clear}>
          <i className="fas fa-arrow-left" /> Back to dashboard
        </button>
      </div>

      <MediaGrid state={state} type="anime" skeletonCount={18} />
    </div>
  );
}
