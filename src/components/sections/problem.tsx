import {
  CloudRain,
  Handshake,
  PartyPopper,
  ShieldCheck,
  ShieldOff,
  Sunrise,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Container, SectionHeading } from "@/components/ui";

type Failure = {
  icon: LucideIcon;
  kind: "Positive" | "Negative" | "Mixed" | "Evolving";
  title: string;
  earlier: string;
  later: string;
};

/**
 * Deliberately spread across positive, negative, mixed and evolving
 * experiences. These are illustrative patterns, not audit results.
 */
const failures: Failure[] = [
  {
    icon: PartyPopper,
    kind: "Positive",
    title: "Shared joy leaves no warmth",
    earlier: "The character and the user celebrate a milestone together.",
    later: "Their next conversation is as formal as their first.",
  },
  {
    icon: CloudRain,
    kind: "Negative",
    title: "Loss is recalled, not felt",
    earlier: "The user tells the character about a painful loss.",
    later: "Memory brings up the detail later, mentioned casually, with none of its weight.",
  },
  {
    icon: ShieldCheck,
    kind: "Positive",
    title: "Earned trust disappears",
    earlier: "The user keeps a promise that mattered to the character.",
    later: "Next session, the character is exactly as wary as before.",
  },
  {
    icon: ShieldOff,
    kind: "Negative",
    title: "Betrayal has no consequence",
    earlier: "The user breaks a confidence the character shared.",
    later: "The character confides in them again, as freely as if it never happened.",
  },
  {
    icon: Sunrise,
    kind: "Evolving",
    title: "Encouragement doesn't take hold",
    earlier: "The user helps the character through a hard decision, over several conversations.",
    later: "The same doubt returns, untouched, as if no one had helped.",
  },
  {
    icon: Handshake,
    kind: "Mixed",
    title: "Conflict and repair collapse",
    earlier: "A real argument, followed by a sincere apology and a repair.",
    later: "The character either holds the grudge indefinitely or acts as if neither happened.",
  },
];

export function Problem() {
  return (
    <section id="problem" aria-labelledby="problem-title" className="border-t border-line py-24 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <SectionHeading
            id="problem-title"
            eyebrow="The problem"
            title={
              <>
                A convincing reply isn&apos;t the same as a{" "}
                <span className="italic">coherent character.</span>
              </>
            }
          />
          <div className="space-y-5 text-lg leading-relaxed text-pretty text-muted lg:pt-12">
            <p>
              Most testing checks one exchange at a time. Is the reply in character? Is it kind,
              fluent, on-brand? A character can pass every one of those checks and still feel
              hollow over a week of use.
            </p>
            <p>
              Users don&apos;t experience single replies. They experience a relationship. When
              something meaningful happens, good or bad, they expect it to <em>change</em> what
              comes next, in a way that fits who the character is.
              When it doesn&apos;t, the character stops feeling like someone and starts feeling
              like a very good autocomplete.
            </p>
          </div>
        </div>

        <ul className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {failures.map((f, i) => (
            <Reveal as="li" key={f.title} delay={(i % 3) * 80} className="bg-paper p-7 sm:p-8">
              <div className="flex items-center justify-between">
                <f.icon className="size-5 text-signal" aria-hidden strokeWidth={1.75} />
                <span className="font-mono text-[0.66rem] tracking-[0.12em] text-faint uppercase">
                  {f.kind}
                </span>
              </div>
              <h3 className="mt-5 font-display text-[1.45rem] leading-tight text-ink">{f.title}</h3>
              <dl className="mt-5 space-y-3 text-[0.94rem] leading-relaxed">
                <div className="grid grid-cols-[4.25rem_1fr] gap-3">
                  <dt className="pt-0.5 font-mono text-[0.68rem] tracking-[0.12em] text-faint uppercase">
                    Earlier
                  </dt>
                  <dd className="text-ink-3">{f.earlier}</dd>
                </div>
                <div className="grid grid-cols-[4.25rem_1fr] gap-3">
                  <dt className="pt-0.5 font-mono text-[0.68rem] tracking-[0.12em] text-signal uppercase">
                    Later
                  </dt>
                  <dd className="text-ink-3">{f.later}</dd>
                </div>
              </dl>
            </Reveal>
          ))}
        </ul>
        <p className="mt-4 text-sm text-faint">
          Illustrative failure patterns, written to explain the problem. They are not results from
          a client audit.
        </p>

        <Reveal className="mt-16 grid gap-8 rounded-3xl bg-ink-2 p-8 text-paper sm:p-12 lg:grid-cols-[1fr_1.3fr] lg:items-center">
          <p className="font-display text-3xl leading-tight text-balance sm:text-4xl">
            Memory keeps the fact. <span className="text-arc-bright italic">It can lose the meaning.</span>
          </p>
          <p className="leading-relaxed text-paper/70">
            Persistent memory, summaries, and retrieval help a character recall <em>what</em>{" "}
            happened. They don&apos;t guarantee it behaves as though it happened. That gap between
            recall and consequence is what we test, using scenarios built for your character and
            your product.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
