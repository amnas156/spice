import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductsCatalog from "@/components/ProductsCatalog";
import ProductShowcaseVideo from "@/components/ProductShowcaseVideo";
import About from "@/components/About";
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
        <ProductShowcaseVideo />
        <About />
        <WhyChooseUs />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
