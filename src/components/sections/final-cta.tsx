import { Check } from "lucide-react";
import { BrandMark } from "@/components/brand/logo";
import { InquiryForm } from "@/components/inquiry-form";
import { Container } from "@/components/ui";
import { brand, offer } from "@/content/site";
import { discoveryCallUrl, getLeadDeliveryMode } from "@/lib/config";

export function FinalCta({ sourcePath = "/" }: { sourcePath?: string }) {
  return (
    <section
      id="request-audit"
      aria-labelledby="cta-title"
      className="relative overflow-hidden bg-ink py-24 text-paper sm:py-28"
    >
      <div aria-hidden className="bg-grid-dark pointer-events-none absolute inset-0" />
      <Container className="relative grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <div>
          <BrandMark tone="light" className="size-12" />
          <h2
            id="cta-title"
            className="mt-8 font-display text-[2.3rem] leading-[1.05] tracking-[-0.015em] text-balance sm:text-5xl"
          >
            Find out what your character{" "}
            <span className="text-arc-bright italic">carries forward.</span>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-paper/70">
            Request a {offer.price} founding-client audit, or start with a short introductory
            conversation about your character and what you&apos;d like to test.
          </p>
          <ul className="mt-8 space-y-3 text-paper/80">
            {[
              `${offer.price} fixed fee for one character`,
              `${offer.scenarios} tailored scenarios, human-reviewed`,
              `${offer.reportTarget} initial report target`,
              "One regression retest included",
            ].map((t) => (
              <li key={t} className="flex gap-3">
                <Check className="mt-1 size-4 shrink-0 text-arc-bright" aria-hidden />
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-10 font-display text-lg text-paper/55 italic">{brand.tagline}</p>
        </div>

        <div className="rounded-[1.75rem] bg-paper p-6 text-ink shadow-[0_40px_90px_-40px_rgb(0_0_0/0.7)] sm:p-9">
          <InquiryForm
            deliveryMode={getLeadDeliveryMode()}
            sourcePath={sourcePath}
            discoveryCallUrl={discoveryCallUrl}
          />
        </div>
      </Container>
    </section>
  );
}
