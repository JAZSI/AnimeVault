const BASE_URL = "https://api.jikan.moe/v4";

const THROTTLE_MS = 400;
const RATE_LIMIT_BACKOFF_MS = 2000;
const DEFAULT_RETRIES = 2;

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

let queue: Promise<unknown> = Promise.resolve();

function enqueue<T>(task: () => Promise<T>): Promise<T> {
  const run = queue.then(task, task);
  queue = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

export class JikanError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = "JikanError";
  }
}

async function request<T>(path: string, retries: number): Promise<T> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(`${BASE_URL}${path}`);

      if (res.status === 429) {
        await sleep(RATE_LIMIT_BACKOFF_MS);
        continue;
      }
      if (!res.ok) {
        throw new JikanError(`Request failed: ${res.status}`, res.status);
      }

      const json = (await res.json()) as T;
      await sleep(THROTTLE_MS);
      return json;
    } catch (err) {
      if (attempt === retries) {
        if (err instanceof JikanError) throw err;
        throw new JikanError(
          err instanceof Error ? err.message : "Network error",
        );
      }
      await sleep(1000);
    }
  }
  throw new JikanError("Exhausted retries");
}

export function jikanFetch<T>(
  path: string,
  retries = DEFAULT_RETRIES,
): Promise<T> {
  return enqueue(() => request<T>(path, retries));
}
