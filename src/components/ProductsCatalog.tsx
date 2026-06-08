"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Check, ShoppingCart, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { productsData, Product, ProductVariant } from "@/lib/products";
import { cn } from "@/lib/utils";

// List of featured products in showcase order
const FEATURED_IDS = ["mulaku-podi", "malli-podi", "manjal-podi", "velichenna"];

// Default showcase images mapping
const SHOWCASE_IMAGES: Record<string, string> = {
  "mulaku-podi": "/products/mulaku-podi.png",
  "malli-podi": "/products/malli-podi.png",
  "manjal-podi": "/products/manjal-podi.png",
  "velichenna": "/products/coconut-oil.png"
};

export default function ProductsCatalog() {
  const router = useRouter();

  // Selected variant state per product ID
  const [selectedVariants, setSelectedVariants] = useState<Record<string, ProductVariant>>({});
  
  // Toast state for cart feedback
  const [toast, setToast] = useState<{ show: boolean; message: string }>({ show: false, message: "" });

  // Initialize default variants
  useEffect(() => {
    const initial: Record<string, ProductVariant> = {};
    FEATURED_IDS.forEach((id) => {
      const prod = productsData.find((p) => p.id === id);
      if (prod) {
        initial[id] = prod.variants[2] || prod.variants[0]; // default to 250g if available, else first
      }
    });
    setSelectedVariants(initial);
  }, []);

  const handleVariantSelect = (productId: string, variant: ProductVariant) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [productId]: variant
    }));
  };

  const showToast = (message: string) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: "" });
    }, 3500);
  };

  const handleAddToCart = (e: React.MouseEvent, product: Product, variant: ProductVariant) => {
    e.stopPropagation();
    showToast(`Added JADEED ${product.name} (${variant.weight}) to your cart!`);
  };

  const handleBuyNow = (product: Product, variant: ProductVariant) => {
    const whatsappNumber = "919876543210";
    const text = `Hi JADEED Spices, I would like to order:
*Product:* JADEED ${product.name} (${product.subtitle})
*Size/Weight:* ${variant.weight}
*Quantity:* 1
*Price:* ₹${variant.price}
*Delivery Area:* Please verify my shipping pincode.`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${whatsappNumber}?text=${encoded}`, "_blank");
  };

  // Get active image for a product.
  // For Mulaku Podi, if a variant is selected, swap to the variant image.
  // For other products, keep the custom generated high-quality showcase packaging image.
  const getActiveImage = (product: Product, variant: ProductVariant) => {
    if (product.id === "mulaku-podi" && variant.image.startsWith("/")) {
      return variant.image;
    }
    return SHOWCASE_IMAGES[product.id] || "/products/mulaku-podi.png";
  };

  return (
    <section id="products" className="bg-[#FAF6F0] relative overflow-hidden">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.9 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#2C1A11] text-[#FAF6F0] px-6 py-3.5 rounded-xl border border-[#C89B3C]/35 shadow-2xl flex items-center gap-3 max-w-sm w-[90%]"
          >
            <div className="bg-[#C89B3C] text-black rounded-full p-1 flex items-center justify-center">
              <Check className="w-3.5 h-3.5 stroke-[3px]" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest">{toast.message}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10 text-center space-y-4">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C89B3C]">
          The Story of Spice
        </span>
        <h2 className="text-4xl sm:text-5xl font-medium font-serif tracking-wide text-[#2C1A11]">
          Our Star Spices
        </h2>
        <p className="text-xs sm:text-sm text-[#2C1A11]/60 leading-relaxed font-sans max-w-lg mx-auto font-medium">
          Dedicating a showcase of purity to each spice. Experience unadulterated color, flavor, and texture.
        </p>
      </div>

      {/* Alternating Showcase List */}
      <div className="w-full">
        {FEATURED_IDS.map((id, index) => {
          const product = productsData.find((p) => p.id === id);
          if (!product) return null;

          const isEven = index % 2 === 0;
          const currentVariant = selectedVariants[product.id] || product.variants[0];
          const activeImage = getActiveImage(product, currentVariant);

          return (
            <div 
              key={product.id}
              className={cn(
                "py-12 sm:py-20 lg:py-32 border-b border-[#2C1A11]/5 w-full flex items-center justify-center",
                isEven ? "bg-white" : "bg-[#FAF6F0]/30"
              )}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                
                {/* Image Side (Left for even, Right for odd) */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={cn(
                    "lg:col-span-6 flex justify-center w-full relative",
                    isEven ? "order-1" : "order-1 lg:order-2"
                  )}
                >
                  {/* Subtle luxurious shadow/glow backing */}
                  <div 
                    className="absolute w-[70%] h-[70%] rounded-full filter blur-[100px] opacity-10 pointer-events-none"
                    style={{ backgroundColor: product.color }}
                  />

                  {/* Image container frame */}
                  <div className="relative w-full max-w-[420px] aspect-[4/5] bg-[#FAF6F0]/50 border border-[#2C1A11]/5 rounded-3xl p-8 flex items-center justify-center overflow-hidden shadow-xs hover:shadow-lg group transition-all duration-300">
                    <Image
                      src={activeImage}
                      alt={`JADEED ${product.name} Showcase`}
                      width={600}
                      height={800}
                      className="w-full h-full object-contain max-h-[350px] transition-transform duration-700 group-hover:scale-105 select-none"
                    />
                    
                    {/* Organic quality tag */}
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-xs border border-[#2C1A11]/10 px-3 py-1.5 rounded-full text-[8px] font-bold uppercase tracking-widest text-[#2C1A11]">
                      ✓ 100% Pure &amp; Organic
                    </div>
                  </div>
                </motion.div>

                {/* Content Side (Right for even, Left for odd) */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 60 : -60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={cn(
                    "lg:col-span-6 space-y-8",
                    isEven ? "order-2" : "order-2 lg:order-1"
                  )}
                >
                  {/* Header metadata */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#C89B3C]">
                        {product.subtitle}
                      </span>
                      {product.badge && (
                        <span className="bg-[#2C1A11] text-[#C89B3C] border border-[#C89B3C]/20 px-2 py-0.5 text-[7px] font-bold uppercase tracking-widest leading-none">
                          {product.badge === "new" ? "New Arrival" : product.badge === "bestseller" ? "Best Seller" : "Featured"}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap items-baseline gap-3">
                      <h3 className="text-3xl sm:text-4xl font-serif font-medium tracking-wide text-[#2C1A11]">
                        {product.name}
                      </h3>
                      <span className="text-lg font-serif text-[#C89B3C] italic font-light">
                        ({product.malayalam})
                      </span>
                    </div>

                    {/* Ratings */}
                    <div className="flex items-center gap-1.5 pt-0.5">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "w-3.5 h-3.5",
                              i < Math.floor(product.rating) ? "fill-[#C89B3C] text-[#C89B3C]" : "text-[#2C1A11]/10"
                            )}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-[#2C1A11]">{product.rating}</span>
                      <span className="text-[#2C1A11]/30 text-xs">•</span>
                      <span className="text-xs font-semibold text-[#2C1A11]/50">{product.reviewsCount} reviews</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#2C1A11]/70 leading-relaxed font-sans font-medium">
                    {product.longDescription ? product.longDescription.split(".")[0] + ". " + product.longDescription.split(".")[1] + "." : product.description}
                  </p>

                  <div className="h-[1px] w-full bg-[#2C1A11]/10" />

                  {/* Variant selectors */}
                  <div className="space-y-3">
                    <span className="block text-[9px] font-bold uppercase tracking-widest text-[#2C1A11]/50">Available Sizes</span>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.map((v) => {
                        const isSelected = currentVariant.weight === v.weight;
                        return (
                          <button
                            key={v.weight}
                            onClick={() => handleVariantSelect(product.id, v)}
                            className={cn(
                              "px-5 py-3 text-[10px] font-bold uppercase tracking-widest border transition-all duration-300 cursor-pointer rounded-none min-h-[44px] flex items-center justify-center",
                              isSelected
                                ? "bg-[#2C1A11] text-[#FAF6F0] border-[#2C1A11]"
                                : "bg-white text-[#2C1A11] border-[#2C1A11]/15 hover:border-[#2C1A11]"
                            )}
                          >
                            {v.weight}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-center gap-4 bg-[#FAF6F0]/50 p-4 border border-[#2C1A11]/5 rounded-2xl w-fit">
                    <div>
                      <span className="block text-[8px] font-bold uppercase tracking-widest text-[#2C1A11]/40 leading-none mb-1">Starting Price</span>
                      <span className="text-2xl font-bold font-serif text-[#C89B3C]">
                        ₹{currentVariant.price}
                      </span>
                    </div>
                    {currentVariant.originalPrice && currentVariant.originalPrice > currentVariant.price && (
                      <>
                        <span className="text-xs line-through text-[#2C1A11]/45 font-bold self-end pb-0.5">
                          ₹{currentVariant.originalPrice}
                        </span>
                        <span className="bg-[#C89B3C]/10 text-[#C89B3C] border border-[#C89B3C]/20 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider self-end mb-0.5">
                          Save {Math.round(((currentVariant.originalPrice - currentVariant.price) / currentVariant.originalPrice) * 100)}%
                        </span>
                      </>
                    )}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 w-full">
                    <button
                      onClick={(e) => handleAddToCart(e, product, currentVariant)}
                      className="w-full sm:w-auto px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-center text-[#2C1A11] bg-white border border-[#2C1A11] hover:bg-[#2C1A11] hover:text-white transition-all duration-300 cursor-pointer min-h-[48px]"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleBuyNow(product, currentVariant)}
                      className="w-full sm:w-auto px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-center text-white bg-black hover:bg-[#C89B3C] border border-black hover:border-[#C89B3C] transition-all duration-300 cursor-pointer min-h-[48px]"
                    >
                      Buy Now
                    </button>
                    <Link
                      href={`/product/${product.id}`}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#C89B3C] hover:text-black transition-colors min-h-[48px]"
                    >
                      View Product
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                </motion.div>

              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
