import { useAsync } from "./useAsync";
import {
  getOngoingManga,
  getPopularAnime,
  getPopularManga,
  getSeasonNow,
  getTopAnime,
  getTopCharacters,
  getTopManga,
  getUpcomingAnime,
} from "../services/animeService";

export const useTopAnime = (limit?: number) =>
  useAsync(() => getTopAnime(limit), [limit]);

export const usePopularAnime = (limit?: number) =>
  useAsync(() => getPopularAnime(limit), [limit]);

export const useSeasonalAnime = (limit?: number) =>
  useAsync(() => getSeasonNow(limit), [limit]);

export const useUpcomingAnime = (limit?: number) =>
  useAsync(() => getUpcomingAnime(limit), [limit]);

export const useTopManga = (limit?: number) =>
  useAsync(() => getTopManga(limit), [limit]);

export const usePopularManga = (limit?: number) =>
  useAsync(() => getPopularManga(limit), [limit]);

export const useOngoingManga = (limit?: number) =>
  useAsync(() => getOngoingManga(limit), [limit]);

export const useTopCharacters = (limit?: number) =>
  useAsync(() => getTopCharacters(limit), [limit]);
