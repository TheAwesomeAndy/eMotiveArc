import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt =
  "EmotiveArc. Your AI characters remember the conversation. Do they remember what it meant?";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fontDir = join(process.cwd(), "node_modules/@fontsource");

// Read at module scope so the image is generated once, at build time.
const [serif, serifItalic, sans] = await Promise.all([
  readFile(join(fontDir, "newsreader/files/newsreader-latin-400-normal.woff")),
  readFile(join(fontDir, "newsreader/files/newsreader-latin-400-italic.woff")),
  readFile(join(fontDir, "inter/files/inter-latin-500-normal.woff")),
]);

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0c1424",
          color: "#f6f4ef",
          padding: "64px 72px",
          fontFamily: "Inter",
          position: "relative",
        }}
      >
        <svg
          width="1200"
          height="630"
          viewBox="0 0 1200 630"
          style={{ position: "absolute", top: 0, left: 0 }}
          fill="none"
        >
          <path d="M900 640 C 960 640, 950 340, 1010 320 C 1070 300, 1130 280, 1200 262" stroke="#7cc3c2" strokeWidth="4" />
          <path d="M1010 320 C 1060 390, 1120 450, 1200 466" stroke="#e8a173" strokeWidth="3" strokeDasharray="4 10" />
          <circle cx="1010" cy="320" r="13" fill="#e8a173" />
        </svg>

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="56" height="56" viewBox="0 0 40 40" fill="none">
            <path d="M5 34 C 8 23, 12 17.5, 17 16" stroke="#f6f4ef" strokeWidth="3" strokeLinecap="round" />
            <path d="M17 16 C 23.5 14, 29 10.5, 35 5" stroke="#f6f4ef" strokeWidth="3" strokeLinecap="round" />
            <path d="M17 16 C 24 17, 29.5 21, 35 27" stroke="#f6f4ef" strokeOpacity="0.4" strokeWidth="2.25" strokeLinecap="round" strokeDasharray="0.5 4.5" />
            <circle cx="17" cy="16" r="4.25" fill="#e8a173" />
            <circle cx="5" cy="34" r="2" fill="#f6f4ef" />
          </svg>
          <div style={{ display: "flex", fontFamily: "Newsreader", fontSize: 44 }}>
            Emotive<span style={{ fontStyle: "italic" }}>Arc</span>
          </div>
          <div
            style={{
              marginLeft: 18,
              fontSize: 18,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "rgba(246,244,239,0.55)",
            }}
          >
            AI Behavioral Intelligence
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 820 }}>
          <div style={{ fontFamily: "Newsreader", fontSize: 66, lineHeight: 1.05, letterSpacing: -1 }}>
            Your AI characters remember the conversation.
          </div>
          <div
            style={{
              fontFamily: "Newsreader",
              fontStyle: "italic",
              fontSize: 66,
              lineHeight: 1.05,
              color: "#7cc3c2",
              marginTop: 6,
            }}
          >
            Do they remember what it meant?
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 22, color: "rgba(246,244,239,0.7)" }}>
          Continuity audits · $750 founding-client fee · Human-reviewed
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Newsreader", data: serif, style: "normal", weight: 400 },
        { name: "Newsreader", data: serifItalic, style: "italic", weight: 400 },
        { name: "Inter", data: sans, style: "normal", weight: 500 },
      ],
    },
  );
}
