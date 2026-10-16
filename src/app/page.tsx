import { Audience } from "@/components/sections/audience";
import { Audit } from "@/components/sections/audit";
import { Evaluate } from "@/components/sections/evaluate";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";
import { Process } from "@/components/sections/process";
import { Research } from "@/components/sections/research";
import { Romance } from "@/components/sections/romance";
import { Sample } from "@/components/sections/sample";
import { brand, offer } from "@/content/site";
import { siteUrl } from "@/lib/config";

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${brand.name} ${offer.name}`,
    serviceType: "AI character behavioral evaluation",
    description: brand.mission,
    url: siteUrl,
    provider: { "@type": "Organization", name: brand.name, url: siteUrl },
    offers: {
      "@type": "Offer",
      price: "750",
      priceCurrency: "USD",
      description: `${offer.tier}: ${offer.includes.join("; ")}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <Problem />
      <Evaluate />
      <Audit />
      <Romance />
      <Sample />
      <Process />
      <Audience />
      <Research />
      <Faq />
      <FinalCta sourcePath="/" />
    </>
  );
}
