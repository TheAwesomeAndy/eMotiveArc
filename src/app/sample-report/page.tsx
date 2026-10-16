import type { Metadata } from "next";
import { ArrowRight, Info } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { SampleDownloads } from "@/components/sample-downloads";
import { SampleExcerpt } from "@/components/sample-excerpt";
import { reportContents } from "@/components/sections/sample";
import { ButtonLink, Container } from "@/components/ui";
import { sampleAudit } from "@/content/sample-audit";
import { offer } from "@/content/site";

export const metadata: Metadata = {
  title: "Sample Audit Report",
  description:
    "See the format of an EmotiveArc AI Character Continuity Audit through our Captain Ivy Marlow sample report.",
  alternates: { canonical: "/sample-report" },
};

export default function SampleReportPage() {
  return (
    <>
      <PageHeader
        eyebrow="Sample report"
        title={
          <>
            Sample audit: <span className="italic">{sampleAudit.character}.</span>
          </>
        }
        lede="A worked example of the audit format, from MotiveLab audit-1.1. Read the two-page overview, or open the full sample report."
      >
        <div className="mt-9">
          <SampleDownloads />
        </div>
      </PageHeader>

      <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <div className="space-y-8">
          <div>
            <h2 className="font-display text-2xl text-ink">Every audit report covers</h2>
            <ul className="mt-5 space-y-3 text-ink-3">
              {reportContents.map((item, i) => (
                <li key={item} className="flex gap-4">
                  <span className="font-mono text-xs leading-6 text-arc">0{i + 1}</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex gap-4 rounded-3xl border border-line bg-paper-2/60 p-6 text-[0.92rem] leading-relaxed text-muted">
            <Info className="mt-0.5 size-5 shrink-0 text-arc" aria-hidden />
            <div>
              <p className="font-medium text-ink">How this sample was produced</p>
              <p className="mt-1">{sampleAudit.disclosure}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <SampleExcerpt />
          <div className="rounded-3xl bg-ink p-8 text-paper">
            <h2 className="font-display text-2xl">Want this for your character?</h2>
            <p className="mt-3 leading-relaxed text-paper/70">
              The founding-client audit is a {offer.price} fixed fee for one character, with{" "}
              {offer.scenarios} tailored scenarios, human review, and one regression retest.
            </p>
            <ButtonLink href="/contact?next=audit" variant="light" className="mt-6">
              Request an Audit
              <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
          </div>
        </div>
      </Container>
    </>
  );
}
