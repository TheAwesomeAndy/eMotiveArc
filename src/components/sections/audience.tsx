import { BookOpen, Gamepad2, Heart, MessagesSquare, Swords, Users } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Container, SectionHeading } from "@/components/ui";

const audiences = [
  { icon: Users, label: "AI companion platforms" },
  { icon: Heart, label: "Romance-oriented conversational products" },
  { icon: BookOpen, label: "Interactive storytelling systems" },
  { icon: Swords, label: "Role-playing games" },
  { icon: Gamepad2, label: "Conversational NPC developers" },
  { icon: MessagesSquare, label: "Other products with persistent characters" },
];

export function Audience() {
  return (
    <section id="who" aria-labelledby="who-title" className="border-t border-line bg-paper-2 py-24 sm:py-28">
      <Container className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <SectionHeading
            id="who-title"
            eyebrow="Who we serve"
            title="Built for teams whose characters have to last."
            lede="If users come back to the same character day after day, continuity is part of your product. We work with teams who build those characters."
          />
          <Reveal className="mt-10 rounded-3xl border border-arc/20 bg-arc-soft/50 p-7">
            <h3 className="font-display text-xl text-ink">
              Especially relevant if you use persistent, summarized, or retrieved memory
            </h3>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-3">
              Summaries and retrieval are good at keeping facts. We suspect they can also flatten
              what those facts meant, which is why we think these systems deserve careful
              testing. That&apos;s a working hypothesis. We haven&apos;t shown that these
              architectures fail more often than others.
            </p>
          </Reveal>
        </div>

        <ul className="grid content-start gap-3 sm:grid-cols-2">
          {audiences.map((a, i) => (
            <Reveal
              as="li"
              key={a.label}
              delay={i * 50}
              className="flex items-center gap-4 rounded-2xl border border-line bg-paper p-5"
            >
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-paper-2 text-arc">
                <a.icon className="size-5" aria-hidden strokeWidth={1.75} />
              </span>
              <span className="leading-snug text-ink">{a.label}</span>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
