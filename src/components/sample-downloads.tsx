import { Download, FileClock } from "lucide-react";
import Link from "next/link";
import { buttonClass } from "@/components/ui";
import { sampleFiles } from "@/content/sample-audit";
import { publicAssetExists } from "@/lib/assets";
import { isPreview } from "@/lib/config";
import { cn } from "@/lib/cn";

/**
 * Download buttons for the sample PDFs. Each one activates automatically
 * when its file exists in /public/sample/ at build time.
 */
export function SampleDownloads({ tone = "ink" }: { tone?: "ink" | "light" }) {
  const files = [sampleFiles.report, sampleFiles.prospectSheet].map((f) => ({
    ...f,
    available: publicAssetExists(f.path),
  }));
  const anyMissing = files.some((f) => !f.available);

  return (
    <div>
      <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {files.map((f, i) =>
          f.available ? (
            <li key={f.path}>
              <a
                href={f.path}
                target="_blank"
                rel="noopener"
                className={buttonClass(
                  i === 0 ? (tone === "ink" ? "primary" : "light") : tone === "ink" ? "secondary" : "outline-light",
                  "w-full sm:w-auto",
                )}
              >
                <Download className="size-4" aria-hidden />
                {f.label}
                <span className="font-mono text-[0.7rem] opacity-60">PDF</span>
              </a>
            </li>
          ) : isPreview ? (
            <li
              key={f.path}
              className={cn(
                "flex items-start gap-3 rounded-2xl border border-dashed px-4 py-3 text-sm",
                tone === "ink" ? "border-signal/40 bg-signal-soft/40 text-ink-3" : "border-signal-bright/40 text-paper/75",
              )}
            >
              <FileClock className="mt-0.5 size-4 shrink-0 text-signal" aria-hidden />
              <span>
                <strong className="font-medium">Placeholder: {f.label}.</strong> Add{" "}
                <code className="font-mono text-[0.78rem]">public{f.path}</code> to activate.
                <span className="block text-xs opacity-70">Shown in preview builds only.</span>
              </span>
            </li>
          ) : null,
        )}
      </ul>
      {anyMissing && !isPreview ? (
        <p className={cn("mt-3 text-sm", tone === "ink" ? "text-muted" : "text-paper/60")}>
          The full sample report is available on request.{" "}
          <Link href="/contact?next=audit" className="underline underline-offset-4">
            Ask for a copy
          </Link>
          .
        </p>
      ) : null}
    </div>
  );
}
