import type { Metadata } from "next";
import AppointmentsPage from "./AppointmentsClient";

export const metadata: Metadata = {
  title: "Book a Styling Appointment",
  description:
    "Schedule a personal styling session or measurement appointment at StyleVault. Available in-store and virtually across 50+ cities in India.",
  alternates: {
    canonical: "https://stylevault.in/appointments",
  },
};

export default function Page() {
  return <AppointmentsPage />;
}
