import { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";

import { HeroSlider } from "../components/anime/HeroSlider";
import { MediaGrid } from "../components/anime/MediaGrid";
import { CharacterGrid } from "../components/anime/CharacterGrid";
import { RankList } from "../components/anime/RankList";
import { Section } from "../components/ui/Section";
import { LoadingScreen } from "../components/ui/LoadingScreen";

import {
  useOngoingManga,
  usePopularAnime,
  usePopularManga,
  useSeasonalAnime,
  useTopAnime,
  useTopCharacters,
  useTopManga,
  useUpcomingAnime,
} from "../hooks/useAnimeData";

export function Dashboard() {
  const topAnime = useTopAnime();
  const popularAnime = usePopularAnime();
  const seasonalAnime = useSeasonalAnime();
  const upcomingAnime = useUpcomingAnime();
  const topManga = useTopManga();
  const popularManga = usePopularManga();
  const ongoingManga = useOngoingManga();
  const topCharacters = useTopCharacters();

  const [booting, setBooting] = useState(true);
  const ready = topAnime.data !== null || topAnime.error !== null;
  useEffect(() => {
    if (ready) {
      const t = setTimeout(() => setBooting(false), 400);
      return () => clearTimeout(t);
    }
  }, [ready]);

  const heroItems = (topAnime.data ?? []).slice(0, 5);

  return (
    <>
      {booting && <LoadingScreen fadingOut={ready} />}

      {heroItems.length > 0 && <HeroSlider items={heroItems} />}

      <div className={styles.grid}>
        <div className={styles.mainColumn}>
          <div id="anime-section">
            <div id="top" />
            <Section icon="fa-broadcast-tower" title="CURRENTLY AIRING">
              <MediaGrid state={seasonalAnime} type="anime" />
            </Section>

            <Section icon="fa-star" title="TOP RATED ANIME">
              <MediaGrid state={topAnime} type="anime" />
            </Section>

            <Section icon="fa-snowflake" title="THIS SEASON">
              <MediaGrid state={seasonalAnime} type="anime" />
            </Section>

            <Section icon="fa-clock" title="UPCOMING ANIME">
              <MediaGrid state={upcomingAnime} type="anime" />
            </Section>

            <Section icon="fa-fire" title="MOST POPULAR">
              <MediaGrid state={popularAnime} type="anime" />
            </Section>
          </div>

          <div id="manga-section">
            <Section icon="fa-award" title="TOP RATED MANGA">
              <MediaGrid state={topManga} type="manga" />
            </Section>

            <Section icon="fa-heart" title="MOST POPULAR MANGA">
              <MediaGrid state={popularManga} type="manga" />
            </Section>

            <Section icon="fa-pen-nib" title="ONGOING MANGA">
              <MediaGrid state={ongoingManga} type="manga" />
            </Section>
          </div>

          <div id="character-section">
            <Section icon="fa-user-tag" title="MOST FAVORITED CHARACTERS">
              <CharacterGrid state={topCharacters} />
            </Section>
          </div>
        </div>

        <aside className={styles.sideColumn}>
          <Section icon="fa-trophy" title="GLOBAL TOP ANIME" compact>
            <RankList state={topAnime} type="anime" />
          </Section>

          <Section icon="fa-book" title="GLOBAL TOP MANGA" compact>
            <RankList state={topManga} type="manga" />
          </Section>

          <Section icon="fa-users" title="TOP CHARACTERS" compact>
            <RankList state={topCharacters} type="characters" />
          </Section>
        </aside>
      </div>
    </>
  );
}
