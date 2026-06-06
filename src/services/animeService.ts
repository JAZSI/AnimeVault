import { jikanFetch } from "./jikanApi";
import type {
  JikanItemResponse,
  JikanListResponse,
  MediaItem,
  MediaType,
} from "../types/jikan";

const fetchList = (path: string) =>
  jikanFetch<JikanListResponse>(path).then((r) => r.data ?? []);

// --- Anime ---------------------------------------------------------------

export const getTopAnime = (limit = 25) =>
  fetchList(`/top/anime?limit=${limit}`);

export const getPopularAnime = (limit = 25) =>
  fetchList(`/top/anime?limit=${limit}&filter=bypopularity`);

export const getSeasonNow = (limit = 25) =>
  fetchList(`/seasons/now?limit=${limit}`);

export const getUpcomingAnime = (limit = 25) =>
  fetchList(`/seasons/upcoming?limit=${limit}`);

// --- Manga ---------------------------------------------------------------

export const getTopManga = (limit = 25) =>
  fetchList(`/top/manga?limit=${limit}`);

export const getPopularManga = (limit = 25) =>
  fetchList(`/top/manga?limit=${limit}&filter=bypopularity`);

export const getOngoingManga = (limit = 25) =>
  fetchList(`/manga?limit=${limit}&status=publishing&order_by=score&sort=desc`);

// --- Characters ----------------------------------------------------------

export const getTopCharacters = (limit = 25) =>
  fetchList(`/top/characters?limit=${limit}`);

// --- Details / misc ------------------------------------------------------

export const getMediaDetails = (type: MediaType, id: number) =>
  jikanFetch<JikanItemResponse>(`/${type}/${id}`).then((r) => r.data);

export const searchAnime = (query: string, limit = 1) =>
  fetchList(`/anime?q=${encodeURIComponent(query)}&limit=${limit}`);

export const getRandomAnime = () =>
  jikanFetch<JikanItemResponse>(`/random/anime`).then((r) => r.data);

// --- Normalization helpers ----------------------------------------------

/** Pick the best available poster/banner URL from a Jikan image object. */
export function getImageUrl(item: Pick<MediaItem, "images">): string {
  const img = item.images;
  return (
    img?.jpg?.large_image_url ||
    img?.webp?.large_image_url ||
    img?.jpg?.image_url ||
    ""
  );
}

/** Small thumbnail URL, falling back to the large one. */
export function getThumbUrl(item: Pick<MediaItem, "images">): string {
  return item.images?.jpg?.image_url || getImageUrl(item);
}

/** Display title for either media (`title`) or characters (`name`). */
export function getDisplayTitle(item: MediaItem): string {
  return item.title || item.name || "Unknown";
}

/** Formatted score string, e.g. "8.74" or "N/A". */
export function formatScore(score?: number | null): string {
  return typeof score === "number" ? score.toFixed(2) : "N/A";
}
