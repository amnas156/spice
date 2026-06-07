"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Check, AlertCircle, Send } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // Simple client side validation
    if (!formData.name || !formData.email || !formData.phone || !formData.subject || !formData.message) {
      setTimeout(() => setStatus("error"), 600);
      return;
    }

    // Construct WhatsApp message
    const whatsappNumber = "919876543210";
    const text = `Hi JADEED Spices, I have a contact enquiry:
*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${formData.phone}
*Subject:* ${formData.subject}
*Message:* ${formData.message}`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

    // Simulate sending, show success state, and redirect
    setTimeout(() => {
      setStatus("success");
      window.open(whatsappUrl, "_blank");

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });

      // Revert status to idle after some time
      setTimeout(() => setStatus("idle"), 4000);
    }, 1200);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 relative overflow-hidden bg-[#FAF6F0] border-t border-[#2C1A11]/5">
      {/* Background Decorative Radial Glows */}
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-[#C89B3C]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#2C1A11]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C89B3C]">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-medium tracking-wide text-[#2C1A11]">
            Get In Touch
          </h2>
          <p className="text-xs sm:text-sm text-[#2C1A11]/60 leading-relaxed font-sans max-w-xl mx-auto font-medium">
            We would love to hear from you. Contact us for orders, wholesale enquiries, product information, and customer support.
          </p>
        </div>

        {/* 50/50 Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          
          {/* LEFT SIDE (50%): Large Google Maps Embed */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col order-1"
          >
            <div className="w-full flex-1 min-h-[300px] sm:min-h-[400px] lg:min-h-none h-full bg-white border border-[#2C1A11]/5 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 relative p-2">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3909.117180126588!2d76.20487741481504!3d11.234335391997236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba63a48ab459219%3A0x3f865860de7e8960!2sJADEED%20RICE%20AND%20FLOUR%20MILL!5e0!3m2!1sen!2sin!4v1655000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0, borderRadius: "1.25rem" }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="filter grayscale-[20%] contrast-[90%] brightness-[98%]"
              />
            </div>
          </motion.div>

          {/* RIGHT SIDE (50%): Contact Form & Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-6 flex flex-col justify-between space-y-8 order-2"
          >
            {/* Contact Form Wrapper */}
            <div className="bg-white border border-[#2C1A11]/5 rounded-3xl p-8 shadow-xs relative overflow-hidden">
              
              {/* Success/Error overlays */}
              <AnimatePresence>
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-white/95 z-20 flex flex-col items-center justify-center text-center p-6 space-y-4"
                  >
                    <div className="bg-[#C89B3C]/10 text-[#C89B3C] border border-[#C89B3C]/20 rounded-full p-3 flex items-center justify-center">
                      <Check className="w-8 h-8 stroke-[2.5px]" />
                    </div>
                    <h4 className="text-xl font-serif font-medium text-[#2C1A11]">Message Formatted!</h4>
                    <p className="text-xs text-[#2C1A11]/60 max-w-xs leading-relaxed font-medium">
                      Redirecting to WhatsApp to submit your request directly to our customer support desk.
                    </p>
                  </motion.div>
                )}

                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-white/95 z-20 flex flex-col items-center justify-center text-center p-6 space-y-4"
                  >
                    <div className="bg-red-50 text-red-600 border border-red-200 rounded-full p-3 flex items-center justify-center">
                      <AlertCircle className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-serif font-medium text-red-700">Submission Error</h4>
                    <p className="text-xs text-[#2C1A11]/60 max-w-xs leading-relaxed font-medium">
                      Please make sure all form fields are filled out correctly before sending.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="text-xs font-bold uppercase tracking-widest text-[#2C1A11] underline hover:text-[#C89B3C]"
                    >
                      Try Again
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* 2-column input row for Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[8px] font-bold uppercase tracking-widest text-[#2C1A11]/50">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#2C1A11]/10 focus:border-[#C89B3C] focus:outline-hidden text-xs bg-transparent rounded-none transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[8px] font-bold uppercase tracking-widest text-[#2C1A11]/50">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#2C1A11]/10 focus:border-[#C89B3C] focus:outline-hidden text-xs bg-transparent rounded-none transition-colors"
                    />
                  </div>
                </div>

                {/* 2-column input row for Phone & Subject */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[8px] font-bold uppercase tracking-widest text-[#2C1A11]/50">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#2C1A11]/10 focus:border-[#C89B3C] focus:outline-hidden text-xs bg-transparent rounded-none transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[8px] font-bold uppercase tracking-widest text-[#2C1A11]/50">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      required
                      placeholder="e.g. Wholesale Enquiry"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#2C1A11]/10 focus:border-[#C89B3C] focus:outline-hidden text-xs bg-transparent rounded-none transition-colors"
                    />
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="space-y-1.5">
                  <label className="block text-[8px] font-bold uppercase tracking-widest text-[#2C1A11]/50">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell us what you need..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#2C1A11]/10 focus:border-[#C89B3C] focus:outline-hidden text-xs bg-transparent rounded-none resize-none transition-colors"
                  />
                </div>

                {/* Submit button with micro-interactions */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-4 bg-black hover:bg-[#C89B3C] text-white text-[10px] font-bold uppercase tracking-widest transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  {status === "loading" ? "Formatting Message..." : "Send Message"}
                </button>
              </form>
            </div>

            {/* Direct Contact Details Block */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white border border-[#2C1A11]/5 rounded-2xl p-5 flex items-start gap-4">
                <div className="p-2.5 bg-[#FAF6F0] rounded-xl text-[#C89B3C] shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <span className="block text-[8px] font-bold uppercase tracking-widest text-[#2C1A11]/40 leading-none">Phone Number</span>
                  <span className="text-xs font-bold text-[#2C1A11] block">+91 98765 43210</span>
                </div>
              </div>

              <div className="bg-white border border-[#2C1A11]/5 rounded-2xl p-5 flex items-start gap-4">
                <div className="p-2.5 bg-[#FAF6F0] rounded-xl text-[#C89B3C] shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <span className="block text-[8px] font-bold uppercase tracking-widest text-[#2C1A11]/40 leading-none">Email Address</span>
                  <span className="text-xs font-bold text-[#2C1A11] block truncate">enquire@jadeed.com</span>
                </div>
              </div>

              <div className="bg-white border border-[#2C1A11]/5 rounded-2xl p-5 flex items-start gap-4">
                <div className="p-2.5 bg-[#FAF6F0] rounded-xl text-[#C89B3C] shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <span className="block text-[8px] font-bold uppercase tracking-widest text-[#2C1A11]/40 leading-none">Business Address</span>
                  <span className="text-[10px] font-bold text-[#2C1A11] block leading-normal">
                    JADEED RICE &amp; FLOUR MILL, Chirakkal, Kuttumunda, Naduvath, Kerala 679328
                  </span>
                  <span className="block text-[8px] text-[#C89B3C]/80 font-mono">
                    Coordinates: 11.2343° N, 76.2071° E
                  </span>
                </div>
              </div>

              <div className="bg-white border border-[#2C1A11]/5 rounded-2xl p-5 flex items-start gap-4">
                <div className="p-2.5 bg-[#FAF6F0] rounded-xl text-[#C89B3C] shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <span className="block text-[8px] font-bold uppercase tracking-widest text-[#2C1A11]/40 leading-none">Working Hours</span>
                  <span className="text-xs font-bold text-[#2C1A11] block">
                    08:00 AM - 07:00 PM (IST)
                  </span>
                </div>
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
