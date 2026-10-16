import "server-only";

/**
 * Small in-memory sliding-window limiter. On serverless hosts each instance
 * keeps its own memory, so treat this as a speed bump for scripted abuse,
 * not a guarantee. Pair it with the honeypot and timing checks.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;
const hits = new Map<string, number[]>();

export function rateLimited(key: string, now: number): boolean {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);

  if (hits.size > 5000) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }
  return recent.length > MAX_HITS;
}
