import type { Metadata } from "next";
import SubscriptionPage from "./SubscriptionClient";

export const metadata: Metadata = {
  title: "Subscription Style Box — Curated Fashion Delivered Monthly",
  description:
    "Get a monthly box of handpicked fashion curated to your style preferences. Flexible plans, easy returns, and exclusive boutique pieces from across India.",
  alternates: {
    canonical: "https://stylevault.in/subscription",
  },
};

export default function Page() {
  return <SubscriptionPage />;
}
