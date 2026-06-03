"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Flame, Star, ShoppingBag, Award } from "lucide-react";

interface Product {
  id: string;
  name: string;
  malayalamName: string;
  englishName: string;
  description: string;
  glowClass: string;
  accentColor: string;
  badge: string;
  badgeIcon: React.ReactNode;
  weightOptions: string[];
  basePrice: string;
  details: string[];
}

export default function ProductsCatalog() {
  const [selectedWeight, setSelectedWeight] = useState<Record<string, string>>({
    chilli: "250g",
    turmeric: "250g",
    coriander: "250g",
    coconut: "1 Litre",
  });

  const products: Product[] = [
    {
      id: "chilli",
      name: "Mulaku Podi",
      malayalamName: "മുളകുപൊടി",
      englishName: "Chilli Powder",
      description: "Made from sun-dried premium Kanthari and Guntur chillies. Brings rich deep red color and bold fiery taste to dishes.",
      glowClass: "glow-chilli",
      accentColor: "#C0392B",
      badge: "Fiery Hot",
      badgeIcon: <Flame className="w-3.5 h-3.5 text-white" />,
      weightOptions: ["100g", "250g", "500g", "1kg"],
      basePrice: "₹45",
      details: ["100% stem-less chillies", "Zero added color", "High capsaicin content"],
    },
    {
      id: "turmeric",
      name: "Manjal Podi",
      malayalamName: "മഞ്ഞൾപൊടി",
      englishName: "Turmeric Powder",
      description: "Harvested from organically grown local turmeric roots. Packed with high curcumin content and deep yellow color.",
      glowClass: "glow-turmeric",
      accentColor: "#E67E22",
      badge: "Organic Curcumin+",
      badgeIcon: <Star className="w-3.5 h-3.5 text-white fill-white" />,
      weightOptions: ["100g", "250g", "500g", "1kg"],
      basePrice: "₹50",
      details: ["Rich in natural oils", "Sourced from Wayanad", "Premium medicinal grade"],
    },
    {
      id: "coriander",
      name: "Malli Podi",
      malayalamName: "മല്ലിപ്പൊടി",
      englishName: "Coriander Powder",
      description: "Slow-roasted whole coriander seeds ground carefully to preserve the sweet earthy aroma and herbal freshness.",
      glowClass: "glow-coriander",
      accentColor: "#27AE60",
      badge: "Freshly Roasted",
      badgeIcon: <ShoppingBag className="w-3.5 h-3.5 text-white" />,
      weightOptions: ["100g", "250g", "500g", "1kg"],
      basePrice: "₹40",
      details: ["Double-cleaned seeds", "No moisture retention", "Traditional slow grinding"],
    },
    {
      id: "coconut",
      name: "Velichenna",
      malayalamName: "വെളിച്ചെണ്ണ",
      englishName: "Coconut Oil",
      description: "Cold-pressed from high-quality sun-dried coconuts (copra). 100% pure, unrefined, sulfur-free, and nutrient-rich.",
      glowClass: "glow-coconut",
      accentColor: "#F1C40F",
      badge: "Cold-Pressed",
      badgeIcon: <Award className="w-3.5 h-3.5 text-white" />,
      weightOptions: ["500ml", "1 Litre", "2 Litre", "5 Litre"],
      basePrice: "₹110",
      details: ["Sulfur-free drying", "Zero chemical refining", "Edible & multipurpose"],
    },
  ];

  const handleWeightChange = (prodId: string, weight: string) => {
    setSelectedWeight((prev) => ({
      ...prev,
      [prodId]: weight,
    }));
  };

  const getPriceMultiplier = (weight: string) => {
    if (weight.includes("100g")) return 1;
    if (weight.includes("250g")) return 2.2;
    if (weight.includes("500g") || weight.includes("500ml")) return 4.1;
    if (weight.includes("1kg") || weight.includes("1 Litre")) return 7.8;
    if (weight.includes("2 Litre")) return 15;
    if (weight.includes("5 Litre")) return 36;
    return 1;
  };

  const calculatePrice = (base: string, weight: string) => {
    const baseVal = parseFloat(base.replace("₹", ""));
    const mult = getPriceMultiplier(weight);
    return `₹${Math.round(baseVal * mult)}`;
  };

  return (
    <section id="products" className="py-24 relative overflow-hidden bg-sand-100/30 border-y border-turmeric/5">
      {/* Background glow filters */}
      <div className="absolute top-1/3 left-0 w-96 h-96 glow-coriander rounded-full opacity-30 pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 glow-chilli rounded-full opacity-35 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-sm font-semibold tracking-wider text-turmeric uppercase">Our Signature Harvest</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-cinnamon-950">
            Authentic Kerala Essentials
          </h2>
          <p className="text-sm sm:text-base text-cinnamon-900/70">
            Handcrafted with patience and integrity, our spices and oils bring the real aroma of Malabar kitchens straight to your table.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => {
            const currentW = selectedWeight[product.id];
            const displayPrice = calculatePrice(product.basePrice, currentW);

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative group bg-white rounded-3xl p-6 shadow-xs border border-cinnamon-900/5 hover:border-turmeric/30 hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Specific colored glow effect behind product card */}
                <div className={`absolute -bottom-20 -right-20 w-48 h-48 ${product.glowClass} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full pointer-events-none`} />

                <div>
                  {/* Badge */}
                  <div
                    className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold text-white shadow-xs"
                    style={{ backgroundColor: product.accentColor }}
                  >
                    {product.badgeIcon}
                    <span>{product.badge}</span>
                  </div>

                  {/* Visual Package Display Area */}
                  <div className="h-44 w-full flex items-center justify-center relative my-6">
                    {/* Simulated packaging card */}
                    <motion.div
                      className="w-28 h-36 rounded-xl shadow-md border border-white/20 text-white flex flex-col justify-between p-3 relative overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, ${product.accentColor} 0%, #1e1008 100%)`,
                      }}
                      whileHover={{ scale: 1.05, rotate: 2 }}
                    >
                      <div className="absolute top-1 left-1.5 w-1 h-32 bg-white/10 rounded-full blur-[0.5px]" />
                      <div className="flex justify-between items-center text-[6px] tracking-widest opacity-60">
                        <span>PREMIUM</span>
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                      </div>
                      <div className="text-center space-y-0.5">
                        <div className="text-[10px] font-serif font-bold leading-none">{product.name}</div>
                        <div className="text-[6px] opacity-75">{product.englishName}</div>
                      </div>
                      <div className="flex justify-between items-center text-[7px]">
                        <span className="bg-white/15 px-1 py-0.2 rounded font-semibold">{currentW}</span>
                        <span className="font-bold text-amber-300">Grade A</span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Meta Details */}
                  <div className="space-y-2 mt-4">
                    <div className="flex items-baseline justify-between">
                      <h3 className="text-lg font-bold font-serif text-cinnamon-950">
                        {product.name}
                      </h3>
                      <span className="text-[10px] text-cinnamon-900/60 font-semibold italic">
                        ({product.malayalamName})
                      </span>
                    </div>
                    <span className="block text-xs font-semibold text-turmeric uppercase tracking-wider">
                      {product.englishName}
                    </span>
                    <p className="text-xs text-cinnamon-900/70 leading-relaxed min-h-[48px]">
                      {product.description}
                    </p>
                  </div>

                  {/* Bullet Highlights */}
                  <ul className="space-y-1.5 my-4">
                    {product.details.map((detail, dIdx) => (
                      <li key={dIdx} className="text-[11px] text-cinnamon-900/80 flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-turmeric shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Controls: Weight & Enquiry */}
                <div className="space-y-4 pt-4 border-t border-cinnamon-900/5 mt-2">
                  {/* Weight Options Selector */}
                  <div className="flex gap-1.5 flex-wrap">
                    {product.weightOptions.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleWeightChange(product.id, opt)}
                        className={`text-[10px] px-2.5 py-1 rounded-lg border font-semibold transition-all duration-200 ${
                          currentW === opt
                            ? "bg-cinnamon-950 text-white border-cinnamon-950"
                            : "bg-transparent text-cinnamon-900/60 border-cinnamon-900/10 hover:border-cinnamon-950"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  {/* Price & Action */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-col">
                      <span className="text-[9px] text-cinnamon-900/50 uppercase font-semibold">Estimated Price</span>
                      <span className="text-lg font-bold text-cinnamon-950">{displayPrice}</span>
                    </div>
                    <a
                      href={`#contact?product=${product.id}&weight=${currentW}`}
                      className="px-4 py-2 text-xs font-bold text-white bg-cinnamon-950 hover:bg-turmeric rounded-xl transition-colors shadow-xs"
                    >
                      Enquire Now
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
