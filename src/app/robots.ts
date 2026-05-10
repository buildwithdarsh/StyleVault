import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/cart", "/checkout", "/dashboard", "/orders", "/tailor", "/wishlist"],
      },
    ],
    sitemap: "https://stylevault.in/sitemap.xml",
  };
}
