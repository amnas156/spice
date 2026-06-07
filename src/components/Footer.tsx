"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="relative bg-[#111111] text-white/80 pt-20 pb-12 overflow-hidden border-t border-white/5">
      {/* Subtle Ambient Glow */}
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#C89B3C]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 pb-16 border-b border-white/10">
          
          {/* Logo & Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6">
            <a href="#home" className="inline-block group">
              <img 
                src="/images/jadeed-logo-light.svg" 
                alt="JADEED Logo" 
                className="h-10 w-auto transition-transform duration-300 group-hover:scale-102" 
              />
            </a>
            
            <div className="space-y-3">
              <span className="block text-[9px] font-bold uppercase tracking-[0.3em] text-[#C89B3C]">
                PURE • NATURAL • AUTHENTIC
              </span>
              <p className="text-xs text-white/50 max-w-sm mx-auto md:mx-0 leading-relaxed font-sans">
                Premium Kerala spices and coconut oil crafted for homes that value real taste, purity, and tradition.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 md:pl-12 flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#C89B3C]">
              Navigation
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#home" className="text-xs font-semibold text-white/60 hover:text-white transition-colors duration-200 uppercase tracking-wider">
                  Home
                </a>
              </li>
              <li>
                <a href="#products" className="text-xs font-semibold text-white/60 hover:text-white transition-colors duration-200 uppercase tracking-wider">
                  Products
                </a>
              </li>
              <li>
                <a href="#about" className="text-xs font-semibold text-white/60 hover:text-white transition-colors duration-200 uppercase tracking-wider">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="text-xs font-semibold text-white/60 hover:text-white transition-colors duration-200 uppercase tracking-wider">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details (No icons, text only) */}
          <div className="space-y-4 flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#C89B3C]">
              Contact Store
            </h3>
            <ul className="space-y-3.5 text-xs text-white/60">
              <li className="space-y-1">
                <span className="block text-[8px] uppercase tracking-widest text-white/30 font-bold">Address</span>
                <span className="leading-relaxed max-w-sm mx-auto md:mx-0 block">JADEED RICE & FLOUR MILL, Chirakkal, Kuttumunda, Naduvath, Kerala 679328</span>
              </li>
              <li className="space-y-1">
                <span className="block text-[8px] uppercase tracking-widest text-white/30 font-bold">Phone</span>
                <span className="block">+91 98765 43210</span>
              </li>
              <li className="space-y-1">
                <span className="block text-[8px] uppercase tracking-widest text-white/30 font-bold">Email</span>
                <span className="block">enquire@jadeed.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 text-center flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-semibold uppercase tracking-wider text-white/30">
          <p>© {new Date().getFullYear()} JADEED Spices &amp; Oil. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
