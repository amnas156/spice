"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Users, HeartHandshake } from "lucide-react";

export default function About() {
  const stats = [
    {
      id: 1,
      value: "100%",
      label: "Organic Sourcing",
      desc: "Zero chemical preservatives or synthetic coloring agents.",
      icon: <ShieldCheck className="w-5 h-5 text-turmeric" />,
    },
    {
      id: 2,
      value: "450+",
      label: "Partner Farmers",
      desc: "Direct fair-trade relationships across Wayanad & Idukki.",
      icon: <Users className="w-5 h-5 text-chilli" />,
    },
    {
      id: 3,
      value: "30+ Yrs",
      label: "Grinding Heritage",
      desc: "Preserving Malabar culinary traditions since 1994.",
      icon: <HeartHandshake className="w-5 h-5 text-coriander" />,
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-sand-50">
      {/* Background glow overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] glow-turmeric rounded-full opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-sm font-semibold tracking-wider text-turmeric uppercase">Our Heritage</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-cinnamon-950 leading-tight">
              Sown with Love, Ground with Honesty in the Hills of Kerala
            </h2>
            <p className="text-sm sm:text-base text-cinnamon-900/80 leading-relaxed">
              Our journey began in Wayanad, Kerala, as a small family mills endeavor. We noticed that commercial spices were stripped of their natural oils and mixed with starches to increase bulk. We set out to change that by rebuilding the supply chain.
            </p>
            <p className="text-sm sm:text-base text-cinnamon-900/80 leading-relaxed">
              We work directly with smallholder farmers who grow spices using age-old organic standards. By purchasing harvest fresh and paying premium rates, we ensure sustainable livelihoods while locking in the richest curcumin, spice heat, and volatile oils in every pouch we pack.
            </p>

            {/* Traditional Quote */}
            <div className="border-l-4 border-turmeric pl-4 italic text-sm text-cinnamon-950 font-medium">
              "We do not make powders to compete in mass markets; we make them for our own children, and we share that exact purity with your family."
            </div>
          </div>

          {/* Right Cards Column */}
          <div className="lg:col-span-5 space-y-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-white rounded-2xl p-5 border border-cinnamon-900/5 shadow-xs hover:shadow-md transition-all duration-300 flex items-start gap-4"
              >
                <div className="p-3 bg-sand-50 rounded-xl border border-cinnamon-900/5 shrink-0">
                  {stat.icon}
                </div>
                <div className="space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold font-serif text-cinnamon-950">{stat.value}</span>
                    <span className="text-xs font-semibold text-cinnamon-900/70">{stat.label}</span>
                  </div>
                  <p className="text-xs text-cinnamon-900/60 leading-relaxed">
                    {stat.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
