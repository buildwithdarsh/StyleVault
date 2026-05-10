import type { Metadata } from "next";
import TailorPage from "./TailorClient";

export const metadata: Metadata = {
  title: "Tailor Panel",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <TailorPage />;
}
