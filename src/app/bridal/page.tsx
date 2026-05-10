import type { Metadata } from "next";
import BridalPage from "./BridalClient";

export const metadata: Metadata = {
  title: "Bridal Collection — Designer Lehengas & Wedding Wear",
  description:
    "Shop bridal lehengas, reception gowns, and wedding trousseau from top Indian designers. Custom fittings and express delivery available across 50+ cities.",
  alternates: {
    canonical: "https://stylevault.in/bridal",
  },
};

export default function Page() {
  return <BridalPage />;
}
