"use client";

import { Check } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const trustPoints = [
  "100% Natural",
  "No Artificial Colors",
  "Freshly Packed",
  "Premium Quality"
];

// Spice particles configuration for the background
const spiceParticles = [
  { color: '#A8201A', size: 6, x: '8%', y: '15%', delay: 0, duration: 12 },
  { color: '#C8A26A', size: 8, x: '85%', y: '12%', delay: 2, duration: 16 },
  { color: '#2E7D32', size: 5, x: '35%', y: '82%', delay: 1, duration: 14 },
  { color: '#A8201A', size: 7, x: '92%', y: '65%', delay: 3, duration: 18 },
  { color: '#C8A26A', size: 4, x: '12%', y: '72%', delay: 0.5, duration: 15 },
  { color: '#2E7D32', size: 6, x: '72%', y: '88%', delay: 2.5, duration: 13 },
  { color: '#A8201A', size: 5, x: '22%', y: '42%', delay: 4, duration: 17 },
  { color: '#C8A26A', size: 9, x: '62%', y: '28%', delay: 1.5, duration: 19 },
];

export default function Hero() {
  // Content entrance animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15
      }
    }
  };

  const badgeVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const }
    }
  };

  const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  const subheadingVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const }
    }
  };

  const buttonsVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" as const }
    }
  };

  const trustVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const }
    }
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-white min-h-screen flex items-center pt-24 pb-16 lg:pt-32 lg:pb-24"
    >
      {/* Soft gradient accents in corners */}
      <div 
        className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#FAF9F6] to-transparent opacity-60 pointer-events-none"
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#FAF9F6] to-transparent opacity-60 pointer-events-none"
        aria-hidden="true"
      />

      {/* Subtle Kerala-inspired decorative patterns (filigree style circles) */}
      <div className="absolute top-12 left-12 w-28 h-28 opacity-[0.05] text-[#C8A26A] pointer-events-none select-none" aria-hidden="true">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.75">
          <circle cx="50" cy="50" r="45" />
          <circle cx="50" cy="50" r="32" strokeDasharray="3,3" />
          <circle cx="50" cy="50" r="18" />
          <path d="M50,5 L50,95 M5,50 L95,50 M18,18 L82,82 M18,82 L82,18" />
        </svg>
      </div>
      <div className="absolute bottom-12 right-12 w-28 h-28 opacity-[0.05] text-[#C8A26A] pointer-events-none select-none" aria-hidden="true">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.75">
          <circle cx="50" cy="50" r="45" />
          <circle cx="50" cy="50" r="32" strokeDasharray="3,3" />
          <circle cx="50" cy="50" r="18" />
          <path d="M50,5 L50,95 M5,50 L95,50 M18,18 L82,82 M18,82 L82,18" />
        </svg>
      </div>

      {/* Floating Spice Particles */}
      {spiceParticles.map((p, idx) => (
        <motion.div
          key={idx}
          className="absolute rounded-full pointer-events-none opacity-20"
          style={{
            backgroundColor: p.color,
            width: p.size,
            height: p.size,
            left: p.x,
            top: p.y,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 10, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut" as const,
          }}
        />
      ))}

      <div className="container-page relative z-10 w-full">
        <div className="grid gap-12 lg:grid-cols-[45fr_55fr] lg:items-center lg:gap-16">
          
          {/* Right Side: Product Showcase Placeholder */}
          <div
            data-hero-images-placeholder
            className="order-1 lg:order-2 w-full h-[400px] sm:h-[450px] lg:h-[550px] relative select-none flex items-center justify-center"
          />

          {/* Left Side: Content (order 2 on mobile, order 1 on desktop) */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="order-2 lg:order-1 flex flex-col space-y-6 text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div variants={badgeVariants} className="inline-flex self-center lg:self-start">
              <span className="inline-flex border border-[#C8A26A]/30 bg-[#C8A26A]/8 px-4 py-2 text-[0.62rem] font-bold uppercase tracking-[0.22em] text-[#C8A26A]">
                100% Natural Kerala Products
              </span>
            </motion.div>

            {/* Main Heading & Sub Heading */}
            <div className="space-y-4">
              <motion.h1
                variants={headingVariants}
                className="font-serif text-4xl font-semibold leading-[1.2] tracking-normal text-[#2A1A12] sm:text-5xl xl:text-[3.3rem]"
              >
                Authentic Kerala Spices & Coconut Oil
              </motion.h1>
              <motion.p
                variants={subheadingVariants}
                className="text-sm leading-8 text-[#2A1A12]/75 sm:text-base max-w-xl mx-auto lg:mx-0 font-light"
              >
                Experience the rich aroma and traditional taste of Kerala with our premium quality spices and pure coconut oil.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              variants={buttonsVariants}
              className="flex flex-col gap-3.5 sm:flex-row sm:justify-center lg:justify-start pt-2"
            >
              <a
                href="#products"
                className="inline-flex min-h-12 items-center justify-center bg-[#2A1A12] text-white border border-[#2A1A12] px-8 py-3 text-xs font-bold uppercase tracking-[0.18em] transition duration-300 hover:bg-[#C8A26A] hover:border-[#C8A26A] hover:text-[#2A1A12] shadow-md hover:shadow-lg focus:outline-none"
              >
                Explore Products
              </a>
              <a
                href="#contact"
                className="inline-flex min-h-12 items-center justify-center border border-[#2A1A12]/20 bg-white text-[#2A1A12] px-8 py-3 text-xs font-bold uppercase tracking-[0.18em] transition duration-300 hover:bg-[#2A1A12] hover:text-white hover:border-[#2A1A12] focus:outline-none"
              >
                Contact Us
              </a>
            </motion.div>

            {/* Trust Points */}
            <motion.div variants={trustVariants} className="pt-2">
              <ul className="flex flex-wrap justify-center gap-x-5 gap-y-3 pt-5 border-t border-[#2A1A12]/10 lg:justify-start">
                {trustPoints.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#2A1A12]/60"
                  >
                    <Check className="h-4 w-4 text-[#C8A26A]" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
