import type { ReactNode } from "react";
import { Container, Eyebrow } from "@/components/ui";

export function PageHeader({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_left,black_10%,transparent_70%)]"
      />
      <Container className="relative py-16 sm:py-20">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-6 max-w-3xl font-display text-[2.4rem] leading-[1.05] tracking-[-0.02em] text-balance text-ink sm:text-[3.4rem]">
          {title}
        </h1>
        {lede ? (
          <div className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-muted">{lede}</div>
        ) : null}
        {children}
      </Container>
    </section>
  );
}

/** Typographic wrapper for long-form policy text. */
export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-3xl space-y-5 leading-relaxed text-ink-3 [&_a]:text-arc [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mt-12 [&_h2]:font-display [&_h2]:text-[1.7rem] [&_h2]:leading-tight [&_h2]:text-ink [&_h3]:mt-8 [&_h3]:font-medium [&_h3]:text-ink [&_li]:pl-1 [&_strong]:font-medium [&_strong]:text-ink [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
      {children}
    </div>
  );
}

export function DraftNotice({ children }: { children: ReactNode }) {
  return (
    <div
      role="note"
      className="mt-8 max-w-3xl rounded-2xl border border-signal/30 bg-signal-soft/50 p-5 text-[0.92rem] leading-relaxed text-ink-3"
    >
      <p className="font-mono text-[0.7rem] tracking-[0.14em] text-signal uppercase">
        Preliminary draft
      </p>
      <div className="mt-2">{children}</div>
    </div>
  );
}
