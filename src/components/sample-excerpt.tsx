import { Quote } from "lucide-react";
import { sampleAudit } from "@/content/sample-audit";
import { isPreview } from "@/lib/config";

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
    <figure className="overflow-hidden rounded-3xl border border-line bg-paper">
      <div className="border-b border-line bg-paper-2 px-7 py-5">
        <p className="font-mono text-[0.7rem] tracking-[0.14em] text-faint uppercase">Setup</p>
        <p className="mt-2 leading-relaxed text-ink-3">{ex.setup}</p>
      </div>
      <div className="grid gap-px bg-line md:grid-cols-2">
        {(
          [
            ["Earlier", ex.earlier, "text-faint"],
            ["Later", ex.later, "text-signal"],
          ] as const
        ).map(([label, lines, color]) => (
          <div key={label} className="bg-paper px-7 py-6">
            <p className={`font-mono text-[0.7rem] tracking-[0.14em] uppercase ${color}`}>{label}</p>
            <div className="mt-3 space-y-3">
              {lines.map((line, i) => (
                <blockquote key={i} className="text-[0.95rem] leading-relaxed">
                  <span className="font-medium text-ink">{line.speaker}: </span>
                  <span className="text-ink-3">{line.text}</span>
                </blockquote>
              ))}
            </div>
          </div>
        ))}
      </div>
      <figcaption className="flex gap-4 border-t border-line bg-ink px-7 py-6 text-paper">
        <Quote className="mt-1 size-5 shrink-0 text-arc-bright" aria-hidden />
        <div>
          <p className="font-mono text-[0.7rem] tracking-[0.14em] text-arc-bright uppercase">
            Finding {ex.findingId}
            {ex.priority ? ` · ${ex.priority}` : ""}
          </p>
          <p className="mt-2 leading-relaxed text-paper/85">{ex.finding}</p>
        </div>
      </figcaption>
    </figure>
  );
}
