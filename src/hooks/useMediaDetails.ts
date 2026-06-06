import { useAsync } from "./useAsync";
import { getMediaDetails } from "../services/animeService";
import type { MediaItem, MediaType } from "../types/jikan";

export function useMediaDetails(target: { id: number; type: MediaType } | null) {
  return useAsync<MediaItem | null>(
    () =>
      target ? getMediaDetails(target.type, target.id) : Promise.resolve(null),
    [target?.id, target?.type],
  );
}
