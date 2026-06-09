import { Check, ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { ProductMedia } from "@/components/ui/ProductMedia";
import { productsData } from "@/lib/products";
import { trustBadges } from "@/config/site";

const heroProducts = [
  productsData.find((product) => product.id === "mulaku-podi"),
  productsData.find((product) => product.id === "malli-podi"),
  productsData.find((product) => product.id === "manjal-podi"),
  productsData.find((product) => product.id === "velichenna"),
].filter(Boolean);

export default function Hero() {
  const primaryProduct = productsData.find((product) => product.id === "mulaku-podi") ?? productsData[0];

  return (
    <section id="home" className="relative overflow-hidden bg-paper pt-28">
      <div className="absolute inset-0 subtle-grid opacity-60" aria-hidden="true" />
      <div className="container-page relative grid min-h-[calc(100svh-5rem)] gap-10 py-10 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:py-16">
        <div className="max-w-2xl space-y-7 text-center lg:text-left">
          <p className="inline-flex border border-gold/30 bg-gold/10 px-4 py-2 text-[0.62rem] font-bold uppercase tracking-[0.3em] text-gold">
            100% Pure Kerala Spices
          </p>
          <div className="space-y-4">
            <h1 className="font-serif text-4xl font-medium leading-tight tracking-normal text-charcoal sm:text-5xl lg:text-6xl">
              Authentic Kerala Spices & Coconut Oil
            </h1>
            <p className="text-base leading-8 text-charcoal/68 sm:text-lg">
              Bringing the rich aroma, natural taste, and traditional quality of Kerala directly
              to your kitchen.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <LinkButton href="#products">
              Shop Now
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </LinkButton>
            <LinkButton href="#products" variant="secondary">
              View Products
            </LinkButton>
          </div>
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-3 pt-1 lg:justify-start">
            {trustBadges.map((badge) => (
              <li key={badge} className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-charcoal/60">
                <Check className="h-4 w-4 text-gold" aria-hidden="true" />
                {badge}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto grid w-full max-w-xl grid-cols-2 gap-3 sm:gap-4">
          <ProductMedia
            product={primaryProduct}
            src="/products/mulaku-podi.png"
            alt="JADEED Mulaku Podi packaging"
            priority
            className="col-span-2 aspect-[16/11] p-7 sm:p-10"
          />
          
        </div>
      </div>
    </section>
  );
}
