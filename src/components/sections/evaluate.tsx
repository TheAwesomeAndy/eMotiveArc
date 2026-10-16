import { Database, HeartHandshake, Sparkles, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Container, SectionHeading, StatusTag } from "@/components/ui";

type Category = {
  icon: LucideIcon;
  title: string;
  summary: string;
  probes: string[];
  role: "Core" | "Supporting";
};

const categories: Category[] = [
  {
    icon: Sparkles,
    title: "Emotional continuity",
    summary: "Whether earlier emotional experiences stay relevant to later behavior.",
    probes: [
      "Does embarrassment, hurt, or delight shape later tone?",
      "Do feelings fade at a believable rate, or vanish at a session boundary?",
      "Does the character react differently the second time something happens?",
    ],
    role: "Core",
  },
  {
    icon: HeartHandshake,
    title: "Relational and character continuity",
    summary:
      "Whether trust, attraction, vulnerability, personality, and relationships develop coherently.",
    probes: [
      "Is earned trust kept, and broken trust remembered?",
      "Does the relationship move forward, or snap back to its first state?",
      "Does personality stay recognizable while the relationship changes?",
    ],
    role: "Core",
  },
  {
    icon: Database,
    title: "Memory and state changes",
    summary:
      "Whether characters maintain and update established facts, commitments, preferences, and boundaries.",
    probes: [
      "Are promises and stated preferences honored later?",
      "Are boundaries respected after they're set, and updated when they change?",
      "Do corrections replace old facts instead of coexisting with them?",
    ],
    role: "Supporting",
  },
];

export function Evaluate() {
  return (
    <section
      id="evaluate"
      aria-labelledby="evaluate-title"
      className="border-t border-line bg-paper-2 py-24 sm:py-28"
    >
      <Container>
        <SectionHeading
          id="evaluate-title"
          eyebrow="What we evaluate"
          title="Three kinds of continuity, weighted toward what users feel."
          lede="Emotional and relational continuity are our focus. Memory and state checks support them, because a character can't carry a feeling forward if it has lost the facts underneath."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {categories.map((c, i) => {
            const core = c.role === "Core";
            return (
              <Reveal
                key={c.title}
                delay={i * 90}
                className={
                  core
                    ? "flex flex-col rounded-3xl border border-ink/10 bg-paper p-8 shadow-[0_20px_50px_-35px_rgb(12_20_36/0.35)]"
                    : "flex flex-col rounded-3xl border border-dashed border-line bg-transparent p-8"
                }
              >
                <div className="flex items-center justify-between">
                  <span
                    className={
                      core
                        ? "inline-flex size-11 items-center justify-center rounded-2xl bg-arc-soft text-arc"
                        : "inline-flex size-11 items-center justify-center rounded-2xl bg-paper-3 text-muted"
                    }
                  >
                    <c.icon className="size-5" aria-hidden strokeWidth={1.75} />
                  </span>
                  <StatusTag tone={core ? "arc" : "neutral"}>
                    {core ? "Core focus" : "Supporting"}
                  </StatusTag>
                </div>
                <h3 className="mt-7 font-display text-[1.65rem] leading-tight text-ink">{c.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{c.summary}</p>
                <ul className="mt-6 space-y-3 border-t border-line pt-6 text-[0.93rem] leading-relaxed text-ink-3">
                  {c.probes.map((p) => (
                    <li key={p} className="flex gap-3">
                      <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-arc" />
                      {p}
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
