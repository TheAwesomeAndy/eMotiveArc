import { ArrowRight, FileText } from "lucide-react";
import { ContinuityChart } from "@/components/continuity-chart";
import { ButtonLink, Container, Eyebrow } from "@/components/ui";
import { brand, offer } from "@/content/site";

const facts = [
  "One character",
  `${offer.scenarios} tailored scenarios`,
  "Human-reviewed findings",
  "5-business-day report target",
];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_left,black_10%,transparent_65%)]"
      />
      <Container className="relative grid items-center gap-14 pt-12 pb-20 sm:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-12 lg:pt-20 lg:pb-28">
        <div className="animate-fade-up">
          <Eyebrow>{brand.descriptor}</Eyebrow>
          <h1
            id="hero-title"
            className="mt-6 font-display text-[2.6rem] leading-[1.02] tracking-[-0.02em] text-balance text-ink sm:text-6xl lg:text-[3.6rem] xl:text-[3.9rem]"
          >
            Your AI characters remember the conversation.{" "}
            <span className="text-arc italic">Do they remember what it meant?</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-pretty text-muted">
            An AI character can respond convincingly in one moment—and lose the emotional
            consequences in the next.{" "}
            <span className="text-ink">
              EmotiveArc helps developers find and address failures in psychological,
              relational, and conversational continuity.
            </span>
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="/contact?next=audit" className="px-6 py-3.5">
              Request an Audit
              <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
            <ButtonLink href="/sample-report" variant="secondary" className="px-6 py-3.5">
              <FileText className="size-4" aria-hidden />
              View Sample Report
            </ButtonLink>
          </div>

          <div className="mt-10 max-w-xl rounded-2xl border border-line bg-paper-2/70 p-5">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-display text-4xl leading-none text-ink">{offer.price}</span>
              <span className="text-[0.95rem] text-ink-3">fixed-fee continuity audit</span>
              <span className="font-mono text-[0.68rem] tracking-[0.14em] text-signal uppercase sm:ml-auto">
                Founding-client price
              </span>
            </div>
            <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 border-t border-line pt-4 text-[0.88rem] text-ink-3 sm:grid-cols-2">
              {facts.map((f) => (
                <li key={f} className="flex items-center gap-2.5">
                  <span aria-hidden className="size-1 shrink-0 rounded-full bg-arc" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="animate-fade-up [animation-delay:150ms]">
          <ContinuityChart />
        </div>
      </Container>
    </section>
  );
}
