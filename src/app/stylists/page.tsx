import type { Metadata } from "next";
import StylistsPage from "./StylistsClient";

export const metadata: Metadata = {
  title: "Personal Stylists — Expert Fashion Advice",
  description:
    "Connect with certified fashion stylists for personalized outfit curation, wardrobe planning, and occasion-specific styling across India.",
  alternates: {
    canonical: "https://stylevault.in/stylists",
  },
};

export default function Page() {
  return <StylistsPage />;
}
