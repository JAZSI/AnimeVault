import { useEffect, useState } from "react";
import styles from "./Sidebar.module.css";
import { useSearch } from "../../context/SearchContext";
import logo from "../../assets/logo.svg";

interface NavLink {
  id: string;
  label: string;
  icon: string;
}

const LINKS: NavLink[] = [
  { id: "top", label: "Dashboard", icon: "fa-home" },
  { id: "anime-section", label: "Anime", icon: "fa-play" },
  { id: "manga-section", label: "Manga", icon: "fa-book" },
  { id: "character-section", label: "Characters", icon: "fa-users" },
];

export function Sidebar() {
  const { query, clear } = useSearch();
  const [active, setActive] = useState(LINKS[0]!.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    for (const link of LINKS) {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [query]);

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setActive(id);
    const scroll = () =>
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    if (query) {
      clear();
      setTimeout(scroll, 60);
    } else {
      scroll();
    }
  };

  return (
    <aside className={styles.sidebar}>
      <a href="#top" className={styles.logo} onClick={(e) => handleClick(e, "top")}>
        <div className={styles.logoBox}>
          <img src={logo} alt="AnimeVault" className={styles.logoImg} />
        </div>
        <span className={styles.logoText}>VAULT</span>
      </a>
      <nav className={styles.nav}>
        {LINKS.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className={`${styles.navItem} ${active === link.id ? styles.active : ""}`}
            onClick={(e) => handleClick(e, link.id)}
          >
            <i className={`fas ${link.icon}`} />
            <span>{link.label}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
}
