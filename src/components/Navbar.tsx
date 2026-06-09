"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { LinkButton } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const resolveHref = (href: string) => {
    if (!href.startsWith("#")) return href;
    return isHome ? href : `/${href}`;
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition duration-200",
        isScrolled || isOpen
          ? "border-charcoal/10 bg-paper/90 shadow-sm backdrop-blur-xl"
          : "border-transparent bg-paper/0",
      )}
    >
      <nav className="container-page flex h-20 items-center justify-between" aria-label="Primary">
        <a href={isHome ? "#home" : "/"} className="inline-flex items-center">
          <Image
            src="/images/jadeed-logo-transparent.svg"
            alt={`${siteConfig.name} home`}
            width={124}
            height={38}
            priority
            className="h-9 w-auto"
          />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {siteConfig.nav.map((link) => (
            <a
              key={link.href}
              href={resolveHref(link.href)}
              className="text-xs font-bold uppercase tracking-[0.2em] text-charcoal/70 transition hover:text-gold"
            >
              {link.label}
            </a>
          ))}
          <LinkButton href={resolveHref("#contact")} className="min-h-10 px-4 py-2">
            Enquire
          </LinkButton>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center border border-charcoal/10 bg-white text-charcoal md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {isOpen ? (
        <div className="border-t border-charcoal/10 bg-paper md:hidden">
          <div className="container-page grid gap-2 py-4">
            {siteConfig.nav.map((link) => (
              <a
                key={link.href}
                href={resolveHref(link.href)}
                className="px-1 py-3 text-sm font-bold uppercase tracking-[0.18em] text-charcoal/75"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <LinkButton href={resolveHref("#contact")} onClick={() => setIsOpen(false)}>
              Enquire Now
            </LinkButton>
          </div>
        </div>
      ) : null}
    </header>
  );
}
