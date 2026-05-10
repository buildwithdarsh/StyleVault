import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://stylevault.in"),
  title: {
    default: "StyleVault — 500+ Curated Boutiques for Indian Fashion",
    template: "%s — StyleVault",
  },
  description:
    "Shop handwoven sarees, custom bridal lehengas, and designer ethnic wear from 500+ verified boutiques across India. Free styling consultations available.",
  keywords: [
    "Indian fashion",
    "boutique fashion",
    "sarees online",
    "bridal lehenga",
    "custom tailoring",
    "ethnic wear",
    "designer fashion India",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://stylevault.in",
    siteName: "StyleVault",
    title: "StyleVault — 500+ Curated Boutiques for Indian Fashion",
    description:
      "Shop handwoven sarees, custom bridal lehengas, and designer ethnic wear from 500+ verified boutiques across India. Free styling consultations available.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "StyleVault — Curated Indian Fashion from 500+ Boutiques",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "StyleVault — 500+ Curated Boutiques for Indian Fashion",
    description:
      "Shop handwoven sarees, custom bridal lehengas, and designer ethnic wear from 500+ verified boutiques across India.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://stylevault.in",
  },
  robots: {
    index: true,
    follow: true,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "StyleVault",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#7c3aed",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-1 pb-16 md:pb-0">{children}</main>
        <Footer />
        <MobileBottomNav />
      </body>
    </html>
  );
}
