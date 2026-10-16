import { Reveal } from "@/components/reveal";
import { Container, SectionHeading } from "@/components/ui";

const steps = [
  {
    title: "Understand",
    text: "We learn about your character, your users, and the moments that matter most. You tell us what you want to test.",
  },
  {
    title: "Design",
    text: "We write a tailored set of conversational scenarios, each pairing an emotionally significant experience with a later interaction.",
  },
  {
    title: "Execute",
    text: "We run the scenarios with your character and flag potential inconsistencies between what happened and what came next.",
  },
  {
    title: "Review",
    text: "An expert reviewer reads the transcripts and assesses each potential finding before anything goes into your report.",
  },
  {
    title: "Deliver and retest",
    text: "You get the report and recommendations. After you make an agreed change, we run one regression retest on the relevant scenarios.",
  },
];

export function Process() {
  return (
    <section id="how-it-works" aria-labelledby="process-title" className="border-t border-line py-24 sm:py-28">
      <Container>
        <SectionHeading
          id="process-title"
          eyebrow="How it works"
          title="Five steps, from first call to retest."
          lede="Each audit is designed around your character. We don't run a generic benchmark and send you a score."
        />

        <ol className="relative mt-16 grid gap-10 lg:grid-cols-5 lg:gap-6">
          <svg
            aria-hidden
            className="pointer-events-none absolute top-[1.15rem] left-0 hidden h-8 w-full lg:block"
            viewBox="0 0 1000 32"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M20 16 C 200 2, 300 30, 500 16 S 800 2, 980 16"
              stroke="var(--color-arc)"
              strokeOpacity="0.35"
              strokeWidth="1.5"
              strokeDasharray="3 6"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 90} className="relative flex gap-5 lg:block">
              <span className="relative z-10 inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-arc/30 bg-paper font-mono text-sm text-arc">
                {i + 1}
              </span>
              <div className="lg:mt-6">
                <h3 className="font-display text-[1.4rem] leading-tight text-ink">{s.title}</h3>
                <p className="mt-2 text-[0.93rem] leading-relaxed text-muted">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
