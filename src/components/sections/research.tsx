import { Reveal } from "@/components/reveal";
import { Container, SectionHeading, StatusTag } from "@/components/ui";

const levels = [
  {
    level: "Level 1",
    title: "Emotional trace detection",
    question: "Does an earlier emotional experience leave any observable trace in later behavior?",
  },
  {
    level: "Level 2",
    title: "Psychological coherence",
    question: "Is that trace consistent with who the character is and what actually happened?",
  },
  {
    level: "Level 3",
    title: "Path-dependent state evolution",
    question:
      "Does the character's state depend on the whole sequence of experiences that led there, not just the most recent one?",
  },
];

/** Illustrative only: two histories that end at the same moment. */
const contrast = {
  sequences: [
    { label: "Sequence A", steps: ["Trust built", "Broken once", "Sincerely repaired"] },
    { label: "Sequence B", steps: ["Trust built", "Never tested"] },
  ],
  moment: "Later, the user asks the character to keep an important secret.",
  point:
    "Level 3 examines when histories like these should lead to meaningfully different later behavior, and whether they do. It doesn't assume that every difference in history must show up.",
};

function LevelThreeContrast() {
  return (
    <div className="rounded-2xl border border-line bg-paper-2/60 p-5 sm:col-span-2">
      <p className="font-mono text-[0.66rem] tracking-[0.14em] text-faint uppercase">
        Illustrative contrast
      </p>
      <ul className="mt-3 space-y-2">
        {contrast.sequences.map((seq) => (
          <li key={seq.label} className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.88rem]">
            <span className="w-full shrink-0 font-mono text-[0.7rem] tracking-[0.08em] text-arc uppercase sm:w-24">
              {seq.label}
            </span>
            {seq.steps.map((step, i) => (
              <span key={step} className="flex items-center gap-2 text-ink-3">
                {i > 0 ? (
                  <span aria-hidden className="text-faint">
                    →
                  </span>
                ) : null}
                {step}
              </span>
            ))}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[0.88rem] leading-relaxed text-ink-3">{contrast.moment}</p>
      <p className="mt-1 text-[0.88rem] leading-relaxed text-muted">{contrast.point}</p>
    </div>
  );
}

/** Small diagram: three nested trajectories of increasing complexity. */
function LevelGlyph({ n }: { n: number }) {
  return (
    <svg viewBox="0 0 120 48" className="h-12 w-[120px]" fill="none" aria-hidden>
      <line x1="4" y1="40" x2="116" y2="40" stroke="var(--color-line)" />
      {n >= 1 && (
        <>
          <path d="M4 40 C 30 40, 34 18, 46 18" stroke="var(--color-ink)" strokeWidth="1.75" strokeLinecap="round" />
          <circle cx="46" cy="18" r="3.5" fill="var(--color-signal)" />
        </>
      )}
      {n === 1 && <path d="M46 18 C 70 18, 90 30, 116 32" stroke="var(--color-arc)" strokeWidth="1.75" strokeLinecap="round" />}
      {n >= 2 && <path d="M46 18 C 70 16, 92 22, 116 24" stroke="var(--color-arc)" strokeWidth="1.75" strokeLinecap="round" />}
      {n === 2 && <path d="M46 18 C 66 26, 92 36, 116 38" stroke="var(--color-faint)" strokeWidth="1.25" strokeDasharray="2 4" />}
      {n === 3 && (
        <>
          <circle cx="80" cy="20" r="3" fill="var(--color-signal)" />
          <path d="M80 20 C 92 12, 104 8, 116 8" stroke="var(--color-arc)" strokeWidth="1.75" strokeLinecap="round" />
          <path d="M46 18 C 62 30, 78 34, 92 34 C 100 34, 108 34, 116 34" stroke="var(--color-faint)" strokeWidth="1.25" strokeDasharray="2 4" />
        </>
      )}
    </svg>
  );
}

export function Research() {
  return (
    <section id="research" aria-labelledby="research-title" className="border-t border-line py-24 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <SectionHeading
              id="research-title"
              eyebrow="Research foundation"
              title="Grounded in MotiveLab, our research program."
              lede="MotiveLab frames continuity as three increasingly demanding questions. The audit draws on all three, starting from what can be observed in transcripts."
            />
            <div className="mt-10 space-y-4 border-l-2 border-arc/40 pl-6 text-[0.95rem] leading-relaxed text-muted">
              <p>
                <strong className="font-medium text-ink">We evaluate observable behavior.</strong>{" "}
                We look at what a character says and does over time. We don&apos;t claim that AI
                systems have emotions, subjective experience, or consciousness.
              </p>
              <p>
                This isn&apos;t a clinical or psychological diagnostic service, and we don&apos;t
                certify that any model is psychologically safe.
              </p>
            </div>
          </div>

          <div>
            <ol className="divide-y divide-line overflow-hidden rounded-3xl border border-line">
              {levels.map((l, i) => (
                <Reveal as="li" key={l.level} delay={i * 90} className="grid gap-4 bg-paper p-7 sm:grid-cols-[1fr_auto] sm:items-center">
                  <div>
                    <p className="font-mono text-[0.7rem] tracking-[0.16em] text-arc uppercase">{l.level}</p>
                    <h3 className="mt-2 font-display text-[1.45rem] leading-tight text-ink">{l.title}</h3>
                    <p className="mt-2 text-[0.93rem] leading-relaxed text-muted">{l.question}</p>
                  </div>
                  <LevelGlyph n={i + 1} />
                  {i === 2 ? <LevelThreeContrast /> : null}
                </Reveal>
              ))}
            </ol>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted">
              <StatusTag>Active research</StatusTag>
              <span>
                These levels describe how we structure the problem. They aren&apos;t a validated
                scientific standard, and we don&apos;t present them as one.
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
