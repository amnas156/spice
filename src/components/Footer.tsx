"use client";

import React from "react";
import { Leaf, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-cinnamon-950 text-sand-50/90 pt-16 pb-8 overflow-hidden">
      {/* Subtle Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-turmeric/10 rounded-full blur-[120px]" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-chilli/10 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-sand-50/10">
          {/* Logo & Intro */}
          <div className="space-y-4">
            <a href="#home" className="flex items-center gap-2">
              <div className="p-1.5 rounded-xl bg-gradient-to-br from-turmeric to-chilli text-white shadow-md">
                <Leaf className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white font-serif">
                KERALA <span className="text-turmeric">SPICES</span>
              </span>
            </a>
            <p className="text-sm text-sand-50/60 max-w-sm leading-relaxed">
              Sourcing the finest quality spices, powders, and cold-pressed coconut oil directly from local farmers in Kerala, preserving purity and authentic traditional flavors since 1994.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 md:pl-10">
            <h3 className="text-sm font-semibold text-turmeric uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-sm text-sand-50/70 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#products" className="text-sm text-sand-50/70 hover:text-white transition-colors">
                  Our Products
                </a>
              </li>
              <li>
                <a href="#process" className="text-sm text-sand-50/70 hover:text-white transition-colors">
                  Sourcing & Craft
                </a>
              </li>
              <li>
                <a href="#about" className="text-sm text-sand-50/70 hover:text-white transition-colors">
                  Our Story
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-turmeric uppercase tracking-wider">
              Contact Store
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-sand-50/70">
                <MapPin className="w-4 h-4 text-turmeric mt-0.5 shrink-0" />
                <span>Harvest House, Spice Road, Kalpetta, Wayanad, Kerala, 673121</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-sand-50/70">
                <Phone className="w-4 h-4 text-turmeric shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-sand-50/70">
                <Mail className="w-4 h-4 text-turmeric shrink-0" />
                <span>enquire@keralaspiceco.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 text-center flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-sand-50/40">
          <p>© {new Date().getFullYear()} Kerala Spices & Co. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
