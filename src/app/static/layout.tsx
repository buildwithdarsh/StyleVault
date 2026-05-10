import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Handcrafted Fashion & Bespoke Tailoring in Jaipur",
  description:
    "Visit StyleVault's Jaipur boutique for curated ethnic wear, designer collections, and bespoke tailoring by 45+ partnered designers. Book a free styling session today.",
  openGraph: {
    title: "StyleVault Boutique — Handcrafted Fashion & Bespoke Tailoring in Jaipur",
    description:
      "Visit StyleVault's Jaipur boutique for curated ethnic wear, designer collections, and bespoke tailoring by 45+ partnered designers.",
    url: "https://stylevault.in/static",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "StyleVault Jaipur Boutique — Curated Fashion & Personal Style",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "StyleVault Boutique — Handcrafted Fashion & Bespoke Tailoring in Jaipur",
    description:
      "Visit StyleVault's Jaipur boutique for curated ethnic wear, designer collections, and bespoke tailoring by 45+ partnered designers.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://stylevault.in/static",
  },
};

export default function StaticBrochureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${playfair.variable} ${inter.variable}`}>
      {children}
    </div>
  );
}
