import Link from "next/link";
import { Wordmark } from "@/components/brand/logo";
import { Container } from "@/components/ui";
import { brand } from "@/content/site";
import { publicContactEmail } from "@/lib/config";

const columns = [
  {
    title: "Service",
    links: [
      { href: "/#audit", label: "Continuity Audit" },
      { href: "/#romance", label: "Romance & Intimacy" },
      { href: "/sample-report", label: "Sample report" },
      { href: "/#how-it-works", label: "How it works" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/#research", label: "Research foundation" },
      { href: "/#who", label: "Who we serve" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Policies",
    links: [
      { href: "/privacy", label: "Privacy notice" },
      { href: "/data-handling", label: "Client data handling" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-paper/10 bg-ink text-paper">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div className="max-w-sm">
            <Wordmark tone="light" />
            <p className="mt-5 font-display text-xl leading-snug text-paper/85 italic">
              {brand.tagline}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-paper/55">{brand.mission}</p>
            {publicContactEmail ? (
              <a
                href={`mailto:${publicContactEmail}`}
                className="mt-6 inline-block text-sm text-arc-bright underline-offset-4 hover:underline"
              >
                {publicContactEmail}
              </a>
            ) : null}
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-paper/55">
                  {col.title}
                </h2>
                <ul className="mt-4 space-y-3 text-sm">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-paper/75 transition-colors hover:text-paper"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-paper/10 pt-6 text-xs leading-relaxed text-paper/55 sm:flex-row sm:justify-between">
          <p>© 2026 EmotiveArc. {brand.descriptor}.</p>
          <p className="max-w-xl sm:text-right">
            EmotiveArc evaluates observable behavior. We don&apos;t diagnose, certify psychological
            safety, or claim AI systems have emotions or consciousness.
          </p>
        </div>
      </Container>
    </footer>
  );
}
