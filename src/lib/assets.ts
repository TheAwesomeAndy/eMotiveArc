import "server-only";
import { existsSync } from "node:fs";
import path from "node:path";

/**
 * True when a file exists under /public. Evaluated at build time, so dropping
 * a PDF into /public/sample/ and rebuilding is enough to activate its link.
 */
export function publicAssetExists(publicPath: string): boolean {
  const relative = publicPath.replace(/^\/+/, "");
  return existsSync(path.join(process.cwd(), "public", relative));
}
