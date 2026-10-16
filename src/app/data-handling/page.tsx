import type { Metadata } from "next";
import { Check, Clock3 } from "lucide-react";
import { DraftNotice, PageHeader, Prose } from "@/components/page-header";
import { Container, StatusTag } from "@/components/ui";
import { retention } from "@/content/policies";

export const metadata: Metadata = {
  title: "Client Data Handling",
  description:
    "How EmotiveArc approaches client information during an AI Character Continuity Audit, including what is in place today and what is still proposed.",
  alternates: { canonical: "/data-handling" },
};

const inPlace = [
  "We don't ask for API keys, private user transcripts, or system prompts through this website.",
  "Access to your character is agreed with you during scoping, using a method you control.",
  "Audit findings are shared only with the contacts you name.",
  "Client information isn't published on this website or used in our marketing without written permission.",
];

const proposed = [
  retention.statement,
  "A documented deletion procedure, with confirmation on request.",
  "Written confidentiality and data-processing terms for each engagement.",
];

export default function DataHandlingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Policies"
        title="Client data handling"
        lede="What we do with the materials you share during an audit. We separate what's in place today from what we're proposing, so you know exactly where things stand."
      />
      <Container className="py-14 sm:py-16">
        <DraftNotice>
          This page is a preliminary draft for founder and legal review. Final terms will be set
          out in each client&apos;s written agreement, which takes precedence over this page.
        </DraftNotice>

        <div className="mt-10 grid max-w-5xl gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-line bg-paper-2/60 p-7">
            <h2 className="font-display text-2xl text-ink">Our working practices</h2>
            <ul className="mt-5 space-y-3.5">
              {inPlace.map((t) => (
                <li key={t} className="flex gap-3 leading-relaxed text-ink-3">
                  <Check className="mt-1 size-4 shrink-0 text-arc" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-dashed border-signal/40 p-7">
            <h2 className="font-display text-2xl text-ink">Proposed, not yet in place</h2>
            <ul className="mt-5 space-y-3.5">
              {proposed.map((t) => (
                <li key={t} className="flex gap-3 leading-relaxed text-ink-3">
                  <Clock3 className="mt-1 size-4 shrink-0 text-signal" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-relaxed text-muted">{retention.limits}</p>
            <StatusTag tone="signal" className="mt-5">
              {retention.approvalStatus}
            </StatusTag>
          </div>
        </div>

        <div className="mt-12">
          <Prose>
            <h2>What an audit may involve</h2>
            <p>
              To run an audit we hold conversations with your character and keep the resulting
              transcripts as evidence for our findings. We may also keep notes from scoping, a
              description of the character, and any change you ask us to retest.
            </p>
            <h2>What this service is not</h2>
            <p>
              The audit evaluates observable conversational behavior. It isn&apos;t a clinical or
              psychological assessment of anyone, and it doesn&apos;t certify that a model is
              psychologically safe. We don&apos;t claim AI systems have emotions or consciousness.
            </p>
            <h2>Mature-content engagements</h2>
            <p>
              For romance or intimacy-focused audits, content boundaries, permitted scenario types,
              and handling of sensitive transcripts are agreed in writing before any testing
              begins. These engagements are offered only for appropriate adult applications.
            </p>
          </Prose>
        </div>
      </Container>
    </>
  );
}
