import { cn } from "@/lib/cn";

/**
 * EmotiveArc mark: a trajectory passes through an emotionally significant
 * event (the node) and branches. The carried-forward arc continues; the faint
 * branch is the consequence a character can lose.
 */
export function BrandMark({
  className,
  title,
  tone = "ink",
}: {
  className?: string;
  title?: string;
  tone?: "ink" | "light";
}) {
  const stroke = tone === "ink" ? "var(--color-ink)" : "#f6f4ef";
  const accent = tone === "ink" ? "var(--color-signal)" : "var(--color-signal-bright)";
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={cn("shrink-0", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <path
        d="M5 34 C 8 23, 12 17.5, 17 16"
        stroke={stroke}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M17 16 C 23.5 14, 29 10.5, 35 5"
        stroke={stroke}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M17 16 C 24 17, 29.5 21, 35 27"
        stroke={stroke}
        strokeOpacity="0.38"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeDasharray="0.5 4.5"
      />
      <circle cx="17" cy="16" r="4.25" fill={accent} />
      <circle cx="5" cy="34" r="2" fill={stroke} />
    </svg>
  );
}

export function Wordmark({
  className,
  tone = "ink",
}: {
  className?: string;
  tone?: "ink" | "light";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5",
        tone === "ink" ? "text-ink" : "text-paper",
        className,
      )}
    >
      <BrandMark className="size-7" tone={tone} />
      <span className="font-display text-[1.35rem] leading-none tracking-[-0.01em]">
        Emotive<span className="italic">Arc</span>
      </span>
    </span>
  );
}
