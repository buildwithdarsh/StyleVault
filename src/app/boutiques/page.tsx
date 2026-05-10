import type { Metadata } from "next";
import BoutiquesPage from "./BoutiquesClient";

export const metadata: Metadata = {
  title: "Explore 500+ Verified Fashion Boutiques Across India",
  description:
    "Discover curated independent fashion boutiques across Jaipur, Mumbai, Delhi, Bengaluru, and Chennai. Verified stores, authentic designs, and doorstep delivery.",
  alternates: {
    canonical: "https://stylevault.in/boutiques",
  },
};

export default function Page() {
  return <BoutiquesPage />;
}
