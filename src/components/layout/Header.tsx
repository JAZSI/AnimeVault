import { useEffect, useState, type FormEvent } from "react";
import styles from "./Header.module.css";
import { useModal } from "../../context/ModalContext";
import { useToast } from "../../context/ToastContext";
import { useSearch } from "../../context/SearchContext";
import { getRandomAnime } from "../../services/animeService";

export function Header() {
  const { openModal } = useModal();
  const { showToast } = useToast();
  const { query: activeQuery, search, clear } = useSearch();
  const [input, setInput] = useState(activeQuery);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setInput(activeQuery);
  }, [activeQuery]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const q = input.trim();
    if (q) {
      search(q);
    } else {
      clear();
    }
  };

  const handleRandom = async () => {
    if (busy) return;
    setBusy(true);
    showToast("Finding something for you...", "fa-random");
    try {
      const anime = await getRandomAnime();
      if (anime) openModal(anime.mal_id, "anime");
    } catch {
      showToast("Could not load a random anime", "fa-triangle-exclamation");
    } finally {
      setBusy(false);
    }
  };

  return (
    <header className={styles.header}>
      <form className={styles.search} onSubmit={handleSearch} role="search">
        <i className="fas fa-search" />
        <input
          type="search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search anime..."
          autoComplete="off"
          aria-label="Search anime"
        />
      </form>
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.iconBtn}
          onClick={handleRandom}
          aria-label="Random anime"
        >
          <i className="fas fa-random" />
        </button>
      </div>
    </header>
  );
}
