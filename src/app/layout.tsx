import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jadeedspices.com"),
  title: {
    default: "JADEED Spices & Oil | Pure Traditional Kerala Spices",
    template: "%s | JADEED Spices & Oil"
  },
  description: "Sourcing the highest quality Turmeric Powder, Chilli Powder, Coriander Powder, and Cold-Pressed Coconut Oil (Velichenna) from organic farms in Wayanad and Idukki, Kerala.",
  keywords: ["JADEED Spices", "Kerala Spices", "Velichenna", "Chilli Powder", "Turmeric Powder", "Coriander Powder", "Wayanad Spices", "Pure Coconut Oil Kerala"],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://jadeedspices.com",
    title: "JADEED Spices & Oil | Pure Traditional Kerala Spices",
    description: "Sourcing the highest quality Turmeric, Chilli, Coriander Powder, and Cold-Pressed Coconut Oil (Velichenna) from organic farms in Wayanad and Idukki, Kerala.",
    siteName: "JADEED Spices & Oil",
    images: [
      {
        url: "/products/mulaku-podi.png",
        width: 800,
        height: 1000,
        alt: "JADEED Premium Kerala Spices",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JADEED Spices & Oil | Pure Traditional Kerala Spices",
    description: "Sourcing the highest quality Turmeric, Chilli, Coriander Powder, and Cold-Pressed Coconut Oil (Velichenna) from organic farms in Wayanad and Idukki, Kerala.",
    images: ["/products/mulaku-podi.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://jadeedspices.com/#organization",
    "name": "JADEED Spices & Oil",
    "url": "https://jadeedspices.com",
    "logo": "https://jadeedspices.com/images/jadeed-logo.svg",
    "image": "https://jadeedspices.com/products/mulaku-podi.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Chirakkal, Kuttumunda, Naduvath",
      "addressLocality": "Wayanad",
      "addressRegion": "Kerala",
      "postalCode": "679328",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-98765-43210",
      "contactType": "customer service",
      "email": "enquire@jadeed.com",
      "availableLanguage": ["English", "Malayalam", "Hindi"]
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://jadeedspices.com/#website",
    "url": "https://jadeedspices.com",
    "name": "JADEED Spices & Oil",
    "description": "Pure Traditional Kerala Spices & Cold-Pressed Oils",
    "publisher": {
      "@id": "https://jadeedspices.com/#organization"
    }
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-sand-50 text-cinnamon-950 overflow-x-hidden w-full">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
