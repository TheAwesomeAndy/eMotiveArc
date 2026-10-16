import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "light" | "outline-light";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-paper hover:bg-ink-3 focus-visible:outline-ink shadow-[0_1px_0_rgb(255_255_255/0.08)_inset]",
  secondary:
    "border border-ink/20 bg-transparent text-ink hover:border-ink/50 hover:bg-ink/[0.03] focus-visible:outline-ink",
  ghost: "text-ink hover:text-arc focus-visible:outline-ink",
  light: "bg-paper text-ink hover:bg-white focus-visible:outline-paper",
  "outline-light":
    "border border-paper/25 text-paper hover:border-paper/60 hover:bg-paper/[0.04] focus-visible:outline-paper",
};

export const buttonClass = (variant: Variant = "primary", className?: string) =>
  cn(
    "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 py-3 text-[0.95rem] font-medium transition-colors duration-200",
    "focus-visible:outline-2 focus-visible:outline-offset-2",
    variants[variant],
    className,
  );

export function ButtonLink({
  variant = "primary",
  className,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link className={buttonClass(variant, className)} {...props} />;
}

export function Eyebrow({
  children,
  className,
  tone = "ink",
}: {
  children: ReactNode;
  className?: string;
  tone?: "ink" | "light";
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-2.5 font-mono text-[0.72rem] font-medium uppercase tracking-[0.16em]",
        tone === "ink" ? "text-arc" : "text-arc-bright",
        className,
      )}
    >
      <span aria-hidden className="h-px w-6 bg-current opacity-60" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  tone = "ink",
  className,
  id,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  tone?: "ink" | "light";
  className?: string;
  id?: string;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2
        id={id}
        className={cn(
          "mt-5 font-display text-[2.1rem] leading-[1.08] tracking-[-0.015em] text-balance sm:text-5xl",
          tone === "ink" ? "text-ink" : "text-paper",
        )}
      >
        {title}
      </h2>
      {lede ? (
        <div
          className={cn(
            "mt-6 text-lg leading-relaxed text-pretty",
            tone === "ink" ? "text-muted" : "text-paper/70",
          )}
        >
          {lede}
        </div>
      ) : null}
    </div>
  );
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>{children}</div>;
}

export function StatusTag({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: "neutral" | "arc" | "signal" | "dark";
  className?: string;
}) {
  const tones = {
    neutral: "border-line bg-paper-2 text-muted",
    arc: "border-arc/25 bg-arc-soft text-arc",
    signal: "border-signal/25 bg-signal-soft text-signal",
    dark: "border-paper/15 bg-paper/[0.06] text-paper/70",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.68rem] font-medium uppercase tracking-[0.12em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
