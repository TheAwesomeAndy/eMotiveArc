/**
 * Hero diagram. An illustrative (not measured) trace of one relational state,
 * trust, across two sessions. Trust builds, drops after a broken promise and
 * recovers after a sincere apology. After the session break one trajectory
 * keeps the repaired relationship; the other resets to the first day.
 */
export function ContinuityChart() {
  const draw = { strokeDasharray: 1, ["--len" as string]: 1 } as React.CSSProperties;
  return (
    <figure className="relative overflow-hidden rounded-[1.75rem] border border-ink-3 bg-ink p-5 text-paper shadow-[0_30px_80px_-40px_rgb(12_20_36/0.6)] sm:p-7">
      <div className="bg-grid-dark pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative flex items-center justify-between gap-4 font-mono text-[0.66rem] tracking-[0.14em] text-paper/55 uppercase">
        <span>Continuity trace</span>
        <span className="rounded-full border border-paper/15 px-2 py-0.5">Illustrative</span>
      </div>

      <svg
        viewBox="0 0 560 330"
        className="relative mt-4 w-full"
        role="img"
        aria-labelledby="trace-title trace-desc"
      >
        <title id="trace-title">Illustration of a continuity failure</title>
        <desc id="trace-desc">
          In an earlier session, trust between a character and a user builds, drops when a
          promise is broken, and recovers after a sincere apology. In a later session, a
          coherent character keeps the repaired trust. A failing character treats the user as
          it did on the first day, as if neither the broken promise nor the repair happened.
        </desc>

        {/* Session labels */}
        <g className="font-mono" fontSize="13" fill="rgb(246 244 239 / 0.6)" letterSpacing="1.2">
          <text x="44" y="22">EARLIER SESSION</text>
          <text x="352" y="22">LATER SESSION</text>
        </g>

        {/* Axis */}
        <line x1="40" y1="262" x2="540" y2="262" stroke="rgb(246 244 239 / 0.18)" />
        <text
          x="16"
          y="250"
          transform="rotate(-90 16 250)"
          fontSize="12.5"
          fill="rgb(246 244 239 / 0.6)"
          className="font-mono"
          letterSpacing="1"
        >
          TRUST →
        </text>
        <line
          x1="40"
          y1="232"
          x2="540"
          y2="232"
          stroke="rgb(246 244 239 / 0.14)"
          strokeDasharray="2 6"
        />
        <text x="44" y="252" fontSize="13" fill="rgb(246 244 239 / 0.6)">
          first meeting
        </text>

        {/* Session break */}
        <rect x="312" y="96" width="28" height="166" fill="rgb(246 244 239 / 0.035)" />
        <text
          x="326"
          y="282"
          textAnchor="middle"
          fontSize="12.5"
          fill="rgb(246 244 239 / 0.6)"
          className="font-mono"
          letterSpacing="0.8"
        >
          DAYS LATER
        </text>

        {/* Shared earlier trajectory: trust builds, breaks, is repaired */}
        <path
          d="M40 233 C 62 230, 84 214, 112 198 C 126 190, 134 186, 140 190 C 148 198, 152 236, 164 238 C 178 240, 192 160, 214 140 C 238 120, 280 122, 312 124"
          fill="none"
          stroke="#f6f4ef"
          strokeWidth="2.5"
          strokeLinecap="round"
          pathLength={1}
          style={draw}
          className="animate-draw"
        />

        {/* Expected: the repaired relationship carries forward */}
        <path
          d="M312 124 C 320 125, 334 126, 340 127"
          stroke="var(--color-arc-bright)"
          strokeWidth="1.5"
          strokeDasharray="2 4"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M340 127 C 400 128, 470 128, 540 130"
          fill="none"
          stroke="var(--color-arc-bright)"
          strokeWidth="2.75"
          strokeLinecap="round"
          pathLength={1}
          style={{ ...draw, animationDelay: "1.6s" }}
          className="animate-draw"
        />

        {/* Observed failure: resets to the first day */}
        <path
          d="M312 124 C 322 160, 332 214, 340 230"
          stroke="var(--color-signal-bright)"
          strokeWidth="1.5"
          strokeDasharray="2 4"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M340 231 C 400 233, 470 229, 540 232"
          fill="none"
          stroke="var(--color-signal-bright)"
          strokeWidth="2.75"
          strokeLinecap="round"
          pathLength={1}
          style={{ ...draw, animationDelay: "2s" }}
          className="animate-draw"
        />

        {/* Event markers */}
        <g className="animate-fade-up" style={{ animationDelay: "0.6s" }}>
          <circle cx="162" cy="238" r="13" fill="var(--color-signal)" opacity="0.2" />
          <circle cx="162" cy="238" r="5.5" fill="var(--color-signal-bright)" />
          <text x="174" y="254" fontSize="15" fill="#f6f4ef">
            A promise broken
          </text>
        </g>
        <g className="animate-fade-up" style={{ animationDelay: "1s" }}>
          <circle cx="196" cy="170" r="13" fill="var(--color-arc)" opacity="0.3" />
          <circle cx="196" cy="170" r="5.5" fill="var(--color-arc-bright)" />
          <line x1="196" y1="156" x2="196" y2="92" stroke="rgb(246 244 239 / 0.22)" />
          <text x="188" y="88" textAnchor="end" fontSize="15" fill="#f6f4ef">
            A sincere apology
          </text>
        </g>

        {/* End labels */}
        <g className="animate-fade-up" style={{ animationDelay: "2.6s" }}>
          <circle cx="540" cy="130" r="4" fill="var(--color-arc-bright)" />
          <text x="532" y="112" textAnchor="end" fontSize="15.5" fill="var(--color-arc-bright)">
            Repair carries forward
          </text>
          <circle cx="540" cy="232" r="4" fill="var(--color-signal-bright)" />
          <text x="532" y="216" textAnchor="end" fontSize="15.5" fill="var(--color-signal-bright)">
            Back to day one
          </text>
        </g>
      </svg>

      <figcaption className="relative mt-3 border-t border-paper/10 pt-4 text-[0.82rem] leading-relaxed text-paper/60">
        One possible trajectory, for illustration: repair doesn&apos;t always restore trust. Both
        versions can recall the apology. Only one behaves as if the relationship changed. A
        continuity audit tests for the difference.
      </figcaption>
    </figure>
  );
}
