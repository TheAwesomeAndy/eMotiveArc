import { getLeadDeliveryMode, isPreview } from "@/lib/config";

/** Thin notice shown on every page until NEXT_PUBLIC_SITE_STAGE=live. */
export function PreviewRibbon() {
  if (!isPreview) return null;
  const formOffline = getLeadDeliveryMode() === "preview";
  return (
    <div
      role="note"
      className="bg-ink-2 px-5 py-2 text-center font-mono text-[0.7rem] tracking-[0.08em] text-paper/70"
    >
      <span
        aria-hidden
        className="mr-2 inline-block size-1.5 translate-y-[-1px] rounded-full bg-signal-bright align-middle"
      />
      PREVIEW BUILD · Not yet published
      {formOffline ? " · The inquiry form isn't delivering messages yet" : null}
    </div>
  );
}
