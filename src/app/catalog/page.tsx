import type { Metadata } from "next";
import CatalogPage from "./CatalogClient";

export const metadata: Metadata = {
  title: "Shop Indian Fashion — Sarees, Lehengas, Kurtas & More",
  description:
    "Browse thousands of handpicked ethnic and western wear from 500+ verified boutiques. Filter by occasion, fabric, price, and style. Free shipping on orders over ₹2,999.",
  alternates: {
    canonical: "https://stylevault.in/catalog",
  },
};

export default function Page() {
  return <CatalogPage />;
}
