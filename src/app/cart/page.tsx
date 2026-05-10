import type { Metadata } from "next";
import CartPage from "./CartClient";

export const metadata: Metadata = {
  title: "Your Shopping Cart",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <CartPage />;
}
