"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const products = [
  { id: "mulaku-podi", src: "/images/hero/chilli.png", alt: "Mulaku Podi" },
  { id: "malli-podi", src: "/images/hero/coriander.png", alt: "Malli Podi" },
  { id: "manjal-podi", src: "/images/hero/turmeric.png", alt: "Manjal Podi" },
  { id: "velichenna", src: "/images/hero/coconut-oil.png", alt: "Velichenna" },
];

export default function ScrollShowcase({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;
    const mm = gsap.matchMedia();

    const initAnimations = () => {
      // 1. Clean up existing ScrollTrigger and timeline
      if (tlRef.current) {
        tlRef.current.kill();
        tlRef.current = null;
      }
      
      // Clean up any other ScrollTriggers associated with this container
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === containerRef.current) {
          trigger.kill();
        }
      });

      const container = containerRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const H = window.innerHeight;
      
      // Find the products catalog element to know the exact height
      const catalogEl = document.getElementById("products");
      let scrollHeight = containerRect.height;
      if (catalogEl) {
        const catalogRect = catalogEl.getBoundingClientRect();
        scrollHeight = (catalogRect.bottom - containerRect.top);
      }
      
      const L = scrollHeight - H;

      // Find the Hero placeholder
      const heroPlaceholder = document.querySelector("[data-hero-images-placeholder]");
      if (!heroPlaceholder) return;

      const heroRect = heroPlaceholder.getBoundingClientRect();
      const X_hero_center = heroRect.left - containerRect.left + heroRect.width / 2;
      const Y_hero_center = heroRect.top - containerRect.top + heroRect.height / 2;

      // Determine responsive parameters
      const isMobile = window.innerWidth < 1024;

      // Measure product section placeholders
      const placeholders = products.map((p, idx) => {
        const el = document.querySelector(`[data-product-image-placeholder="${p.id}"]`);
        if (!el) return null;

        const rect = el.getBoundingClientRect();
        const w = rect.width;
        const h = rect.height;
        const x = rect.left - containerRect.left;
        const d = rect.top - containerRect.top;

        // Calculate sLock (when placeholder is centered in viewport)
        let sLock = d + h / 2 - H / 2;
        sLock = Math.max(0, Math.min(sLock, L));

        // Calculate sStart (when placeholder enters viewport from bottom)
        let sStart = d - H;
        sStart = Math.max(0, sStart);

        // Initial stack/composition position in Hero
        let xHero, yHero, scaleHero, zIndex;

        if (isMobile) {
          // Mobile layout: Velichenna centered at top, 3 spices in horizontal row below it, no overlap
          if (p.id === "velichenna") { // Bottle
            xHero = X_hero_center - w / 2;
            yHero = Y_hero_center - h / 2 - 50;
            scaleHero = 0.50;
            zIndex = 20;
          } else if (p.id === "mulaku-podi") { // Left spice pack
            xHero = X_hero_center - w / 2 - 80;
            yHero = Y_hero_center - h / 2 + 50;
            scaleHero = 0.38;
            zIndex = 10;
          } else if (p.id === "malli-podi") { // Center spice pack
            xHero = X_hero_center - w / 2;
            yHero = Y_hero_center - h / 2 + 50;
            scaleHero = 0.38;
            zIndex = 10;
          } else { // Right spice pack (manjal-podi)
            xHero = X_hero_center - w / 2 + 80;
            yHero = Y_hero_center - h / 2 + 50;
            scaleHero = 0.38;
            zIndex = 10;
          }
        } else {
          // Desktop layout: Curved composition
          // Velichenna at back center, 3 spices in front curved row (left, center, right), overlapping
          if (p.id === "velichenna") { // Back center bottle
            xHero = X_hero_center - w / 2;
            yHero = Y_hero_center - h / 2 - 50;
            scaleHero = 0.70;
            zIndex = 10;
          } else if (p.id === "mulaku-podi") { // Front left bowl/pack
            xHero = X_hero_center - w / 2 - 110;
            yHero = Y_hero_center - h / 2 + 30;
            scaleHero = 0.50;
            zIndex = 20;
          } else if (p.id === "malli-podi") { // Front center-front bowl/pack (toggled forward-most)
            xHero = X_hero_center - w / 2;
            yHero = Y_hero_center - h / 2 + 60;
            scaleHero = 0.50;
            zIndex = 30;
          } else { // Front right bowl/pack
            xHero = X_hero_center - w / 2 + 110;
            yHero = Y_hero_center - h / 2 + 30;
            scaleHero = 0.50;
            zIndex = 20;
          }
        }

        return {
          id: p.id,
          w,
          h,
          xHero,
          yHero,
          scaleHero,
          zIndex,
          xTarget: x,
          yLock: H / 2 - h / 2, // Centered in viewport when locked
          sStart,
          sLock,
          d,
        };
      }).filter(Boolean);

      if (placeholders.length < 4) {
        // If not all placeholders are rendered/measured yet, retry shortly
        resizeTimeout = setTimeout(initAnimations, 100);
        return;
      }

      // Add matchMedia bindings
      mm.add({
        isDesktop: "(min-width: 1024px)",
        isMobile: "(max-width: 1023px)"
      }, (context) => {
        const { isDesktop } = context.conditions as any;

        // Apply initial values and trigger bobbing on both desktop & mobile
        placeholders.forEach((ph, idx) => {
          if (!ph) return;
          const imgEl = container.querySelector(`[data-animate-id="${ph.id}"]`);
          if (!imgEl) return;

          gsap.set(imgEl, {
            width: ph.w,
            height: ph.h,
            x: ph.xHero,
            y: ph.yHero,
            scale: ph.scaleHero,
            opacity: 1,
            zIndex: ph.zIndex,
            transformOrigin: "center center",
          });

          // Bobbing/floating animation
          const floatEl = container.querySelector(`[data-float-id="${ph.id}"]`);
          if (floatEl) {
            gsap.killTweensOf(floatEl);
            gsap.to(floatEl, {
              y: "-=12",
              rotation: idx % 2 === 0 ? 1.5 : -1.5,
              duration: 2.2 + idx * 0.4,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            });
          }
        });

        if (isDesktop) {
          // Create ScrollTrigger timeline on desktop only
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: container,
              start: "top top",
              end: () => catalogEl ? `bottom bottom` : "bottom bottom",
              endTrigger: catalogEl || undefined,
              scrub: 1.2,
              invalidateOnRefresh: true,
            },
          });

          tl.duration(L);

          placeholders.forEach((ph) => {
            if (!ph) return;
            const imgEl = container.querySelector(`[data-animate-id="${ph.id}"]`);
            if (!imgEl) return;

            // 1. Scroll with Hero section
            if (ph.sStart > 0) {
              tl.to(
                imgEl,
                {
                  y: ph.yHero - ph.sStart,
                  ease: "none",
                  duration: ph.sStart,
                },
                0
              );
            }

            // 2. Travel phase
            const travelDuration = ph.sLock - ph.sStart;
            tl.to(
              imgEl,
              {
                x: ph.xTarget,
                y: ph.yLock,
                scale: 1.0,
                ease: "power2.inOut",
                duration: travelDuration,
              },
              ph.sStart
            );

            // 3. Locked phase
            if (L > ph.sLock) {
              tl.to(
                imgEl,
                {
                  y: ph.yLock - (L - ph.sLock),
                  ease: "none",
                  duration: L - ph.sLock,
                },
                ph.sLock
              );
            }
          });

          tlRef.current = tl;
        }
      });
    };

    // Fade in overlay on load
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
        delay: 0.3,
      });
    }

    const initialTimeout = setTimeout(() => {
      initAnimations();
    }, 250);

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(initAnimations, 150);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
      
      mm.revert();
      
      if (tlRef.current) {
        tlRef.current.kill();
      }
      
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === containerRef.current) {
          trigger.kill();
        }
      });

      products.forEach((p) => {
        const floatEl = document.querySelector(`[data-float-id="${p.id}"]`);
        if (floatEl) {
          gsap.killTweensOf(floatEl);
        }
      });
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Absolute overlay wrapper for images */}
      <div 
        ref={overlayRef} 
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-20 opacity-0"
      >
        {/* On mobile it is absolute (scrolls with page), on desktop it is sticky top-0 h-screen */}
        <div className="absolute lg:sticky top-0 left-0 w-full h-[280px] sm:h-[320px] lg:h-screen overflow-hidden">
          <div className="relative w-full h-full">
            {products.map((product) => (
              <div
                key={product.id}
                data-animate-id={product.id}
                className="absolute pointer-events-none select-none opacity-0"
                style={{
                  willChange: "transform, opacity",
                }}
              >
                <div 
                  data-float-id={product.id} 
                  className="w-full h-full flex items-center justify-center p-6"
                >
                  <Image
                    src={product.src}
                    alt={product.alt}
                    width={500}
                    height={625}
                    className="w-full h-full max-h-[420px] object-contain filter drop-shadow-[0_15px_20px_rgba(42,26,18,0.14)]"
                    priority
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scrolling Content */}
      {children}
    </div>
  );
}
