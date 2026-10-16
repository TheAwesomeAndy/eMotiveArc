import { createHash, timingSafeEqual } from "node:crypto";

/**
 * Optional HTTP Basic Auth gate for staging previews. Host-independent and
 * free. Active only when STAGING_ACCESS_PASSWORD is set. `noindex` keeps a
 * preview out of search results, but only this gate actually restricts who
 * can open it.
 */
export type GateConfig = { user: string; password: string } | null;

export function readGateConfig(env: Record<string, string | undefined> = process.env): GateConfig {
  const password = env.STAGING_ACCESS_PASSWORD?.trim();
  if (!password) return null;
  return { user: env.STAGING_ACCESS_USER?.trim() || "preview", password };
}

const digest = (s: string) => createHash("sha256").update(s, "utf8").digest();

/** Constant-time comparison that doesn't leak length. */
function safeEqual(a: string, b: string): boolean {
  return timingSafeEqual(digest(a), digest(b));
}

/** True when the Authorization header carries the configured credentials. */
export function isAuthorized(header: string | null, config: GateConfig): boolean {
  if (!config) return true;
  if (!header?.startsWith("Basic ")) return false;
  let decoded: string;
  try {
    decoded = Buffer.from(header.slice(6), "base64").toString("utf8");
  } catch {
    return false;
  }
  const sep = decoded.indexOf(":");
  if (sep < 0) return false;
  const userOk = safeEqual(decoded.slice(0, sep), config.user);
  const passOk = safeEqual(decoded.slice(sep + 1), config.password);
  return userOk && passOk;
}
