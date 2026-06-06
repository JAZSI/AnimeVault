import { useEffect, useState } from "react";
import styles from "./HeroSlider.module.css";
import { useModal } from "../../context/ModalContext";
import { getImageUrl } from "../../services/animeService";
import type { MediaItem } from "../../types/jikan";

interface HeroSliderProps {
  items: MediaItem[];
  interval?: number;
}

function truncate(text: string | null | undefined, max = 200): string {
  if (!text) return "";
  const t = text.trim();
  return t.length > max ? `${t.slice(0, max).trimEnd()}…` : t;
}

export function HeroSlider({ items, interval = 6000 }: HeroSliderProps) {
  const { openModal } = useModal();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % items.length),
      interval,
    );
    return () => clearInterval(timer);
  }, [items.length, interval]);

  return (
    <div className={styles.slider}>
      {items.map((anime, i) => (
        <div
          key={anime.mal_id}
          className={`${styles.slide} ${i === index ? styles.active : ""}`}
        >
          <img className={styles.art} src={getImageUrl(anime)} alt="" />
          <div className={styles.content}>
            <div className={styles.inner}>
              <div className={styles.tag}>Featured</div>
              <h2 className={styles.title}>{anime.title}</h2>

              {anime.genres && anime.genres.length > 0 && (
                <div className={styles.genres}>
                  {anime.genres.slice(0, 4).map((g) => (
                    <span key={g.mal_id} className={styles.genre}>
                      {g.name}
                    </span>
                  ))}
                </div>
              )}

              <div className={styles.stats}>
                <span>
                  <i className="fas fa-star" /> {anime.score ?? "N/A"}
                </span>
                <span>
                  <i className="fas fa-tv" /> {anime.type || "TV"}
                </span>
                {anime.episodes != null && (
                  <span>
                    <i className="fas fa-film" /> {anime.episodes} eps
                  </span>
                )}
                {anime.year != null && (
                  <span>
                    <i className="fas fa-calendar" /> {anime.year}
                  </span>
                )}
                {anime.status && (
                  <span>
                    <i className="fas fa-signal" /> {anime.status}
                  </span>
                )}
                <span>
                  <i className="fas fa-users" />{" "}
                  {anime.members?.toLocaleString() ?? "0"} members
                </span>
              </div>

              {anime.synopsis && (
                <p className={styles.synopsis}>{truncate(anime.synopsis)}</p>
              )}

              <button
                type="button"
                className={styles.cta}
                onClick={() => openModal(anime.mal_id, "anime")}
              >
                <i className="fas fa-circle-info" /> View Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
