import { faqItems, storeInfo } from "@/lib/static-data";
import StaticBrochurePage from "./StaticClient";

export default function Page() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    name: storeInfo.name,
    url: "https://stylevault.in/static",
    telephone: storeInfo.phone,
    email: storeInfo.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: storeInfo.address,
      addressLocality: storeInfo.city,
      addressRegion: storeInfo.state,
      postalCode: storeInfo.pincode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 26.9124,
      longitude: 75.7872,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "10:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "21:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "11:00",
        closes: "18:00",
      },
    ],
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=1000&fit=crop",
    priceRange: "₹₹₹",
    sameAs: [storeInfo.instagram, storeInfo.pinterest],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <StaticBrochurePage />
    </>
  );
}
