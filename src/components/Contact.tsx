"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";

function ContactFormInner() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    product: "chilli",
    weight: "250g",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Check if query params exist (e.g. from clicking "Enquire Now" on a card)
    // Next.js searchParams handles this. But since it's a single page app,
    // we can check if there are search params.
    const productQuery = searchParams.get("product");
    const weightQuery = searchParams.get("weight");
    if (productQuery) {
      setFormData((prev) => ({
        ...prev,
        product: productQuery,
        weight: weightQuery || prev.weight,
      }));
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getProductName = (id: string) => {
    switch (id) {
      case "chilli":
        return "Mulaku Podi (Chilli Powder)";
      case "turmeric":
        return "Manjal Podi (Turmeric Powder)";
      case "coriander":
        return "Malli Podi (Coriander Powder)";
      case "coconut":
        return "Velichenna (Coconut Oil)";
      default:
        return "General Enquiry";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Format WhatsApp Message
    const whatsappNumber = "919876543210"; // Sample Kerala shop number
    const prodName = getProductName(formData.product);
    const text = `Hi Kerala Spices, I would like to place an enquiry:
*Name:* ${formData.name}
*Phone:* ${formData.phone}
*Product:* ${prodName}
*Weight/Qty:* ${formData.weight}
*Message:* ${formData.message || "None"}`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Open WhatsApp link
      window.open(whatsappUrl, "_blank");

      // Reset form
      setFormData({
        name: "",
        phone: "",
        product: "chilli",
        weight: "250g",
        message: "",
      });

      // Clear success state after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1200);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-cinnamon-900/5 relative">
      {isSuccess && (
        <div className="absolute inset-0 bg-white/95 rounded-3xl z-20 flex flex-col items-center justify-center text-center p-6 space-y-3">
          <CheckCircle className="w-16 h-16 text-coriander animate-bounce" />
          <h3 className="text-xl font-bold font-serif text-cinnamon-950">Enquiry Composed!</h3>
          <p className="text-xs text-cinnamon-900/70 max-w-xs">
            We have redirected you to WhatsApp to complete your enquiry. Our team will revert shortly with delivery charges.
          </p>
          <button
            onClick={() => setIsSuccess(false)}
            className="text-xs font-semibold text-turmeric underline hover:text-chilli"
          >
            Send Another Message
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <h3 className="text-xl font-bold font-serif text-cinnamon-950">Quick Purchase Enquiry</h3>
        <p className="text-xs text-cinnamon-900/60 leading-relaxed">
          Select your desired products and quantities. Submitting this form opens WhatsApp to verify delivery pincodes and wholesale pricing.
        </p>

        {/* Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-cinnamon-950 uppercase tracking-wide">Your Name</label>
          <input
            type="text"
            name="name"
            required
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-cinnamon-900/10 focus:border-turmeric focus:outline-hidden text-sm bg-sand-50/50"
          />
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-cinnamon-950 uppercase tracking-wide">Phone Number</label>
          <input
            type="tel"
            name="phone"
            required
            placeholder="Enter 10 digit number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-cinnamon-900/10 focus:border-turmeric focus:outline-hidden text-sm bg-sand-50/50"
          />
        </div>

        {/* Product Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-cinnamon-950 uppercase tracking-wide">Select Product</label>
            <select
              name="product"
              value={formData.product}
              onChange={handleChange}
              className="w-full px-3 py-2.5 rounded-xl border border-cinnamon-900/10 focus:border-turmeric focus:outline-hidden text-sm bg-sand-50/50"
            >
              <option value="chilli">Mulaku Podi (Chilli)</option>
              <option value="turmeric">Manjal Podi (Turmeric)</option>
              <option value="coriander">Malli Podi (Coriander)</option>
              <option value="coconut">Velichenna (Coconut Oil)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-cinnamon-950 uppercase tracking-wide">Weight/Size</label>
            <select
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="w-full px-3 py-2.5 rounded-xl border border-cinnamon-900/10 focus:border-turmeric focus:outline-hidden text-sm bg-sand-50/50"
            >
              {formData.product === "coconut" ? (
                <>
                  <option value="500ml">500ml</option>
                  <option value="1 Litre">1 Litre</option>
                  <option value="2 Litre">2 Litre</option>
                  <option value="5 Litre">5 Litre</option>
                </>
              ) : (
                <>
                  <option value="100g">100g</option>
                  <option value="250g">250g</option>
                  <option value="500g">500g</option>
                  <option value="1kg">1kg</option>
                </>
              )}
            </select>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-cinnamon-950 uppercase tracking-wide">Additional Notes (Optional)</label>
          <textarea
            name="message"
            rows={3}
            placeholder="Add delivery address or wholesale requests..."
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-cinnamon-900/10 focus:border-turmeric focus:outline-hidden text-sm bg-sand-50/50 resize-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-turmeric to-chilli hover:from-chilli hover:to-turmeric transition-all duration-300 shadow-md cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? (
            <span>Redirecting to WhatsApp...</span>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Submit Enquiry via WhatsApp</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-sand-50">
      {/* Glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 glow-chilli rounded-full opacity-35 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-6">
            <Suspense fallback={<div className="p-8 text-center text-xs text-cinnamon-900/50">Loading Enquiry System...</div>}>
              <ContactFormInner />
            </Suspense>
          </div>

          {/* Right Column: Address and Styled Visual Map */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <span className="text-sm font-semibold tracking-wider text-turmeric uppercase">Get In Touch</span>
              <h2 className="text-3xl sm:text-4xl font-bold font-serif text-cinnamon-950">
                Taste the Purity of Kerala
              </h2>
              <p className="text-sm text-cinnamon-900/70 leading-relaxed">
                Have questions about custom orders, shipping outside Kerala, or wholesale dealership packages? Contact us directly or visit our grinding unit in Wayanad.
              </p>
            </div>

            {/* Quick Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-4 border border-cinnamon-900/5 flex flex-col items-center text-center space-y-2">
                <div className="p-2.5 bg-turmeric/10 rounded-xl text-turmeric">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <span className="block text-[10px] uppercase font-bold text-cinnamon-900/40">Call Us</span>
                  <span className="text-xs font-bold text-cinnamon-950">+91 98765 43210</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-cinnamon-900/5 flex flex-col items-center text-center space-y-2">
                <div className="p-2.5 bg-chilli/10 rounded-xl text-chilli">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <span className="block text-[10px] uppercase font-bold text-cinnamon-900/40">Email Us</span>
                  <span className="text-xs font-bold text-cinnamon-950">enquire@keralaspiceco.com</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-cinnamon-900/5 flex flex-col items-center text-center space-y-2">
                <div className="p-2.5 bg-coriander/10 rounded-xl text-coriander">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <span className="block text-[10px] uppercase font-bold text-cinnamon-900/40">Working Hours</span>
                  <span className="text-[10px] font-bold text-cinnamon-950">08:00 AM - 07:00 PM</span>
                </div>
              </div>
            </div>

            {/* Premium Styled Map Placeholder Dashboard */}
            <div className="bg-cinnamon-950 text-white rounded-3xl p-6 relative overflow-hidden border border-white/5 shadow-inner select-none">
              <div className="absolute inset-0 bg-radial from-turmeric/15 to-transparent pointer-events-none" />
              <div className="relative z-10 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-turmeric uppercase tracking-widest">Milling & Packaging Unit</span>
                  <span className="text-[10px] font-semibold text-white/50">Wayanad, Kerala</span>
                </div>

                {/* Styled CSS Map Grid */}
                <div className="h-36 rounded-2xl bg-black/30 border border-white/10 relative overflow-hidden flex items-center justify-center">
                  {/* Grid Lines */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:14px_24px]" />
                  {/* Circle sonar pulses */}
                  <div className="absolute w-24 h-24 rounded-full border border-turmeric/20 animate-ping opacity-60" />
                  <div className="absolute w-12 h-12 rounded-full border border-turmeric/30 animate-pulse" />
                  {/* Map Pin Marker */}
                  <div className="relative flex flex-col items-center">
                    <span className="text-2xl animate-bounce">📍</span>
                    <span className="text-[9px] uppercase tracking-wider font-bold bg-turmeric text-white px-2 py-0.5 rounded shadow-sm">
                      Kerala Spices Co.
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-white/70 leading-relaxed text-center">
                  Address: Harvest House, Spice Road, Kalpetta, Wayanad, Kerala, 673121 <br />
                  <span className="text-[10px] text-turmeric-light font-bold">Coordinates: 11.6102° N, 76.0827° E</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
