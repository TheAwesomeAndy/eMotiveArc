"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Wordmark } from "@/components/brand/logo";
import { buttonClass } from "@/components/ui";
import { nav } from "@/content/site";
import { cn } from "@/lib/cn";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-colors duration-300",
        scrolled || open
          ? "border-line/80 bg-paper/90 backdrop-blur-md"
          : "border-transparent bg-paper/0",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link
          href="/"
          className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
          aria-label="EmotiveArc home"
          onClick={close}
        >
          <Wordmark />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-[0.9rem] text-muted">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-sm transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden sm:block">
            <Link
              href="/contact"
              className={buttonClass("primary", "px-4 py-2.5 text-sm")}
              aria-current={pathname === "/contact" ? "page" : undefined}
            >
              Request an Audit
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </span>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full text-ink hover:bg-ink/5 focus-visible:outline-2 focus-visible:outline-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          ref={panelRef}
          className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-paper lg:hidden"
        >
          <nav aria-label="Mobile" className="mx-auto max-w-6xl px-5 py-6 sm:px-8">
            <ul className="divide-y divide-line">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    className="flex items-center justify-between py-4 font-display text-2xl text-ink"
                  >
                    {item.label}
                    <ArrowRight className="size-5 text-faint" aria-hidden />
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/sample-report"
                  onClick={close}
                  className="flex items-center justify-between py-4 font-display text-2xl text-ink"
                >
                  Sample report
                  <ArrowRight className="size-5 text-faint" aria-hidden />
                </Link>
              </li>
            </ul>
            <Link href="/contact" onClick={close} className={buttonClass("primary", "mt-8 w-full")}>
              Request an Audit
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
