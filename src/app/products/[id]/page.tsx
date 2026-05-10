import type { Metadata } from "next";
import { products, boutiques } from "@/lib/mock-data";
import ProductDetailPage from "./ProductClient";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return {
      title: "Product Not Found",
      robots: { index: false, follow: false },
    };
  }

  const title = `${product.name} by ${product.boutiqueName}`;
  const description = `${product.description.slice(0, 150)}. ₹${product.price.toLocaleString("en-IN")} — ${product.fabric}, available in ${product.sizes.filter((s) => s.available).length} sizes.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://stylevault.in/products/${id}`,
    },
    openGraph: {
      title,
      description,
      url: `https://stylevault.in/products/${id}`,
      images: product.images.map((img) => ({
        url: img,
        width: 800,
        height: 1000,
        alt: product.name,
      })),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [product.images[0]],
    },
  };
}

export async function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const product = products.find((p) => p.id === id) || products[0];
  const boutique = boutiques.find((b) => b.id === product.boutiqueId);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    sku: product.sku,
    brand: {
      "@type": "Brand",
      name: product.boutiqueName,
    },
    offers: {
      "@type": "Offer",
      url: `https://stylevault.in/products/${product.id}`,
      priceCurrency: "INR",
      price: product.price,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: product.boutiqueName,
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    material: product.fabric,
    countryOfOrigin: product.countryOfOrigin,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://stylevault.in",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Catalog",
        item: "https://stylevault.in/catalog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.category,
        item: `https://stylevault.in/catalog?category=${product.category}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: product.name,
        item: `https://stylevault.in/products/${product.id}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ProductDetailPage />
    </>
  );
}
