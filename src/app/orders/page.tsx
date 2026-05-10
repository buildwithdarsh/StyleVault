import type { Metadata } from "next";
import OrdersPage from "./OrdersClient";

export const metadata: Metadata = {
  title: "My Orders",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <OrdersPage />;
}
