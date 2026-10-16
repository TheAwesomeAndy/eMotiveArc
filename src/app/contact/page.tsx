import type { Metadata } from "next";
import { CalendarClock, ClipboardList, ShieldCheck } from "lucide-react";
import { InquiryForm } from "@/components/inquiry-form";
import { PageHeader } from "@/components/page-header";
import { Container } from "@/components/ui";
import { offer } from "@/content/site";
import { discoveryCallUrl, getLeadDeliveryMode, publicContactEmail } from "@/lib/config";

export const metadata: Metadata = {
  title: "Request an Audit",
  description:
    "Request a $750 founding-client AI Character Continuity Audit, or book an introductory conversation with EmotiveArc.",
  alternates: { canonical: "/contact" },
};

const notes = [
  {
    icon: ClipboardList,
    title: "What happens next",
    text: "We reply by email to arrange a short scoping conversation. Nothing is booked or billed until scope is agreed in writing.",
  },
  {
    icon: CalendarClock,
    title: "Timing",
    text: `Our target is an initial report within ${offer.reportTarget} of receiving usable inputs from you.`,
  },
  {
    icon: ShieldCheck,
    title: "Keep secrets out",
    text: "Please don't send API keys, private transcripts, or confidential system prompts through this form. We'll agree on a safe way to share access during scoping.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Request an audit"
        title={
          <>
            Tell us about your <span className="italic">character.</span>
          </>
        }
        lede={`Ask about the ${offer.price} founding-client audit, or start with an introductory conversation. A few sentences is enough to begin.`}
      />
      <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
        <div className="rounded-[1.75rem] border border-line bg-paper-2/60 p-6 sm:p-9">
          <InquiryForm
            deliveryMode={getLeadDeliveryMode()}
            sourcePath="/contact"
            discoveryCallUrl={discoveryCallUrl}
          />
        </div>
        <aside className="space-y-8" aria-label="About your inquiry">
          {notes.map((n) => (
            <div key={n.title} className="flex gap-4">
              <n.icon className="mt-1 size-5 shrink-0 text-arc" aria-hidden strokeWidth={1.75} />
              <div>
                <h2 className="font-display text-xl text-ink">{n.title}</h2>
                <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted">{n.text}</p>
              </div>
            </div>
          ))}
          {publicContactEmail ? (
            <p className="border-t border-line pt-6 text-sm text-muted">
              Prefer email? Write to{" "}
              <a className="text-ink underline underline-offset-4" href={`mailto:${publicContactEmail}`}>
                {publicContactEmail}
              </a>
              .
            </p>
          ) : null}
        </aside>
      </Container>
    </>
  );
}
