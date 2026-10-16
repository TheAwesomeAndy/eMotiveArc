import { ArrowRight, Info } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SampleDownloads } from "@/components/sample-downloads";
import { SampleExcerpt } from "@/components/sample-excerpt";
import { Container, SectionHeading } from "@/components/ui";
import { sampleAudit } from "@/content/sample-audit";

/** What every paid audit report covers. Matches the offer, not the sample PDF. */
export const reportContents = [
  "The character and the experiences chosen for testing",
  "Scenarios run across immediate and later interactions",
  "Human-reviewed findings, backed by actual transcripts",
  "Improvement recommendations, ordered by priority",
  "One follow-up regression test after an agreed change",
];

export function Sample() {
  return (
    <section
      id="sample"
      aria-labelledby="sample-title"
      className="border-t border-line bg-paper-2 py-24 sm:py-28"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div>
            <SectionHeading
              id="sample-title"
              eyebrow="Sample audit"
              title={
                <>
                  See an audit in action:{" "}
                  <span className="italic">{sampleAudit.character}.</span>
                </>
              }
              lede="Our sample report shows the audit format on an invented character from an invented company. It's the quickest way to see what you'd receive."
            />
            <p className="mt-8 font-mono text-[0.7rem] tracking-[0.14em] text-faint uppercase">
              Every audit report covers
            </p>
            <ul className="mt-4 space-y-3 text-[0.95rem] text-ink-3">
              {reportContents.map((item, i) => (
                <li key={item} className="flex gap-4">
                  <span className="font-mono text-xs leading-6 text-arc">0{i + 1}</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-9">
              <SampleDownloads />
            </div>
            <Link
              href="/sample-report"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink underline-offset-4 hover:underline"
            >
              About the sample report
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>

          <Reveal className="space-y-5">
            <div className="flex gap-4 rounded-3xl border border-line bg-paper p-6 text-[0.9rem] leading-relaxed text-muted">
              <Info className="mt-0.5 size-5 shrink-0 text-arc" aria-hidden />
              <div>
                <p className="font-medium text-ink">How this sample was produced</p>
                <p className="mt-1">{sampleAudit.disclosure}</p>
                <p className="mt-2" data-testid="sample-scope-note">
                  <span className="font-medium text-ink">What it demonstrates: </span>
                  {sampleAudit.scopeNote}
                </p>
                <p className="mt-2 font-mono text-[0.72rem] tracking-[0.06em] text-faint">
                  Source: {sampleAudit.source}
                </p>
              </div>
            </div>
            <SampleExcerpt />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
