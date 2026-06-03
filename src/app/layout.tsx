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
  title: "Kerala Spices & Co. | Pure Traditional Spice Powders & Cold-Pressed Coconut Oil",
  description: "Sourcing the highest quality Turmeric Powder, Chilli Powder, Coriander Powder, and Cold-Pressed Coconut Oil (Velichenna) from organic farms in Wayanad and Idukki, Kerala.",
  keywords: ["Kerala Spices", "Velichenna", "Chilli Powder", "Turmeric Powder", "Coriander Powder", "Wayanad Spices", "Pure Coconut Oil Kerala"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-sand-50 text-cinnamon-950">
        {children}
      </body>
    </html>
  );
}
