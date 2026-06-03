"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Leaf } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Our Products", href: "#products" },
    { name: "Sourcing & Craft", href: "#process" },
    { name: "Our Story", href: "#about" },
    { name: "Why Us", href: "#why-choose-us" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "py-3 bg-sand-50/80 backdrop-blur-md border-b border-turmeric/10 shadow-sm"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-2 group">
              <div className="p-1.5 rounded-xl bg-gradient-to-br from-turmeric to-chilli text-white shadow-md">
                <Leaf className="w-6 h-6 animate-pulse" />
              </div>
              <span className="text-xl font-bold tracking-tight text-cinnamon-950 font-serif">
                KERALA <span className="text-turmeric">SPICES</span>
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-cinnamon-900/80 hover:text-turmeric transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-turmeric to-chilli hover:from-chilli hover:to-turmeric rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Enquire Now
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-xl text-cinnamon-900 hover:bg-turmeric/5 transition-colors focus:outline-none"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-sand-50/95 backdrop-blur-lg border-b border-turmeric/10 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-3">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 rounded-lg text-base font-medium text-cinnamon-900/80 hover:bg-turmeric/5 hover:text-turmeric transition-all duration-200"
                  >
                    {link.name}
                  </a>
                ))}
                <div className="px-3 pt-2">
                  <a
                    href="#contact"
                    onClick={() => setIsOpen(false)}
                    className="block text-center w-full px-4 py-2.5 text-base font-semibold text-white bg-gradient-to-r from-turmeric to-chilli rounded-xl shadow-md"
                  >
                    Enquire Now
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
