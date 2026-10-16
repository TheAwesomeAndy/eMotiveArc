import { Quote } from "lucide-react";
import { sampleAudit } from "@/content/sample-audit";
import { isPreview } from "@/lib/config";

function Line({ speaker, text }: { speaker: string; text: string }) {
  return (
    <div className="grid gap-1 text-[0.92rem] leading-relaxed sm:grid-cols-[5.5rem_1fr] sm:gap-3">
      <span className="pt-0.5 font-mono text-[0.68rem] tracking-[0.1em] text-faint uppercase">
        {speaker}
      </span>
      <span className={speaker === "User" ? "text-ink" : "text-ink-3"}>{text}</span>
    </div>
  );
}

/**
 * Short approved excerpt from the Captain Ivy Marlow sample. Renders nothing
 * in live builds until `sampleAudit.excerpt` is filled in, and a clearly
 * marked placeholder in preview builds.
 */
export function SampleExcerpt() {
  const ex = sampleAudit.excerpt;

  if (!ex) {
    if (!isPreview) return null;
    return (
      <div className="rounded-3xl border-2 border-dashed border-signal/40 bg-signal-soft/30 p-7 text-sm leading-relaxed text-ink-3">
        <p className="font-mono text-[0.7rem] tracking-[0.14em] text-signal uppercase">
          Placeholder · preview only
        </p>
        <p className="mt-3">
          Missing asset: the approved {sampleAudit.excerptFindingId} {sampleAudit.excerptTopic}{" "}
          example from the Captain Ivy Marlow audit-1.1 report (setup, the earlier and later
          exchange, and the reviewed finding). Copy it word for word into{" "}
          <code className="font-mono text-[0.8rem]">src/content/sample-audit.ts</code>. Nothing is
          shown on the live site until it&apos;s filled in.
        </p>
      </div>
    );
  }

  return (
    <figure
      className="overflow-hidden rounded-3xl border border-line bg-paper"
      aria-labelledby="f01-title"
    >
      <div className="border-b border-line bg-paper-2 px-6 py-5 sm:px-7">
        <p className="font-mono text-[0.7rem] tracking-[0.14em] text-signal uppercase">
          From the sample report · Finding {ex.findingId}
        </p>
        <h3 id="f01-title" className="mt-2 font-display text-xl leading-snug text-ink">
          {ex.title}
        </h3>
        <ul className="mt-3 flex flex-wrap gap-2" aria-label="Finding labels">
          {ex.labels.map((l) => (
            <li
              key={l}
              className="rounded-full border border-line bg-paper px-2.5 py-0.5 font-mono text-[0.66rem] tracking-[0.08em] text-muted uppercase"
            >
              {l}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[0.92rem] leading-relaxed text-ink-3">{ex.setup}</p>
      </div>

      <div className="space-y-3 px-6 py-5 sm:px-7">
        {ex.earlier.map((line, i) => (
          <Line key={`e${i}`} {...line} />
        ))}
        <p className="py-1 text-center font-mono text-[0.72rem] tracking-[0.06em] text-faint">
          {ex.gap}
        </p>
        <div className="space-y-3 rounded-2xl border border-signal/25 bg-signal-soft/40 p-4">
          {ex.later.map((line, i) => (
            <Line key={`l${i}`} {...line} />
          ))}
        </div>
      </div>

      <figcaption className="border-t border-line bg-ink px-6 py-6 text-paper sm:px-7">
        <div className="flex gap-4">
          <Quote className="mt-1 size-5 shrink-0 text-arc-bright" aria-hidden />
          <div className="space-y-3">
            <p className="leading-relaxed text-paper/90">{ex.finding}</p>
            {ex.note ? <p className="text-[0.88rem] leading-relaxed text-paper/65">{ex.note}</p> : null}
          </div>
        </div>
        {ex.intervention ? (
          <div className="mt-5 border-t border-paper/10 pt-4">
            <p className="font-mono text-[0.68rem] tracking-[0.12em] text-signal-bright uppercase">
              Proposed intervention (not yet tested)
            </p>
            <p className="mt-1.5 text-[0.88rem] leading-relaxed text-paper/70">{ex.intervention}</p>
          </div>
        ) : null}
      </figcaption>
    </figure>
  );
}
