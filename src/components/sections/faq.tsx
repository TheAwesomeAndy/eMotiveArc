import { Plus } from "lucide-react";
import Link from "next/link";
import { Container, SectionHeading } from "@/components/ui";
import { retention } from "@/content/policies";

const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: "Is this a software product?",
    a: "No. The audit is a specialized evaluation service. We design scenarios for your character, run them, and a person reviews the results. There's nothing to install and no subscription.",
  },
  {
    q: "What if you don't find anything?",
    a: "That can happen, and we'll tell you plainly. A report that finds no substantial continuity failures, with the transcripts to show it, is still useful evidence for your team.",
  },
  {
    q: "Do you need our system prompt or model access keys?",
    a: "Not through this website, ever. During scoping we agree on how we'll converse with your character, for example through a test build or sandbox account you control. We test behavior through conversation, so we don't ask for your internal prompts.",
  },
  {
    q: "Which models or frameworks do you work with?",
    a: "We test the behavior of your character as your users experience it, so the method isn't tied to a particular model provider. We confirm the practical details for your setup during scoping.",
  },
  {
    q: "Do you evaluate adult or romantic characters?",
    a: (
      <>
        Yes, as an optional specialization for appropriate adult applications, with content
        boundaries agreed in writing first. Our work on mature scenarios has so far been exercised
        with offline test fixtures. See{" "}
        <Link href="/#romance" className="underline underline-offset-4">
          Romance &amp; Intimacy Continuity
        </Link>
        .
      </>
    ),
  },
  {
    q: "How do you handle our data?",
    a: (
      <>
        We aim to collect only what the audit needs. {retention.short}{" "}
        Read the{" "}
        <Link href="/data-handling" className="underline underline-offset-4">
          client data handling
        </Link>{" "}
        page for what&apos;s in place today and what&apos;s still proposed.
      </>
    ),
  },
];

export function Faq() {
  return (
    <section aria-labelledby="faq-title" className="border-t border-line bg-paper-2 py-24 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <SectionHeading id="faq-title" eyebrow="Questions" title="Straight answers." />
        <div className="divide-y divide-line border-y border-line">
          {faqs.map((f) => (
            <details key={f.q} className="group py-1">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-xl text-ink marker:hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink [&::-webkit-details-marker]:hidden">
                {f.q}
                <Plus
                  className="size-5 shrink-0 text-muted transition-transform duration-300 group-open:rotate-45"
                  aria-hidden
                />
              </summary>
              <div className="pb-6 pr-10 leading-relaxed text-muted">{f.a}</div>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
