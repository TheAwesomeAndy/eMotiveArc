import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0c1424",
        }}
      >
        <svg width="132" height="132" viewBox="0 0 40 40" fill="none">
          <path d="M5 34 C 8 23, 12 17.5, 17 16" stroke="#f6f4ef" strokeWidth="3" strokeLinecap="round" />
          <path d="M17 16 C 23.5 14, 29 10.5, 35 5" stroke="#f6f4ef" strokeWidth="3" strokeLinecap="round" />
          <path d="M17 16 C 24 17, 29.5 21, 35 27" stroke="#f6f4ef" strokeOpacity="0.4" strokeWidth="2.25" strokeLinecap="round" strokeDasharray="0.5 4.5" />
          <circle cx="17" cy="16" r="4.25" fill="#e8a173" />
          <circle cx="5" cy="34" r="2" fill="#f6f4ef" />
        </svg>
      </div>
    ),
    size,
  );
}
