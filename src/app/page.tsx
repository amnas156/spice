import React from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ScrollShowcase from "@/components/ScrollShowcase";

const ProductsCatalog = dynamic(() => import("@/components/ProductsCatalog"));
const WhyChooseUs = dynamic(() => import("@/components/WhyChooseUs"));
const Contact = dynamic(() => import("@/components/Contact"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex flex-1 flex-col">
        <ScrollShowcase>
          <Hero />
          <ProductsCatalog />
        </ScrollShowcase>
        <WhyChooseUs />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
