import { NextResponse, type NextRequest } from "next/server";
import { isAuthorized, readGateConfig } from "@/lib/access-gate";

/**
 * Staging access gate. Does nothing unless STAGING_ACCESS_PASSWORD is set,
 * in which case every request (pages, assets, PDFs, robots.txt) needs the
 * shared username and password.
 */
export function proxy(request: NextRequest) {
  const config = readGateConfig();
  if (isAuthorized(request.headers.get("authorization"), config)) return NextResponse.next();
  return new NextResponse("Access to this EmotiveArc preview is restricted.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="EmotiveArc preview", charset="UTF-8"',
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}

export const config = {
  matcher: "/:path*",
};
