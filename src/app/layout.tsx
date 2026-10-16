import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Newsreader } from "next/font/google";
import { Analytics } from "@/components/analytics";
import { PreviewRibbon } from "@/components/preview-ribbon";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { brand } from "@/content/site";
import { isPreview, siteUrl } from "@/lib/config";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const description =
  "EmotiveArc audits whether AI characters carry the emotional consequences of earlier conversations into later ones. Human-reviewed continuity audits for companion, romance, storytelling and game characters. Founding-client audit: $750.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${brand.name}: AI Character Continuity Audits`,
    template: `%s · ${brand.name}`,
  },
  description,
  applicationName: brand.name,
  keywords: [
    "AI character evaluation",
    "conversational AI testing",
    "AI companion quality",
    "character consistency",
    "emotional continuity",
    "relational continuity",
    "LLM memory evaluation",
    "NPC dialogue testing",
  ],
  openGraph: {
    type: "website",
    siteName: brand.name,
    title: `${brand.name}: ${brand.descriptor}`,
    description,
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.name}: ${brand.descriptor}`,
    description,
  },
  alternates: { canonical: "/" },
  robots: isPreview
    ? { index: false, follow: false, googleBot: { index: false, follow: false } }
    : { index: true, follow: true },
  formatDetection: { email: false, telephone: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#0c1424",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${newsreader.variable} ${jetbrains.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Enables scroll-reveal styles only when JavaScript runs. */}
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-50 rounded-md bg-ink px-4 py-2 text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <PreviewRibbon />
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
