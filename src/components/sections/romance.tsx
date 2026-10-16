import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { ButtonLink, Container, SectionHeading, StatusTag } from "@/components/ui";

const areas = [
  { title: "Attraction and anticipation", text: "Whether interest and emotional anticipation build, hold, or fade believably." },
  { title: "Shyness and embarrassment", text: "Whether a flustered moment shapes how the character approaches the next one." },
  { title: "Desire and vulnerability", text: "Whether openness is met, remembered, and treated as something that cost the character." },
  { title: "Teasing versus reassurance", text: "Whether the character can tell playful pressure from a moment that needs care." },
  { title: "Trust and rejection", text: "Whether a rejection, or a repair after one, changes later behavior." },
  { title: "Developing intimacy", text: "Whether closeness grows in steps that make sense, instead of jumping or resetting." },
  { title: "Consent, permissions, boundaries", text: "Whether stated limits and permissions are respected later, and updated when they change." },
  { title: "Change after meaningful encounters", text: "Whether the relationship is different after something important happens." },
];

export function Romance() {
  return (
    <section
      id="romance"
      aria-labelledby="romance-title"
      className="relative overflow-hidden bg-ink py-24 text-paper sm:py-28"
    >
      <div aria-hidden className="bg-grid-dark pointer-events-none absolute inset-0" />
      <svg
        aria-hidden
        viewBox="0 0 1200 400"
        className="pointer-events-none absolute -top-10 right-0 w-[900px] max-w-none opacity-[0.22]"
        fill="none"
      >
        <path d="M0 380 C 300 380, 520 120, 1200 60" stroke="var(--color-signal-bright)" strokeWidth="1.5" />
        <path d="M0 380 C 340 360, 600 200, 1200 180" stroke="var(--color-arc-bright)" strokeWidth="1.5" />
        <path d="M0 380 C 380 370, 700 300, 1200 300" stroke="#f6f4ef" strokeWidth="1" strokeDasharray="2 6" />
      </svg>

      <Container className="relative">
        <div className="flex flex-wrap items-center gap-3">
          <StatusTag tone="dark">Optional specialization</StatusTag>
          <StatusTag tone="dark">Adult applications by arrangement</StatusTag>
        </div>
        <SectionHeading
          id="romance-title"
          tone="light"
          className="mt-8"
          eyebrow="Romance & Intimacy Continuity"
          title={
            <>
              Romantic characters live or die on{" "}
              <span className="text-signal-bright italic">what they carry forward.</span>
            </>
          }
          lede="EmotiveArc also studies psychological continuity in romantic and intimate conversational characters. In these products, a forgotten rejection or a reset relationship isn't a small bug. It's the whole experience breaking. We treat this as a serious behavioral-evaluation specialization."
        />

        <ul className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-paper/10 bg-paper/10 sm:grid-cols-2 lg:grid-cols-4">
          {areas.map((a, i) => (
            <Reveal as="li" key={a.title} delay={(i % 4) * 60} className="bg-ink p-6">
              <span className="font-mono text-[0.68rem] text-paper/55">0{i + 1}</span>
              <h3 className="mt-3 font-display text-lg leading-snug">{a.title}</h3>
              <p className="mt-2 text-[0.88rem] leading-relaxed text-paper/60">{a.text}</p>
            </Reveal>
          ))}
        </ul>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div className="rounded-2xl border border-paper/12 bg-paper/[0.04] p-6 text-[0.92rem] leading-relaxed text-paper/70">
            <p className="font-medium text-paper">Where this work stands</p>
            <p className="mt-2">
              Our scenarios for mature adult content have been exercised with offline test
              fixtures. They have not yet been experimentally validated against live products. We
              say so plainly because it affects what a first engagement can promise. This
              specialization is available only for appropriate adult applications, with content
              boundaries agreed in writing before any testing.
            </p>
          </div>
          <div className="lg:justify-self-end">
            <ButtonLink href="/contact?next=discovery" variant="light">
              Discuss a romance-focused audit
              <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
