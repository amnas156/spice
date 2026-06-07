import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductsCatalog from "@/components/ProductsCatalog";
import WhyChooseUs from "@/components/WhyChooseUs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

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
