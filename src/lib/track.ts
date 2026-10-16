type PlausibleWindow = Window & {
  plausible?: (event: string, opts?: { props?: Record<string, string> }) => void;
};

/** Safe to call anywhere on the client. A no-op while analytics are off. */
export function trackEvent(name: string, props?: Record<string, string>) {
  if (typeof window === "undefined") return;
  (window as PlausibleWindow).plausible?.(name, props ? { props } : undefined);
}
