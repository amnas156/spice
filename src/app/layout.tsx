import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { siteConfig } from "@/config/site";
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
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Pure Traditional Kerala Spices`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
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
    url: siteConfig.url,
    title: `${siteConfig.name} | Pure Traditional Kerala Spices`,
    description: siteConfig.description,
    siteName: siteConfig.name,
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
    title: `${siteConfig.name} | Pure Traditional Kerala Spices`,
    description: siteConfig.description,
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
    "@id": `${siteConfig.url}/#organization`,
    "name": siteConfig.name,
    "url": siteConfig.url,
    "logo": `${siteConfig.url}/images/jadeed-logo-transparent.svg`,
    "image": `${siteConfig.url}/products/mulaku-podi.png`,
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
      "telephone": siteConfig.phone,
      "contactType": "customer service",
      "email": siteConfig.email,
      "availableLanguage": ["English", "Malayalam", "Hindi"]
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    "url": siteConfig.url,
    "name": siteConfig.name,
    "description": siteConfig.description,
    "publisher": {
      "@id": `${siteConfig.url}/#organization`
    }
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="flex min-h-full w-full flex-col overflow-x-hidden bg-cream text-charcoal">
        <a className="skip-link" href="#main-content">Skip to content</a>
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
