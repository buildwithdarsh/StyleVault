import type { Metadata } from "next";
import WishlistPage from "./WishlistClient";

export const metadata: Metadata = {
  title: "My Wishlist",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <WishlistPage />;
}
