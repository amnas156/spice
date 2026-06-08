import React from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

const ProductsCatalog = dynamic(() => import("@/components/ProductsCatalog"));
const WhyChooseUs = dynamic(() => import("@/components/WhyChooseUs"));
const Contact = dynamic(() => import("@/components/Contact"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Hero />
        <ProductsCatalog />
        <WhyChooseUs />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
