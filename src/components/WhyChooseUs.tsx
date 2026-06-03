"use client";

import React from "react";
import { motion } from "framer-motion";
import { Leaf, Flame, ShieldAlert, Award } from "lucide-react";

interface CardItem {
  title: string;
  desc: string;
  icon: React.ReactNode;
  colorClass: string;
  borderColorClass: string;
}

export default function WhyChooseUs() {
  const cards: CardItem[] = [
    {
      title: "Direct Sourcing, Fair Trade",
      desc: "We buy directly from organic farmers in Wayanad and Idukki at fair-trade premiums, cutting out middle brokers and securing freshest crop.",
      icon: <Leaf className="w-6 h-6 text-coriander" />,
      colorClass: "bg-coriander/5 text-coriander",
      borderColorClass: "hover:border-coriander/30",
    },
    {
      title: "Zero Fillers, Zero Adulteration",
      desc: "No rice flour, starches, lead chromate coloring, or mineral oils are added. You receive 100% pure spices, ground to perfection.",
      icon: <ShieldAlert className="w-6 h-6 text-chilli" />,
      colorClass: "bg-chilli/5 text-chilli",
      borderColorClass: "hover:border-chilli/30",
    },
    {
      title: "Water-Cooled Micro Milling",
      desc: "Grinding under high temperatures kills the flavor. Our water-cooled grinders keep spice roots cool, locking in curcumin & volatile oils.",
      icon: <Flame className="w-6 h-6 text-turmeric" />,
      colorClass: "bg-turmeric/5 text-turmeric",
      borderColorClass: "hover:border-turmeric/30",
    },
    {
      title: "Sulfur-Free Coconut Oil",
      desc: "Our copra drying happens in glass solar ovens without burning sulfur. The oil is cold pressed in wooden expellers without refining agents.",
      icon: <Award className="w-6 h-6 text-amber-500" />,
      colorClass: "bg-amber-500/5 text-amber-500",
      borderColorClass: "hover:border-amber-500/30",
    },
  ];

  return (
    <section id="why-choose-us" className="py-24 relative overflow-hidden bg-sand-100/30 border-t border-turmeric/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-sm font-semibold tracking-wider text-turmeric uppercase">Why Choose Us</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-cinnamon-950">
            Purity You Can Feel & Taste
          </h2>
          <p className="text-sm sm:text-base text-cinnamon-900/70">
            We are committed to absolute transparency and food integrity. Here is how we differ from regular commercial spice brands.
          </p>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`bg-white rounded-3xl p-6 border border-cinnamon-900/5 ${card.borderColorClass} hover:shadow-lg transition-all duration-300 flex flex-col items-start space-y-4`}
            >
              {/* Icon Container */}
              <div className={`p-3.5 rounded-2xl shrink-0 ${card.colorClass}`}>
                {card.icon}
              </div>

              {/* Title & Desc */}
              <div className="space-y-2">
                <h3 className="text-base font-bold font-serif text-cinnamon-950">
                  {card.title}
                </h3>
                <p className="text-xs text-cinnamon-900/70 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
