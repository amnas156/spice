"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Star, Minus, Plus, ShoppingCart, ArrowLeft, ChevronRight, 
  Check, Truck, ShieldCheck, Award, MessageSquare, Heart, Share2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Product, ProductVariant, productsData } from "@/lib/products";
import { cn } from "@/lib/utils";

interface ToastState {
  show: boolean;
  message: string;
}

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  // Component States
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImage, setActiveImage] = useState<string>(product.variants[0].image);
  const [activeTab, setActiveTab] = useState<string>("description");
  const [reviewsList, setReviewsList] = useState(product.reviews || []);
  const [toast, setToast] = useState<ToastState>({ show: false, message: "" });
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [showMobileSticky, setShowMobileSticky] = useState<boolean>(false);

  // Ref for the main buy area to detect when it scrolls off-screen on mobile
  const buySectionRef = useRef<HTMLDivElement>(null);
  
  // Magnifier Zoom Ref & State
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({
    transform: "scale(1)",
    transformOrigin: "center center"
  });

  // Track scroll position to toggle the mobile sticky bar
  useEffect(() => {
    const handleScroll = () => {
      if (!buySectionRef.current) return;
      const rect = buySectionRef.current.getBoundingClientRect();
      if (rect.bottom < 0) {
        setShowMobileSticky(true);
      } else {
        setShowMobileSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update active image and state when product changes
  useEffect(() => {
    setSelectedVariant(product.variants[0]);
    setActiveImage(product.variants[0].image);
    setReviewsList(product.reviews || []);
    setQuantity(1);
    setIsFavorite(false);
  }, [product]);

  // Handle variant capsule selection
  const handleVariantChange = (variant: ProductVariant) => {
    setSelectedVariant(variant);
    setActiveImage(variant.image);
  };

  // Magnifier Zoom Effects
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transform: "scale(2.2)",
      transformOrigin: `${x}% ${y}%`
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transform: "scale(1)",
      transformOrigin: "center center"
    });
  };

  // Quantity controllers
  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // Add to Cart Simulation
  const handleAddToCart = () => {
    const message = `Added ${quantity} x JADEED ${product.name} (${selectedVariant.weight}) to your cart!`;
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: "" });
    }, 4000);
  };

  // Direct buy redirecting to WhatsApp
  const handleBuyNow = () => {
    const whatsappNumber = "919876543210";
    const totalPrice = selectedVariant.price * quantity;
    const text = `Hi JADEED Spices, I would like to order:
*Product:* JADEED ${product.name} (${product.subtitle})
*Size/Weight:* ${selectedVariant.weight}
*Quantity:* ${quantity}
*Total Price:* ₹${totalPrice} (₹${selectedVariant.price} x ${quantity})
*Delivery Area:* Please verify my shipping pincode.`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${whatsappNumber}?text=${encoded}`, "_blank");
  };

  // Review interaction: helpful vote
  const handleHelpfulVote = (reviewId: string) => {
    setReviewsList((prev) =>
      prev.map((rev) => {
        if (rev.id === reviewId) {
          return { ...rev, likes: rev.likes + 1 };
        }
        return rev;
      })
    );
  };

  // Find related products (exclude current)
  const relatedProducts = productsData.filter((p) => p.id !== product.id).slice(0, 3);
  const primaryThemeColor = product.color;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Dynamic Toast Feedback Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#2C1A11] text-[#FAF6F0] px-6 py-4 rounded-xl border border-[#C89B3C]/35 shadow-2xl flex items-center gap-3 max-w-sm w-[90%]"
          >
            <div className="bg-[#C89B3C] text-black rounded-full p-1.5 flex items-center justify-center">
              <Check className="w-4 h-4 stroke-[3px]" />
            </div>
            <p className="text-xs font-bold uppercase tracking-widest">{toast.message}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Breadcrumbs */}
      <nav className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#2C1A11]/50 mb-10">
        <Link href="/" className="hover:text-[#C89B3C] transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 opacity-60" />
        <Link href="/#products" className="hover:text-[#C89B3C] transition-colors">Products</Link>
        <ChevronRight className="w-3.5 h-3.5 opacity-60" />
        <span className="text-[#2C1A11]">{product.name}</span>
      </nav>

      {/* Main Grid: Left Gallery, Right Options */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* LEFT SIDE: Image Gallery */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Image Frame */}
          <div 
            ref={imageContainerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full aspect-square bg-white border border-[#2C1A11]/5 rounded-3xl p-8 flex items-center justify-center relative overflow-hidden group cursor-zoom-in"
          >
            {/* Product Theme Ambient Glow */}
            <div 
              className="absolute w-[60%] h-[60%] rounded-full filter blur-[100px] opacity-15 pointer-events-none transition-colors duration-500"
              style={{ backgroundColor: primaryThemeColor }}
            />

            {/* Main Dynamic Image Wrapper with Zoom */}
            <div 
              className="w-full h-full relative transition-all duration-300 ease-out"
              style={{ 
                transform: zoomStyle.transform, 
                transformOrigin: zoomStyle.transformOrigin 
              }}
            >
              {activeImage.startsWith("/") ? (
                <img
                  src={activeImage}
                  alt={`JADEED ${product.name}`}
                  className="w-full h-full object-contain pointer-events-none"
                />
              ) : activeImage === "css-coconut-bottle" ? (
                <div className="w-full h-full flex items-center justify-center pointer-events-none scale-110">
                  <div className="w-[120px] h-[300px] relative flex flex-col items-center">
                    <div className="w-8 h-8 bg-[#111111] border border-[#C89B3C]/30 z-15 shadow-sm" />
                    <div className="w-5 h-5 bg-[#C89B3C]/80 z-10" />
                    <div className="w-26 flex-1 bg-gradient-to-b from-[#C89B3C] to-[#8C6010] border border-[#C89B3C]/30 relative flex items-center justify-center p-3">
                      <div className="absolute top-2 left-1.5 w-1.5 h-[92%] bg-white/15 blur-[0.5px]" />
                      <div className="w-full py-4 px-2 text-center bg-[#8D6E63] border border-white/10 shadow-md">
                        <span className="block text-[6px] uppercase tracking-widest text-[#C89B3C] font-bold">JADEED</span>
                        <span className="block text-[9px] font-serif text-white uppercase font-light leading-none mt-1">VELICHENNA</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center pointer-events-none">
                  <div 
                    className="w-[220px] h-[290px] border-2 p-6 flex flex-col justify-between relative shadow-2xl transition-all duration-500"
                    style={{ backgroundColor: primaryThemeColor, borderColor: `${primaryThemeColor}20` }}
                  >
                    <div className="absolute inset-2 border border-white/10 pointer-events-none" />
                    <div className="text-center space-y-1">
                      <span className="block text-[7px] uppercase tracking-[0.3em] text-[#C89B3C] font-bold">PURE KERALA SPICE</span>
                      <h4 className="text-[12px] font-serif tracking-widest text-white leading-none mt-1">JADEED</h4>
                    </div>
                    <div className="text-center">
                      <span className="block text-[18px] font-serif tracking-widest text-[#C89B3C] uppercase font-light leading-none">{product.name}</span>
                    </div>
                    <div className="flex justify-between items-end text-[7px] tracking-widest text-white/60">
                      <span>NET WT. {selectedVariant.weight}</span>
                      <span>100% PURE</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Subtle Hover Indicator */}
            <div className="absolute bottom-4 right-4 bg-black/60 text-white text-[8px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full pointer-events-none opacity-100 group-hover:opacity-0 transition-opacity duration-300">
              Hover to Zoom
            </div>
          </div>

          {/* Thumbnails Row */}
          <div className="grid grid-cols-5 gap-3">
            <button
              onClick={() => setActiveImage(selectedVariant.image)}
              className={cn(
                "aspect-square bg-white border rounded-xl p-2 flex items-center justify-center relative overflow-hidden transition-all duration-300 cursor-pointer",
                activeImage === selectedVariant.image ? "border-[#C89B3C] ring-2 ring-[#C89B3C]/10" : "border-[#2C1A11]/10 hover:border-[#2C1A11]/30"
              )}
            >
              {selectedVariant.image.startsWith("/") ? (
                <img src={selectedVariant.image} alt="Package variant thumbnail" className="w-full h-full object-contain" />
              ) : (
                <div className="w-8 h-10 rounded-xs" style={{ backgroundColor: primaryThemeColor }} />
              )}
            </button>

            {product.gallery && product.gallery.map((imgUrl, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(imgUrl)}
                className={cn(
                  "aspect-square bg-white border rounded-xl overflow-hidden transition-all duration-300 cursor-pointer flex items-center justify-center p-1",
                  activeImage === imgUrl ? "border-[#C89B3C] ring-2 ring-[#C89B3C]/10" : "border-[#2C1A11]/10 hover:border-[#2C1A11]/30"
                )}
              >
                <img 
                  src={imgUrl} 
                  alt={`Gallery detail ${idx + 1}`} 
                  className="w-full h-full object-cover rounded-lg"
                />
              </button>
            ))}

            {(!product.gallery || product.gallery.length === 0) && (
              <>
                <div className="aspect-square bg-white/40 border border-dashed border-[#2C1A11]/10 rounded-xl flex flex-col items-center justify-center p-2 text-center text-[7px] font-bold uppercase tracking-wider text-[#2C1A11]/30">
                  <span>Pure</span>
                  <span>Quality</span>
                </div>
                <div className="aspect-square bg-white/40 border border-dashed border-[#2C1A11]/10 rounded-xl flex flex-col items-center justify-center p-2 text-center text-[7px] font-bold uppercase tracking-wider text-[#2C1A11]/30">
                  <span>No</span>
                  <span>Colors</span>
                </div>
                <div className="aspect-square bg-white/40 border border-dashed border-[#2C1A11]/10 rounded-xl flex flex-col items-center justify-center p-2 text-center text-[7px] font-bold uppercase tracking-wider text-[#2C1A11]/30">
                  <span>Traditional</span>
                </div>
                <div className="aspect-square bg-white/40 border border-dashed border-[#2C1A11]/10 rounded-xl flex flex-col items-center justify-center p-2 text-center text-[7px] font-bold uppercase tracking-wider text-[#2C1A11]/30">
                  <span>Direct</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* RIGHT SIDE: Product Options & Details */}
        <div ref={buySectionRef} className="lg:col-span-5 space-y-8 lg:sticky lg:top-32">
          
          {/* Product Header */}
          <div className="space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C89B3C]">
              {product.subtitle}
            </span>
            
            <div className="flex flex-wrap items-baseline gap-3">
              <h1 className="text-4xl sm:text-5xl font-medium font-serif tracking-wide text-[#2C1A11]">
                {product.name}
              </h1>
              <span className="text-lg font-serif text-[#C89B3C] italic font-light">
                ({product.malayalam})
              </span>
            </div>

            {/* Rating & Favorite */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={cn(
                        "w-4 h-4 stroke-[1.5px]",
                        i < Math.floor(product.rating) ? "fill-[#C89B3C] text-[#C89B3C]" : "text-[#2C1A11]/20"
                      )} 
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-[#2C1A11]">{product.rating}</span>
                <span className="text-[#2C1A11]/30">•</span>
                <a href="#reviews-anchor" className="text-xs font-bold text-[#C89B3C] hover:underline uppercase tracking-wider">
                  {reviewsList.length} Reviews
                </a>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={cn(
                    "p-2.5 rounded-full border transition-all duration-300 cursor-pointer",
                    isFavorite 
                      ? "bg-red-50 border-red-200 text-red-500" 
                      : "bg-transparent border-[#2C1A11]/10 text-[#2C1A11]/60 hover:text-[#2C1A11] hover:border-[#2C1A11]/20"
                  )}
                >
                  <Heart className={cn("w-4 h-4", isFavorite && "fill-current")} />
                </button>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    setToast({ show: true, message: "Product link copied to clipboard!" });
                    setTimeout(() => setToast({ show: false, message: "" }), 3000);
                  }}
                  className="p-2.5 rounded-full border border-[#2C1A11]/10 text-[#2C1A11]/60 hover:text-[#2C1A11] hover:border-[#2C1A11]/20 bg-transparent transition-all duration-300 cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-[#2C1A11]/70 leading-relaxed font-sans font-medium">
            {product.description}
          </p>

          <div className="h-[1px] w-full bg-[#2C1A11]/10" />

          {/* Variant Selector */}
          <div className="space-y-4">
            <div className="flex justify-between items-baseline">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#2C1A11]/50">Select Variant</span>
              <span className="text-xs font-bold text-[#C89B3C] uppercase tracking-wider">{selectedVariant.weight} pack</span>
            </div>
            
            <div className="flex flex-wrap gap-2.5">
              {product.variants.map((v) => {
                const isSelected = selectedVariant.weight === v.weight;
                return (
                  <button
                    key={v.weight}
                    onClick={() => handleVariantChange(v)}
                    className={cn(
                      "px-5 py-3 text-xs font-bold uppercase tracking-widest border transition-all duration-300 cursor-pointer rounded-none relative overflow-hidden",
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

          {/* Price & Savings Display */}
          <div className="p-5 bg-white border border-[#2C1A11]/5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
            <div className="space-y-1">
              <span className="block text-[9px] font-bold uppercase tracking-widest text-[#2C1A11]/40">Price</span>
              <div className="flex items-baseline gap-2.5">
                <span className="text-3xl font-bold font-serif text-[#C89B3C]">
                  ₹{selectedVariant.price}
                </span>
                {selectedVariant.originalPrice && selectedVariant.originalPrice > selectedVariant.price && (
                  <span className="text-sm line-through text-[#2C1A11]/40 font-medium">
                    ₹{selectedVariant.originalPrice}
                  </span>
                )}
              </div>
            </div>

            {selectedVariant.originalPrice && selectedVariant.originalPrice > selectedVariant.price && (
              <div className="text-right">
                <span className="inline-block bg-[#C89B3C]/10 text-[#C89B3C] border border-[#C89B3C]/20 px-3.5 py-1.5 text-[9px] font-bold uppercase tracking-wider">
                  Save {Math.round(((selectedVariant.originalPrice - selectedVariant.price) / selectedVariant.originalPrice) * 100)}%
                </span>
                <span className="block text-[8px] text-[#2C1A11]/40 uppercase font-bold tracking-widest mt-1">
                  You save ₹{selectedVariant.originalPrice - selectedVariant.price}
                </span>
              </div>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="space-y-3">
            <span className="block text-[10px] font-bold uppercase tracking-widest text-[#2C1A11]/50">Quantity</span>
            <div className="inline-flex items-center border border-[#2C1A11]/15 bg-white rounded-none">
              <button
                onClick={decrementQuantity}
                className="p-3 text-[#2C1A11]/70 hover:text-[#2C1A11] transition-colors cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-12 text-center text-xs font-bold font-sans">
                {quantity}
              </span>
              <button
                onClick={incrementQuantity}
                className="p-3 text-[#2C1A11]/70 hover:text-[#2C1A11] transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Call To Actions */}
          <div className="space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <button
                onClick={handleAddToCart}
                className="w-full py-4.5 text-xs font-bold uppercase tracking-widest text-center text-[#2C1A11] bg-white border border-[#2C1A11] hover:bg-[#2C1A11] hover:text-white transition-all duration-300 cursor-pointer shadow-xs"
              >
                <span className="flex items-center justify-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </span>
              </button>
              <button
                onClick={handleBuyNow}
                className="w-full py-4.5 text-xs font-bold uppercase tracking-widest text-center text-white bg-black hover:bg-[#C89B3C] border border-black hover:border-[#C89B3C] transition-all duration-300 cursor-pointer shadow-md"
              >
                Buy Now
              </button>
            </div>

            {/* Cart trust guarantees */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[9px] font-bold uppercase tracking-widest text-[#2C1A11]/60 pt-2">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#C89B3C]" />
                Free Shipping above ₹499
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C89B3C]" />
                100% Secure Transaction
              </span>
              <span className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#C89B3C]" />
                100% Organic &amp; Pure
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* Section: Accordion Tabs */}
      <div className="mt-24 border-t border-[#2C1A11]/10 pt-16">
        
        {/* Tabs Selector */}
        <div className="flex border-b border-[#2C1A11]/10 overflow-x-auto whitespace-nowrap scrollbar-none pb-px mb-12">
          <div className="flex gap-8 sm:gap-12">
            {[
              { id: "description", label: "Description" },
              { id: "ingredients", label: "Ingredients" },
              { id: "storage", label: "Storage" },
              { id: "shipping", label: "Shipping & Returns" }
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "text-[10px] font-bold uppercase tracking-[0.25em] pb-5 border-b-2 transition-all duration-300 cursor-pointer",
                    isActive
                      ? "border-[#C89B3C] text-[#2C1A11]"
                      : "border-transparent text-[#2C1A11]/40 hover:text-[#2C1A11]"
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab content panel */}
        <div className="max-w-4xl min-h-[160px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 text-xs sm:text-sm text-[#2C1A11]/70 leading-relaxed font-sans"
            >
              {activeTab === "description" && (
                <div className="space-y-4">
                  <p className="font-semibold text-[#2C1A11]">Authentic Wayanad &amp; Idukki Quality Spices</p>
                  <p>{product.longDescription}</p>
                </div>
              )}

              {activeTab === "ingredients" && (
                <div className="space-y-3">
                  <p className="font-semibold text-[#2C1A11]">What goes in JADEED Spices:</p>
                  <ul className="list-disc list-inside space-y-1.5 font-medium">
                    {product.ingredients.map((ing, idx) => (
                      <li key={idx} className="text-[#2C1A11]">{ing}</li>
                    ))}
                    <li>No added MSG or chemical food enhancers</li>
                    <li>No artificial preservatives or chemical colors</li>
                    <li>100% Vegan &amp; Gluten-Free</li>
                  </ul>
                </div>
              )}

              {activeTab === "storage" && (
                <div className="space-y-3">
                  <p className="font-semibold text-[#2C1A11]">Preserving the freshness and oils:</p>
                  <p>{product.storage}</p>
                </div>
              )}

              {activeTab === "shipping" && (
                <div className="space-y-3">
                  <p className="font-semibold text-[#2C1A11]">Delivery details &amp; JADEED assurance:</p>
                  <p>{product.shipping}</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Section: Customer Reviews */}
      <div id="reviews-anchor" className="mt-28 border-t border-[#2C1A11]/10 pt-16">
        <h2 className="text-3xl font-serif font-medium tracking-wide text-[#2C1A11] mb-12">
          Customer Reviews
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Score Breakdown */}
          <div className="lg:col-span-4 p-8 bg-white border border-[#2C1A11]/5 rounded-3xl space-y-6">
            <div className="space-y-2">
              <span className="text-5xl font-serif font-bold text-[#2C1A11]">{product.rating}</span>
              <span className="text-sm font-bold text-[#2C1A11]/40"> out of 5</span>
              
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={cn(
                      "w-5 h-5",
                      i < Math.floor(product.rating) ? "fill-[#C89B3C] text-[#C89B3C]" : "text-[#2C1A11]/10"
                    )} 
                  />
                ))}
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#2C1A11]/50">Based on verified orders</p>
            </div>

            <div className="space-y-3">
              {[
                { stars: 5, pct: 90 },
                { stars: 4, pct: 8 },
                { stars: 3, pct: 2 },
                { stars: 2, pct: 0 },
                { stars: 1, pct: 0 }
              ].map((row) => (
                <div key={row.stars} className="flex items-center gap-3 text-xs font-semibold">
                  <span className="w-3 text-[#2C1A11]">{row.stars}★</span>
                  <div className="flex-1 h-2 bg-[#FAF6F0] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#C89B3C]" 
                      style={{ width: `${row.pct}%` }}
                    />
                  </div>
                  <span className="w-8 text-right text-[#2C1A11]/50">{row.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Reviews list */}
          <div className="lg:col-span-8 space-y-6">
            {reviewsList.length === 0 ? (
              <div className="p-8 text-center bg-white border border-dashed border-[#2C1A11]/15 rounded-3xl space-y-4">
                <MessageSquare className="w-8 h-8 text-[#C89B3C] mx-auto opacity-60" />
                <p className="text-sm font-semibold tracking-wide">No reviews yet for this product</p>
                <p className="text-xs text-[#2C1A11]/50">Be the first to review JADEED {product.name} after your purchase!</p>
              </div>
            ) : (
              reviewsList.map((rev) => (
                <div 
                  key={rev.id} 
                  className="p-6 bg-white border border-[#2C1A11]/5 rounded-3xl space-y-4 shadow-2xs hover:shadow-xs transition-shadow duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <p className="font-bold text-[#2C1A11] flex items-center gap-2 text-sm uppercase tracking-wide">
                        {rev.userName}
                        {rev.verified && (
                          <span className="inline-flex items-center gap-0.5 bg-green-50 text-green-700 border border-green-200 text-[8px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                            <Check className="w-2 h-2 stroke-[3px]" />
                            Verified
                          </span>
                        )}
                      </p>
                      <span className="text-[10px] text-[#2C1A11]/40 font-bold uppercase tracking-wider">{rev.date}</span>
                    </div>

                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={cn(
                            "w-3 h-3",
                            i < rev.rating ? "fill-[#C89B3C] text-[#C89B3C]" : "text-[#2C1A11]/10"
                          )} 
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#2C1A11]/70 leading-relaxed font-sans">
                    {rev.comment}
                  </p>

                  <div className="flex items-center gap-4 pt-1 text-[10px] font-bold uppercase tracking-widest text-[#2C1A11]/50">
                    <span>Was this review helpful?</span>
                    <button
                      onClick={() => handleHelpfulVote(rev.id)}
                      className="flex items-center gap-1 px-2.5 py-1.5 border border-[#2C1A11]/10 hover:border-[#2C1A11]/30 bg-transparent rounded-full hover:text-[#C89B3C] transition-all duration-300 cursor-pointer"
                    >
                      Helpful ({rev.likes})
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>

      {/* Section: Related Spices Carousel */}
      <div className="mt-32 border-t border-[#2C1A11]/10 pt-16">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-[9px] font-bold uppercase tracking-widest text-[#C89B3C] block mb-2">Explore the Range</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-medium tracking-wide text-[#2C1A11]">
              Related Products
            </h2>
          </div>
          <Link 
            href="/#products" 
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2C1A11]/60 hover:text-[#C89B3C] border-b border-[#2C1A11]/20 hover:border-[#C89B3C] pb-1 transition-all duration-300"
          >
            All Products →
          </Link>
        </div>

        {/* Related Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedProducts.map((p) => {
            const starterVariant = p.variants[0];
            return (
              <Link
                href={`/product/${p.id}`}
                key={p.id}
                className="bg-white border border-[#2C1A11]/5 rounded-3xl p-6 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-full aspect-square flex items-center justify-center p-4 bg-transparent relative overflow-hidden mb-6">
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300 flex items-center justify-center z-20">
                    <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 text-[9px] font-bold uppercase tracking-widest text-white bg-black px-4 py-2 border border-[#C89B3C]/30 transform translate-y-2 group-hover:translate-y-0">
                      View Details
                    </span>
                  </div>
                  
                  {starterVariant.image.startsWith("/") ? (
                    <img 
                      src={starterVariant.image} 
                      alt={p.name} 
                      className="w-full h-full max-h-[160px] object-contain transition-transform duration-300 group-hover:scale-105" 
                    />
                  ) : (
                    <div 
                      className="w-[110px] h-[150px] border p-3 flex flex-col justify-between relative shadow-md group-hover:scale-105 transition-transform duration-300"
                      style={{ backgroundColor: p.color, borderColor: `${p.color}20` }}
                    >
                      <div className="absolute inset-1 border border-white/10 pointer-events-none" />
                      <div className="text-center">
                        <span className="block text-[8px] font-serif text-[#C89B3C] leading-none uppercase">{p.name}</span>
                      </div>
                      <span className="text-[6px] tracking-wider text-white/50 text-center font-bold">NET WT. {starterVariant.weight}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#C89B3C]">{p.subtitle}</span>
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-base font-medium font-serif tracking-wide text-[#2C1A11]">{p.name}</h3>
                      <span className="text-xs font-bold text-[#C89B3C]">From ₹{starterVariant.price}</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* MOBILE STICKY CTA BAR */}
      <AnimatePresence>
        {showMobileSticky && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#2C1A11]/15 px-4 py-3 shadow-2xl flex items-center justify-between lg:hidden"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FAF6F0] rounded-lg p-1 border border-[#2C1A11]/5 flex items-center justify-center overflow-hidden">
                {selectedVariant.image.startsWith("/") ? (
                  <img src={selectedVariant.image} alt={product.name} className="w-full h-full object-contain" />
                ) : (
                  <div className="w-full h-full rounded-sm" style={{ backgroundColor: primaryThemeColor }} />
                )}
              </div>
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#2C1A11] leading-none">{product.name}</h4>
                <span className="text-[9px] text-[#2C1A11]/50 font-bold uppercase tracking-wider block mt-1">
                  {selectedVariant.weight} • ₹{selectedVariant.price}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center border border-[#2C1A11]/15 bg-[#FAF6F0]">
                <button 
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-2.5 py-1.5 text-xs text-[#2C1A11]/60"
                >
                  -
                </button>
                <span className="text-[10px] font-bold px-1.5">{quantity}</span>
                <button 
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-2.5 py-1.5 text-xs text-[#2C1A11]/60"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleBuyNow}
                className="bg-black hover:bg-[#C89B3C] text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2.5 rounded-none"
              >
                Buy Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
