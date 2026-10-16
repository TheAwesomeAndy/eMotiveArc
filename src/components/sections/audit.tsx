import { ArrowRight, Check, Clock, FileSearch, RefreshCcw, UserCheck } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { ButtonLink, Container, SectionHeading } from "@/components/ui";
import { offer } from "@/content/site";

const highlights = [
  {
    icon: UserCheck,
    title: "Human review",
    text: "An expert reviewer reads the transcripts and decides what counts as a real finding.",
  },
  {
    icon: FileSearch,
    title: "Evidence, not scores",
    text: "Every finding quotes the conversations that support it, so your team can see it for themselves.",
  },
  {
    icon: Clock,
    title: `${offer.reportTarget}`,
    text: "Our target for the initial report, counted from when we have usable inputs from you.",
  },
  {
    icon: RefreshCcw,
    title: "One retest included",
    text: "After you make an agreed change, we rerun the relevant scenarios to check the fix.",
  },
];

export function Audit() {
  return (
    <section id="audit" aria-labelledby="audit-title" className="border-t border-line py-24 sm:py-28">
      <Container>
        <SectionHeading
          id="audit-title"
          eyebrow="Founding-client audit"
          title={
            <>
              The AI Character <span className="italic">Continuity Audit.</span>
            </>
          }
          lede="A focused, expert-reviewed evaluation of one character. It's a service, not a software subscription. You get a clear report, the transcripts behind it, and a short list of what to fix first."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.15fr_1fr]">
          <Reveal className="relative overflow-hidden rounded-[1.75rem] bg-ink p-8 text-paper sm:p-10">
            <div aria-hidden className="bg-grid-dark pointer-events-none absolute inset-0 opacity-60" />
            <div className="relative">
              <p className="font-mono text-[0.7rem] tracking-[0.16em] text-arc-bright uppercase">
                {offer.tier}
              </p>
              <div className="mt-5 flex items-end gap-3">
                <span className="font-display text-7xl leading-none">{offer.price}</span>
                <span className="pb-2 text-paper/60">{offer.priceNote.toLowerCase()}, one character</span>
              </div>
              <ul className="mt-9 space-y-3.5">
                {offer.includes.map((item) => (
                  <li key={item} className="flex gap-3 leading-relaxed text-paper/85">
                    <Check className="mt-1 size-4 shrink-0 text-arc-bright" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/contact?next=audit" variant="light">
                  Request an Audit
                  <ArrowRight className="size-4" aria-hidden />
                </ButtonLink>
                <ButtonLink href="/contact?next=discovery" variant="outline-light">
                  Talk it through first
                </ButtonLink>
              </div>
              <p className="mt-6 text-xs leading-relaxed text-paper/55">
                Founding-client pricing applies to early engagements and may change. Scope,
                access, and timing are confirmed in writing before any work or payment.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {highlights.map((h, i) => (
              <Reveal key={h.title} delay={i * 70} className="rounded-3xl border border-line bg-paper-2/60 p-6">
                <h.icon className="size-5 text-arc" aria-hidden strokeWidth={1.75} />
                <h3 className="mt-4 font-display text-xl text-ink">{h.title}</h3>
                <p className="mt-2 text-[0.93rem] leading-relaxed text-muted">{h.text}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="mt-6 grid gap-6 rounded-3xl border border-line p-7 sm:p-9 md:grid-cols-2">
          <div>
            <h3 className="font-display text-xl text-ink">What we&apos;ll need from you</h3>
            <p className="mt-3 leading-relaxed text-muted">
              At kickoff, the character&apos;s system prompt and model access, or you can run our
              scenario scripts yourself, plus your main concerns. We agree a secure way to share
              access during scoping. Please don&apos;t send credentials, private transcripts, or
              system prompts through this website.
            </p>
          </div>
          <div>
            <h3 className="font-display text-xl text-ink">What we won&apos;t promise</h3>
            <p className="mt-3 leading-relaxed text-muted">
              We can&apos;t promise to find failures. Some audits find no substantial problems,
              and that&apos;s a useful result too. We also can&apos;t guarantee that a change will
              fix what we find. The retest exists to check exactly that. The audit doesn&apos;t
              certify a character as psychologically safe.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
