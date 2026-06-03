"use client";

import React from "react";
import { motion } from "framer-motion";
import SpiceParticles from "./SpiceParticles";
import { Sparkles, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-gradient-to-b from-sand-50 to-sand-100/50"
    >
      {/* Dynamic Canvas Spice Particles Background */}
      <SpiceParticles />

      {/* Radial Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] glow-turmeric rounded-full opacity-60 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] glow-chilli rounded-full opacity-40 pointer-events-none" />

      {/* Decorative Traditional Kerala Border / Waves Pattern (Soft Accent) */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-turmeric via-chilli to-coriander opacity-80" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left text content */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-turmeric/10 border border-turmeric/20 text-xs font-semibold tracking-wide text-turmeric uppercase"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>100% Traditional Malabar Sourcing</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-cinnamon-950 font-serif leading-[1.15]"
          >
            Pure Essence of <br />
            <span className="bg-gradient-to-r from-chilli via-turmeric to-turmeric-light bg-clip-text text-transparent">
              Kerala Spices
            </span>{" "}
            & Oils
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base sm:text-lg text-cinnamon-900/80 max-w-xl mx-auto lg:mx-0 leading-relaxed"
          >
            Experience authentic taste hand-picked from Wayanad and Idukki farms. Sun-dried, slow-roasted, and micro-milled to preserve curcumin, flavor, and purity without preservatives.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4"
          >
            <a
              href="#products"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-turmeric to-chilli hover:from-chilli hover:to-turmeric rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 gap-2"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-cinnamon-950 bg-white/70 hover:bg-white border border-cinnamon-900/10 hover:border-turmeric rounded-xl shadow-xs hover:shadow-md backdrop-blur-xs transition-all duration-200"
            >
              Enquire Wholesale
            </a>
          </motion.div>
        </div>

        {/* Right side floating package showcase (Enlarged 3D layered collage layout) */}
        <div className="lg:col-span-5 flex justify-center relative w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative w-full h-[350px] sm:h-[480px] md:h-[600px] lg:h-[700px] max-w-[450px] lg:max-w-none mx-auto flex items-center justify-center"
          >
            {/* Visual background glows */}
            <div className="absolute inset-0 bg-gradient-to-tr from-turmeric/10 to-chilli/10 rounded-full filter blur-2xl scale-90 animate-pulse-slow opacity-60 pointer-events-none" />

            {/* Chilli Powder Package (Floating Right, Enlarge size + red glow) */}
            <motion.div
              className="absolute right-[-8%] top-[18%] w-[48%] h-[58%] z-10 flex items-center justify-center"
              animate={{
                y: [0, -12, 0],
                scale: [1, 1.05, 1],
                rotate: [2, 5, 2],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.2,
              }}
            >
              {/* Soft red glow */}
              <div className="absolute inset-0 bg-chilli/15 rounded-full blur-2xl opacity-60 scale-75 pointer-events-none" />
              <img
                src="/images/hero/chilli.png"
                alt="Mulaku Podi (Chilli Powder)"
                className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.2)] select-none pointer-events-none"
              />
            </motion.div>

            {/* Turmeric Powder Package (Floating Left, Enlarge size + gold glow) */}
            <motion.div
              className="absolute left-[-8%] bottom-[8%] w-[48%] h-[58%] z-10 flex items-center justify-center"
              animate={{
                y: [0, 12, 0],
                scale: [1, 1.05, 1],
                rotate: [-2, -6, -2],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.4,
              }}
            >
              {/* Soft gold glow */}
              <div className="absolute inset-0 bg-turmeric/15 rounded-full blur-2xl opacity-60 scale-75 pointer-events-none" />
              <img
                src="/images/hero/Turmeric.png"
                alt="Manjal Podi (Turmeric Powder)"
                className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.2)] select-none pointer-events-none"
              />
            </motion.div>

            {/* Coconut Oil Bottle (Center Foreground, Main Visual Focus + amber glow) */}
            <motion.div
              className="absolute left-[13%] top-[4%] w-[72%] h-[88%] z-20 flex items-center justify-center"
              animate={{
                y: [0, -16, 0],
                scale: [1, 1.05, 1],
                rotate: [0, -2, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Soft warm glow */}
              <div className="absolute inset-0 bg-coconut/20 rounded-full blur-3xl opacity-70 scale-75 pointer-events-none" />
              <img
                src="/images/hero/coconut.png"
                alt="Velichenna (Coconut Oil)"
                className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)] select-none pointer-events-none"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
