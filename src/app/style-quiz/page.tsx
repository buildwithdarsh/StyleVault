import type { Metadata } from "next";
import StyleQuizPage from "./StyleQuizClient";

export const metadata: Metadata = {
  title: "Style Quiz — Find Your Fashion Aesthetic",
  description:
    "Take our quick style quiz to discover your fashion personality and get personalized outfit recommendations from 500+ boutiques across India.",
  alternates: {
    canonical: "https://stylevault.in/style-quiz",
  },
};

export default function Page() {
  return <StyleQuizPage />;
}
