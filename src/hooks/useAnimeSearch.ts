import { useAsync } from "./useAsync";
import { searchAnime } from "../services/animeService";
import type { MediaItem } from "../types/jikan";

const RESULT_LIMIT = 24;

export function useAnimeSearch(query: string) {
  return useAsync<MediaItem[]>(
    () => (query ? searchAnime(query, RESULT_LIMIT) : Promise.resolve([])),
    [query],
  );
}
