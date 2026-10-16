/**
 * Hero diagram. An illustrative (not measured) trace of one character state
 * across two sessions: the event changes the state, and after the session
 * break one trajectory keeps the consequence while the other reverts.
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
          A character&apos;s guardedness rises after an embarrassing moment in an earlier
          session. In the later session, a coherent character still carries some of that
          consequence. A failing character returns to its original baseline as if nothing
          happened.
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
          GUARDEDNESS →
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
          baseline
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

        {/* Shared earlier trajectory: convincing in the moment */}
        <path
          d="M40 233 C 70 229, 95 236, 115 232 C 130 230, 138 150, 160 128 C 200 100, 270 118, 312 128"
          fill="none"
          stroke="#f6f4ef"
          strokeWidth="2.5"
          strokeLinecap="round"
          pathLength={1}
          style={draw}
          className="animate-draw"
        />

        {/* Expected: carries consequence forward */}
        <path
          d="M312 128 C 318 129, 334 132, 340 134"
          stroke="var(--color-arc-bright)"
          strokeWidth="1.5"
          strokeDasharray="2 4"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M340 134 C 392 146, 450 160, 540 176"
          fill="none"
          stroke="var(--color-arc-bright)"
          strokeWidth="2.75"
          strokeLinecap="round"
          pathLength={1}
          style={{ ...draw, animationDelay: "1.6s" }}
          className="animate-draw"
        />

        {/* Observed failure: reverts to baseline */}
        <path
          d="M312 128 C 322 160, 332 214, 340 230"
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

        {/* Event marker */}
        <g className="animate-fade-up" style={{ animationDelay: "0.7s" }}>
          <circle cx="127" cy="213" r="14" fill="var(--color-signal)" opacity="0.18" />
          <circle cx="127" cy="213" r="6" fill="var(--color-signal-bright)" />
          <line x1="127" y1="198" x2="127" y2="62" stroke="rgb(246 244 239 / 0.22)" />
          <text x="136" y="58" fontSize="16.5" fill="#f6f4ef">
            An embarrassing moment
          </text>
          <text x="136" y="78" fontSize="13.5" fill="rgb(246 244 239 / 0.55)">
            Convincing in the moment.
          </text>
        </g>

        {/* End labels */}
        <g className="animate-fade-up" style={{ animationDelay: "2.6s" }}>
          <circle cx="540" cy="176" r="4" fill="var(--color-arc-bright)" />
          <text x="532" y="124" textAnchor="end" fontSize="15.5" fill="var(--color-arc-bright)">
            Carries the consequence
          </text>
          <circle cx="540" cy="232" r="4" fill="var(--color-signal-bright)" />
          <text x="532" y="216" textAnchor="end" fontSize="15.5" fill="var(--color-signal-bright)">
            Reverts to baseline
          </text>
        </g>
      </svg>

      <figcaption className="relative mt-3 border-t border-paper/10 pt-4 text-[0.82rem] leading-relaxed text-paper/60">
        Both versions remember the fact. Only one behaves as if it mattered. A continuity audit
        tests for the difference.
      </figcaption>
    </figure>
  );
}
