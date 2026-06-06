/**
 * Minimal typings for the subset of the Jikan v4 API that AnimeVault consumes.
 * See https://docs.api.jikan.moe/ for the full schema.
 */

export type MediaType = "anime" | "manga" | "characters";

export interface JikanImage {
  image_url?: string;
  small_image_url?: string;
  large_image_url?: string;
}

export interface JikanImages {
  jpg?: JikanImage;
  webp?: JikanImage;
}

export interface JikanBroadcast {
  day?: string | null;
  time?: string | null;
  timezone?: string | null;
}

export interface JikanGenre {
  mal_id: number;
  name: string;
}

/** A single anime / manga entry. */
export interface MediaItem {
  mal_id: number;
  title?: string;
  /** Characters use `name` instead of `title`. */
  name?: string;
  images?: JikanImages;
  score?: number | null;
  members?: number | null;
  favorites?: number | null;
  rank?: number | null;
  type?: string | null;
  episodes?: number | null;
  chapters?: number | null;
  synopsis?: string | null;
  /** Characters expose `about` rather than `synopsis`. */
  about?: string | null;
  broadcast?: JikanBroadcast | null;
  year?: number | null;
  season?: string | null;
  status?: string | null;
  rating?: string | null;
  genres?: JikanGenre[];
}

export interface JikanListResponse<T = MediaItem> {
  data: T[];
}

export interface JikanItemResponse<T = MediaItem> {
  data: T;
}
