"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Leaf, ShieldCheck, Sparkles } from "lucide-react";

interface ProductDetails {
  id: string;
  name: string;
  englishName: string;
  subtitle: string;
  description: string;
  videoSrc: string;
  highlights: string[];
  colorTheme: string;
}

export default function ProductShowcaseVideo() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const products: ProductDetails[] = [
    {
      id: "chilli",
      name: "Mulaku Podi",
      englishName: "Chilli Powder",
      subtitle: "Solar Oven Dried • Balanced Heat",
      description: "Harvested from selected local chilli crops, dried cleanly in solar ovens to secure their natural oils. Brings a bold heat and deep natural red glow to traditional curries.",
      videoSrc: "/video/Chilli_powder.mp4",
      highlights: ["Guntur & Kanthari Blend", "Traditional Solar Dried", "Zero Artificial Color"],
      colorTheme: "rgba(192, 57, 43, 0.15)",
    },
    {
      id: "turmeric",
      name: "Manjal Podi",
      englishName: "Turmeric Powder",
      subtitle: "High Curcumin • Slow Cool Milling",
      description: "Derived from organically grown Wayanad turmeric roots. Slow-ground at low temperatures to protect the curcuma structure, retaining its rich aroma and therapeutic benefits.",
      videoSrc: "/video/Turmeric_powder.mp4",
      highlights: ["High Curcumin Compound", "Slow-Speed Grinding", "Medicinal Grade Curma"],
      colorTheme: "rgba(230, 126, 34, 0.15)",
    },
    {
      id: "coriander",
      name: "Malli Podi",
      englishName: "Coriander Powder",
      subtitle: "Slow Roasted • Earthy Aroma",
      description: "Whole double-cleaned coriander seeds are toasted under monitored wood fires, unlocking sweet woody aromas before being milled into a fine culinary powder.",
      videoSrc: "/video/Coriander_powder.mp4",
      highlights: ["Wood-Fire Roasted", "Double-Cleaned Seeds", "Sweet Earthy Fragrance"],
      colorTheme: "rgba(39, 174, 96, 0.15)",
    },
    {
      id: "coconut",
      name: "Velichenna",
      englishName: "Coconut Oil",
      subtitle: "Cold Pressed • Sulfur-Free Copra",
      description: "Unrefined coconut oil extracted from sun-dried copra in wooden expellers. Naturally crystallized, filter bed refined, edible, and 100% organic.",
      videoSrc: "/video/Coconut_oil.mp4",
      highlights: ["Unrefined Cold-Pressed", "Zero Sulfur Copra", "Multipurpose Purity"],
      colorTheme: "rgba(241, 196, 15, 0.15)",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const containerHeight = rect.height;
      const scrolled = -rect.top;

      if (scrolled >= 0 && scrolled < containerHeight) {
        // Divide total scroll height by number of products
        const stepSize = containerHeight / products.length;
        const index = Math.min(
          products.length - 1,
          Math.max(0, Math.floor(scrolled / stepSize))
        );
        setActiveStep(index);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [products.length]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[400vh] bg-cinnamon-950 text-sand-50"
    >
      {/* Immersive Sticky Container */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center">
        {/* Soft Background Glow Sync */}
        <div
          className="absolute inset-0 transition-all duration-1000 blur-[150px] pointer-events-none opacity-40"
          style={{
            background: `radial-gradient(circle, ${products[activeStep].colorTheme} 0%, transparent 70%)`,
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-[85vh] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side: Immersive Centered Video (50%) */}
          <div className="relative w-full h-[50vh] lg:h-[70vh] rounded-3xl overflow-hidden shadow-2xl border border-white/5 bg-black/20 backdrop-blur-xs flex items-center justify-center">
            
            {/* Subtle Glass Outer Contour Reflection */}
            <div className="absolute inset-0 border border-white/10 rounded-3xl pointer-events-none z-20" />
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none z-20" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 w-full h-full"
              >
                <video
                  src={products[activeStep].videoSrc}
                  loop
                  muted
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover select-none pointer-events-none"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Side: Immersive Premium Details (50%) */}
          <div className="flex flex-col justify-center h-full max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -25 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                {/* Micro Label */}
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-turmeric-light/80">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{products[activeStep].subtitle}</span>
                </div>

                {/* Product Name */}
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-serif tracking-tight leading-none text-white">
                  {products[activeStep].name}
                  <span className="block text-xl sm:text-2xl font-serif text-white/50 mt-2 font-normal">
                    {products[activeStep].englishName}
                  </span>
                </h2>

                {/* Premium Description */}
                <p className="text-sm sm:text-base text-sand-50/75 leading-relaxed font-sans max-w-lg mx-auto lg:mx-0">
                  {products[activeStep].description}
                </p>

                {/* Highlights List */}
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-sand-50/90 font-medium max-w-md mx-auto lg:mx-0">
                  {products[activeStep].highlights.map((high, idx) => (
                    <li key={idx} className="flex items-center justify-center lg:justify-start gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-turmeric shrink-0" />
                      <span>{high}</span>
                    </li>
                  ))}
                </ul>

                {/* Premium Action Button */}
                <div className="pt-4">
                  <a
                    href={`#contact?product=${products[activeStep].id}`}
                    className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-cinnamon-950 bg-white hover:bg-turmeric hover:text-white rounded-full shadow-lg transition-all duration-300 gap-2 border border-transparent hover:-translate-y-0.5"
                  >
                    <span>Enquire Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}
