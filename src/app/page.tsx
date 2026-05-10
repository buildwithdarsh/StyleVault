import type { Metadata } from "next";
import HomePage from "./HomeClient";

export const metadata: Metadata = {
  title: "Shop Curated Indian Fashion from 500+ Verified Boutiques",
  description:
    "Explore handwoven sarees, bridal lehengas, and custom-tailored ethnic wear from 500+ verified boutiques across 50+ Indian cities. Same-day delivery in metro areas.",
  alternates: {
    canonical: "https://stylevault.in",
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "StyleVault",
            url: "https://stylevault.in",
            description:
              "India's curated platform for boutique fashion, custom tailoring, and personal styling from 500+ verified boutiques.",
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: "https://stylevault.in/catalog?q={search_term_string}",
              },
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "StyleVault",
            url: "https://stylevault.in",
            logo: "https://stylevault.in/icon.svg",
            description:
              "India's curated platform for boutique fashion, custom tailoring, and personal styling.",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+91-1800-123-78953",
              contactType: "customer service",
              areaServed: "IN",
              availableLanguage: ["English", "Hindi"],
            },
            sameAs: [
              "https://instagram.com/stylevault",
              "https://pinterest.com/stylevault",
            ],
          }),
        }}
      />
      <HomePage />
    </>
  );
}
