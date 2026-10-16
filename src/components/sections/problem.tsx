import {
  HeartCrack,
  History,
  ShieldOff,
  Shuffle,
  SmilePlus,
  Waves,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Container, SectionHeading } from "@/components/ui";

type Failure = {
  icon: LucideIcon;
  title: string;
  earlier: string;
  later: string;
};

const failures: Failure[] = [
  {
    icon: ShieldOff,
    title: "Trust disappears",
    earlier: "The user keeps a promise that mattered to the character.",
    later: "Next session, the character is exactly as wary as before.",
  },
  {
    icon: SmilePlus,
    title: "Embarrassment leaves no trace",
    earlier: "The character is flustered after an awkward moment.",
    later: "It brings the topic up again with no hint of self-consciousness.",
  },
  {
    icon: History,
    title: "The relationship resets",
    earlier: "Weeks of conversation build real closeness.",
    later: "The character greets the user like a polite acquaintance.",
  },
  {
    icon: Waves,
    title: "Reassurance does nothing",
    earlier: "The user comforts the character through a vulnerable moment.",
    later: "The same fear returns, untouched, as if no one had ever helped.",
  },
  {
    icon: Shuffle,
    title: "Dynamics contradict themselves",
    earlier: "An established pattern: the character teases, the user pushes back.",
    later: "The roles quietly flip with no reason inside the story.",
  },
  {
    icon: HeartCrack,
    title: "Facts survive, meaning doesn't",
    earlier: "The user shares something painful.",
    later: "Memory recalls the detail and mentions it casually, with none of its weight.",
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
              something important happens, they expect it to <em>change</em> what comes next.
              When it doesn&apos;t, the character stops feeling like someone and starts feeling
              like a very good autocomplete.
            </p>
          </div>
        </div>

        <ul className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {failures.map((f, i) => (
            <Reveal as="li" key={f.title} delay={(i % 3) * 80} className="bg-paper p-7 sm:p-8">
              <f.icon className="size-5 text-signal" aria-hidden strokeWidth={1.75} />
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
