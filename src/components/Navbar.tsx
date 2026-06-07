"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const getHref = (href: string) => {
    if (href.startsWith("#")) {
      return isHome ? href : `/${href}`;
    }
    return href;
  };

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
    { name: "Products", href: "#products" },
    { name: "About", href: "#about" },
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
            ? "py-3 bg-white/90 backdrop-blur-md border-b border-[#111111]/5 shadow-xs"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href={isHome ? "#home" : "/"} className="flex items-center group">
              <img 
                src="/images/jadeed-logo-transparent.svg" 
                alt="JADEED Logo" 
                className="h-8 sm:h-9 w-auto transition-transform duration-300 group-hover:scale-102" 
              />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={getHref(link.href)}
                  className="text-xs font-bold uppercase tracking-widest text-[#111111]/75 hover:text-[#C89B3C] transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#111111] hover:bg-[#C89B3C] transition-colors duration-300"
              >
                Enquire Now
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-[#111111] hover:text-[#C89B3C] transition-colors focus:outline-hidden"
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
              className="md:hidden bg-white/95 backdrop-blur-lg border-b border-[#111111]/5 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-3">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={getHref(link.href)}
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 text-xs font-bold uppercase tracking-widest text-[#111111]/75 hover:text-[#C89B3C] transition-all duration-200"
                  >
                    {link.name}
                  </a>
                ))}
                <div className="px-3 pt-2">
                  <a
                    href="#contact"
                    onClick={() => setIsOpen(false)}
                    className="block text-center w-full px-4 py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#111111] hover:bg-[#C89B3C] transition-colors duration-300"
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
