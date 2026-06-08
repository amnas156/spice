"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check, ArrowRight, Star, ShoppingBag, Users, Store, ShieldCheck } from "lucide-react";
import SpiceParticles from "./SpiceParticles";

interface StatItem {
  value: string;
  label: string;
  icon: React.ReactNode;
}

export default function Hero() {

  const trustBadges = [
    "100% Natural",
    "No Artificial Colors",
    "Freshly Packed",
    "Premium Quality"
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-10 overflow-hidden bg-white"
    >
      {/* Canvas Spice Particles Background */}
      <SpiceParticles />

      {/* Decorative Glow Ambient Elements */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#C89B3C]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-[#C62828]/5 rounded-full blur-[140px] pointer-events-none" />
      
      {/* Main Grid: Left copy, Right collage */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center py-8 lg:py-16">
        
        {/* LEFT SIDE: Content Copy */}
        <div className="lg:col-span-6 space-y-8 text-center lg:text-left order-1 lg:order-1 w-full">
          {/* Small Badge */}
          <div className="inline-flex items-center px-4.5 py-1.5 border border-[#C89B3C]/25 text-[9px] font-bold uppercase tracking-[0.3em] text-[#C89B3C] bg-[#C89B3C]/5">
            100% Pure Kerala Spices
          </div>

          {/* Heading block */}
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-medium tracking-wide text-[#2C1A11] font-serif leading-tight">
              Authentic Kerala Spices &amp; Coconut Oil
            </h1>
            <h2 className="text-xs sm:text-base font-serif text-[#C89B3C] italic tracking-wider uppercase font-semibold">
              Bringing the rich aroma, natural taste, and traditional quality of Kerala directly to your kitchen.
            </h2>
          </div>

          {/* Short description */}
          <p className="text-xs sm:text-sm text-[#2C1A11]/70 leading-relaxed font-sans font-medium max-w-xl mx-auto lg:mx-0">
            Carefully selected ingredients, hygienically processed, and packed fresh to deliver premium quality spices and coconut oil for every home.
          </p>

          {/* Call-to-actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-4 max-w-md mx-auto lg:mx-0 w-full">
            <a
              href="#products"
              className="inline-flex items-center justify-center px-8 py-4 text-xs font-bold uppercase tracking-widest text-white bg-black hover:bg-[#C89B3C] transition-all duration-300 w-full sm:w-auto shadow-md"
            >
              Shop Now
            </a>
            <a
              href="#products"
              className="inline-flex items-center justify-center px-8 py-4 text-xs font-bold uppercase tracking-widest text-[#2C1A11] bg-white border border-[#2C1A11]/15 hover:border-[#2C1A11] transition-all duration-300 w-full sm:w-auto"
            >
              View Products
            </a>
          </div>

          {/* Trust Indicators checkmarks */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3 pt-2">
            {trustBadges.map((badge, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-[#2C1A11]/60">
                <div className="bg-[#C89B3C]/10 p-1 rounded-full text-[#C89B3C]">
                  <Check className="w-3 h-3 stroke-[3px]" />
                </div>
                <span>{badge}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE: Floating Product Collage */}
        <div className="lg:col-span-6 flex justify-center w-full order-2 lg:order-2 overflow-hidden px-2 py-4">
          <div className="relative w-full max-w-[460px] aspect-[4/3] flex items-center justify-center min-h-[300px] lg:min-h-none">
            
            {/* Collage ambient backing */}
            <div className="absolute w-[80%] h-[80%] bg-[#FAF6F0] border border-[#2C1A11]/5 rounded-3xl -rotate-2 scale-95 shadow-2xs pointer-events-none" />
            
            {/* Card 1: Mulaku Podi (Top Left) */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-2 left-2 z-10 w-[42%] bg-white/60 backdrop-blur-md border border-white/20 p-3 rounded-2xl shadow-lg hover:shadow-xl hover:scale-102 hover:z-20 transition-all duration-300 flex flex-col items-center select-none"
            >
              <div className="w-full aspect-square bg-[#FAF6F0]/30 rounded-xl p-2 flex items-center justify-center overflow-hidden mb-2">
                <Image src="/products/mulaku-podi.png" alt="Chilli pouch" width={300} height={400} className="w-full h-full object-contain max-h-[90px]" priority />
              </div>
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#2C1A11] block text-center">Mulaku Podi</span>
              <span className="text-[7px] font-bold text-[#C89B3C] uppercase tracking-wider block text-center mt-0.5">50g - 1kg</span>
            </motion.div>

            {/* Card 2: Malli Podi (Top Right) */}
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 4.8, delay: 0.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-8 right-2 z-10 w-[40%] bg-white/60 backdrop-blur-md border border-white/20 p-3 rounded-2xl shadow-lg hover:shadow-xl hover:scale-102 hover:z-20 transition-all duration-300 flex flex-col items-center select-none"
            >
              <div className="w-full aspect-square bg-[#FAF6F0]/30 rounded-xl p-2 flex items-center justify-center overflow-hidden mb-2">
                <Image src="/products/malli-podi.png" alt="Coriander pouch" width={300} height={400} className="w-full h-full object-contain max-h-[85px]" priority />
              </div>
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#2C1A11] block text-center">Malli Podi</span>
              <span className="text-[7px] font-bold text-[#C89B3C] uppercase tracking-wider block text-center mt-0.5">50g - 1kg</span>
            </motion.div>

            {/* Card 3: Manjal Podi (Bottom Left) */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4.5, delay: 0.2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-2 left-12 z-10 w-[38%] bg-white/60 backdrop-blur-md border border-white/20 p-3 rounded-2xl shadow-lg hover:shadow-xl hover:scale-102 hover:z-20 transition-all duration-300 flex flex-col items-center select-none"
            >
              <div className="w-full aspect-square bg-[#FAF6F0]/30 rounded-xl p-2 flex items-center justify-center overflow-hidden mb-2">
                <Image src="/products/manjal-podi.png" alt="Turmeric pouch" width={300} height={400} className="w-full h-full object-contain max-h-[80px]" priority />
              </div>
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#2C1A11] block text-center">Manjal Podi</span>
              <span className="text-[7px] font-bold text-[#C89B3C] uppercase tracking-wider block text-center mt-0.5">50g - 1kg</span>
            </motion.div>

            {/* Card 4: Coconut Oil (Bottom Right) */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5.2, delay: 0.8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-8 right-12 z-10 w-[38%] bg-white/60 backdrop-blur-md border border-white/20 p-3 rounded-2xl shadow-lg hover:shadow-xl hover:scale-102 hover:z-20 transition-all duration-300 flex flex-col items-center select-none"
            >
              <div className="w-full aspect-square bg-[#FAF6F0]/30 rounded-xl p-2 flex items-center justify-center overflow-hidden mb-2">
                <Image src="/products/coconut-oil.png" alt="Coconut Oil Bottle" width={300} height={400} className="w-full h-full object-contain max-h-[85px]" priority />
              </div>
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#2C1A11] block text-center">Coconut Oil</span>
              <span className="text-[7px] font-bold text-[#C89B3C] uppercase tracking-wider block text-center mt-0.5">250ml - 5L</span>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}
