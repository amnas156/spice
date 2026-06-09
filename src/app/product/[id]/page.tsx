import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductDetailClient from "@/components/ProductDetailClient";
import { productsData } from "@/lib/products";
import { siteConfig } from "@/config/site";
import { getProductImage } from "@/lib/commerce";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = productsData.find((p) => p.id === id) || productsData[0];
  
  const siteUrl = siteConfig.url;
  const ogImage = getProductImage(product, product.variants[2] ?? product.variants[0]);
  
  return {
    title: `JADEED ${product.name} (${product.malayalam})`,
    description: product.description,
    keywords: [
      `JADEED ${product.name}`,
      product.name,
      product.subtitle,
      product.malayalam,
      "Kerala Spices",
      "Organic Wayanad Spices"
    ],
    openGraph: {
      type: "article",
      url: `${siteUrl}/product/${product.id}`,
      title: `JADEED ${product.name} (${product.malayalam}) | ${siteConfig.name}`,
      description: product.description,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 800,
          height: 1000,
          alt: `JADEED ${product.name} packaging`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `JADEED ${product.name} (${product.malayalam}) | ${siteConfig.name}`,
      description: product.description,
      images: [ogImage],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = productsData.find((p) => p.id === id) || productsData[0];

  const siteUrl = siteConfig.url;
  const mainImage = getProductImage(product, product.variants[2] ?? product.variants[0]);

  // Structured JSON-LD Product Data
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${siteUrl}/product/${product.id}/#product`,
    "name": `JADEED ${product.name}`,
    "image": `${siteUrl}${mainImage}`,
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": "JADEED"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "INR",
      "lowPrice": product.variants[0]?.price,
      "highPrice": product.variants[product.variants.length - 1]?.price,
      "offerCount": product.variants.length,
      "price": product.variants[0]?.price,
      "availability": "https://schema.org/InStock",
      "url": `${siteUrl}/product/${product.id}`
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating,
      "reviewCount": product.reviewsCount
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <Navbar />
      <main id="main-content" className="min-h-screen bg-cream pt-28 pb-20 font-sans antialiased text-charcoal">
        <ProductDetailClient product={product} />
      </main>
      <Footer />
    </>
  );
}
