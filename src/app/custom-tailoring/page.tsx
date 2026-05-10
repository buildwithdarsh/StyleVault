import type { Metadata } from "next";
import CustomTailoringPage from "./CustomTailoringClient";

export const metadata: Metadata = {
  title: "Custom Tailoring — Made-to-Measure Indian Wear",
  description:
    "Get bespoke garments tailored to your measurements by 100+ master tailors. Choose fabric, design, and embroidery. 95% first-fit rate with real-time order tracking.",
  alternates: {
    canonical: "https://stylevault.in/custom-tailoring",
  },
};

export default function Page() {
  return <CustomTailoringPage />;
}
