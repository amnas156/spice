"use client";

import React from "react";
import { motion } from "framer-motion";

export default function OilLiquidAnimation() {
  // Wave/liquid drip particles
  const drops = [
    { delay: 0, x: "50%", size: 6, duration: 2.2 },
    { delay: 0.5, x: "49%", size: 5, duration: 1.8 },
    { delay: 1.1, x: "51%", size: 7, duration: 2.5 },
    { delay: 1.6, x: "50%", size: 4, duration: 2.0 },
  ];

  return (
    <div className="relative flex flex-col items-center justify-center h-[400px] w-full max-w-[320px] mx-auto bg-amber-50/10 rounded-3xl p-6 border border-amber-500/10 shadow-inner">
      {/* Glow Behind */}
      <div className="absolute inset-0 bg-radial from-amber-500/10 to-transparent blur-2xl pointer-events-none" />

      {/* 1. Coconut Shell Visual at the Top */}
      <div className="relative z-10 w-24 h-24 mb-4">
        {/* Left half shell */}
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          {/* Shell outer */}
          <path
            d="M 15,40 C 15,75 50,85 50,85 C 50,85 85,75 85,40 C 85,38 75,42 50,42 C 25,42 15,38 15,40 Z"
            fill="#5C3A21"
            stroke="#3D2514"
            strokeWidth="3"
          />
          {/* White coconut meat layer inside */}
          <path
            d="M 22,41 C 22,68 50,77 50,77 C 50,77 78,68 78,41 C 78,41 68,44 50,44 C 32,44 22,41 22,41 Z"
            fill="#FFFFF0"
          />
          {/* Liquid pool inside the coconut */}
          <path
            d="M 25,42.5 C 33,45 67,45 75,42.5 C 72,50 50,55 50,55 C 50,55 28,50 25,42.5 Z"
            fill="#F1C40F"
            opacity="0.9"
          />
        </svg>

        {/* Liquid overflow spout marker */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-amber-400 rounded-full" />
      </div>

      {/* 2. Oil Pouring Stream (SVG Path Animation) */}
      <div className="relative w-16 flex-grow flex items-center justify-center overflow-hidden">
        {/* Continuous Flow Stream */}
        <svg viewBox="0 0 20 180" className="absolute top-0 bottom-0 h-full w-4" preserveAspectRatio="none">
          {/* Back thicker stream */}
          <motion.path
            d="M 10,0 L 10,180"
            fill="none"
            stroke="#F39C12"
            strokeWidth="5"
            strokeLinecap="round"
            animate={{
              strokeDasharray: ["20, 10", "10, 20", "20, 10"],
              strokeDashoffset: [0, -60, -120],
            }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 1.5,
            }}
          />
          {/* Front highlighting shiny stream */}
          <motion.path
            d="M 10,0 L 10,180"
            fill="none"
            stroke="#FFF6D1"
            strokeWidth="2"
            strokeLinecap="round"
            animate={{
              strokeDasharray: ["10, 15", "5, 20", "10, 15"],
              strokeDashoffset: [0, -100, -200],
            }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 1,
            }}
          />
        </svg>

        {/* Drops falling down along the stream */}
        {drops.map((drop, idx) => (
          <motion.div
            key={idx}
            className="absolute rounded-full bg-amber-400 border border-amber-200/50 shadow-sm"
            style={{
              left: drop.x,
              width: drop.size,
              height: drop.size * 1.5,
              top: 0,
            }}
            initial={{ y: -10, opacity: 0 }}
            animate={{
              y: [0, 170],
              opacity: [0, 1, 1, 0],
              scaleY: [1.5, 1.2, 1],
            }}
            transition={{
              duration: drop.duration,
              repeat: Infinity,
              delay: drop.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* 3. Premium Glass Bottle at the Bottom */}
      <div className="relative z-10 w-20 h-32 flex flex-col items-center">
        {/* Bottle Neck */}
        <div className="w-8 h-4 bg-white/10 border-x border-t border-white/30 rounded-t-md backdrop-blur-md relative">
          {/* Glowing oil entrance */}
          <div className="absolute inset-x-1.5 bottom-0 h-2 bg-amber-400/80 rounded-t-sm animate-pulse" />
        </div>
        {/* Bottle Body */}
        <div className="w-20 h-28 bg-white/10 border border-white/30 rounded-b-xl rounded-t-sm backdrop-blur-md relative shadow-lg overflow-hidden flex flex-col justify-end p-1">
          {/* Reflections */}
          <div className="absolute top-1 left-2 w-2 h-24 bg-white/20 rounded-full blur-[1px] pointer-events-none" />
          <div className="absolute top-1 right-2 w-1 h-24 bg-white/10 rounded-full blur-[1px] pointer-events-none" />

          {/* Liquid level rising or swirling */}
          <motion.div
            className="w-full bg-linear-to-t from-amber-500/90 to-amber-400/85 rounded-b-lg rounded-t-md relative flex items-center justify-center"
            initial={{ height: "40%" }}
            animate={{
              height: ["65%", "70%", "65%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ minHeight: "15px" }}
          >
            {/* Liquid Swirl Top Waves */}
            <motion.div
              className="absolute -top-1.5 left-0 right-0 h-3 bg-amber-300/80 rounded-t-full filter blur-[1px]"
              animate={{
                x: [-3, 3, -3],
                scaleY: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Label */}
            <div className="z-10 text-[9px] uppercase tracking-wider text-cinnamon-950 font-bold select-none text-center bg-white/80 px-2 py-0.5 rounded shadow-sm border border-amber-600/20">
              Velichenna
            </div>
          </motion.div>
        </div>
      </div>

      {/* Caption text */}
      <span className="text-[11px] font-semibold text-amber-800 mt-3 animate-pulse">
        Cold-Pressed Purity
      </span>
    </div>
  );
}
