"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { ArrowRight, Check, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ProductMedia } from "@/components/ui/ProductMedia";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Toast } from "@/components/ui/Toast";
import { createOrderUrl, formatPrice, getProductImage, getSavingsPercent } from "@/lib/commerce";
import { cn } from "@/lib/utils";
import { productsData, type Product, type ProductVariant } from "@/lib/products";

const featuredIds = ["mulaku-podi", "malli-podi", "manjal-podi", "velichenna"];
const showcaseImages: Record<string, string> = {
  "mulaku-podi": "/products/mulaku-podi.png",
  "malli-podi": "/products/malli-podi.png",
  "manjal-podi": "/products/manjal-podi.png",
  velichenna: "/products/coconut-oil.png",
};

export default function ProductsCatalog() {
  const featuredProducts = useMemo(
    () =>
      featuredIds
        .map((id) => productsData.find((product) => product.id === id))
        .filter(Boolean) as Product[],
    [],
  );
  const [selectedVariants, setSelectedVariants] = useState<Record<string, ProductVariant>>(() =>
    Object.fromEntries(
      featuredProducts.map((product) => [product.id, product.variants[2] ?? product.variants[0]]),
    ),
  );
  const [toast, setToast] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const flashToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2800);
  };

  return (
    <section id="products" className="bg-cream py-16 sm:py-24">
      {toast ? <Toast message={toast} /> : null}

      <div className="container-page">
        <SectionHeading
          eyebrow="The Story of Spice"
          title="Our Star Spices"
          description="A focused showcase of JADEED essentials, with size selection and direct WhatsApp ordering preserved."
        />
      </div>

      <div className="mt-12">
        {featuredProducts.map((product, index) => {
          const selectedVariant = selectedVariants[product.id] ?? product.variants[0];
          const isReversed = index % 2 === 1;
          const activeImage = showcaseImages[product.id] ?? getProductImage(product, selectedVariant);
          const savings = getSavingsPercent(selectedVariant);

          return (
            <article
              key={product.id}
              className={cn(
                "border-t border-charcoal/10 py-12 sm:py-16 lg:py-20",
                index % 2 === 0 ? "bg-paper" : "bg-cream",
              )}
            >
              <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
                <div
                  data-product-image-placeholder={product.id}
                  className={cn(isReversed && "lg:order-2", "mx-auto max-w-md w-full relative")}
                >
                  <ProductMedia
                    product={product}
                    src={product.id === "mulaku-podi" ? getProductImage(product, selectedVariant) : activeImage}
                    alt={`JADEED ${product.name}`}
                    className="w-full"
                    imageClassName={isMounted ? "lg:opacity-0 transition-opacity duration-300" : ""}
                  />
                </div>

                <div className="space-y-7">
                  <ProductHeader product={product} />

                  <p className="text-sm leading-7 text-charcoal/68 sm:text-base">
                    {product.longDescription || product.description}
                  </p>

                  <div className="space-y-3">
                    <p className="text-[0.65rem] font-bold uppercase tracking-[0.24em] text-charcoal/50">
                      Available Sizes
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.map((variant) => {
                        const isSelected = variant.weight === selectedVariant.weight;
                        return (
                          <button
                            key={variant.weight}
                            type="button"
                            className={cn(
                              "min-h-11 border px-4 text-xs font-bold uppercase tracking-[0.16em] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                              isSelected
                                ? "border-charcoal bg-charcoal text-white"
                                : "border-charcoal/15 bg-white text-charcoal hover:border-charcoal",
                            )}
                            aria-pressed={isSelected}
                            onClick={() =>
                              setSelectedVariants((current) => ({
                                ...current,
                                [product.id]: variant,
                              }))
                            }
                          >
                            {variant.weight}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="surface inline-flex flex-wrap items-end gap-3 px-5 py-4">
                    <div>
                      <p className="text-[0.6rem] font-bold uppercase tracking-[0.22em] text-charcoal/45">
                        Price
                      </p>
                      <p className="font-serif text-3xl font-semibold text-gold">
                        {formatPrice(selectedVariant.price)}
                      </p>
                    </div>
                    {selectedVariant.originalPrice > selectedVariant.price ? (
                      <>
                        <p className="pb-1 text-sm font-semibold text-charcoal/45 line-through">
                          {formatPrice(selectedVariant.originalPrice)}
                        </p>
                        <p className="mb-1 border border-gold/25 bg-gold/10 px-2 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-gold">
                          Save {savings}%
                        </p>
                      </>
                    ) : null}
                  </div>

                  <div className="grid gap-3 sm:flex">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() =>
                        flashToast(`Added JADEED ${product.name} (${selectedVariant.weight}) to cart.`)
                      }
                    >
                      Add to Cart
                    </Button>
                    <Button
                      type="button"
                      onClick={() => window.open(createOrderUrl(product, selectedVariant), "_blank", "noopener,noreferrer")}
                    >
                      Buy Now
                    </Button>
                    <Link
                      href={`/product/${product.id}`}
                      className="inline-flex min-h-11 items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-gold transition hover:text-charcoal"
                    >
                      View Product
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function ProductHeader({ product }: { product: Product }) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.24em] text-gold">
          {product.subtitle}
        </p>
        {product.badge ? (
          <span className="bg-charcoal px-2 py-1 text-[0.55rem] font-bold uppercase tracking-[0.18em] text-gold">
            {product.badge === "bestseller" ? "Best Seller" : product.badge}
          </span>
        ) : null}
      </div>
      <div className="flex flex-wrap items-baseline gap-3">
        <h3 className="font-serif text-3xl font-medium tracking-normal text-charcoal sm:text-4xl">
          {product.name}
        </h3>
        <span className="font-serif text-lg italic text-gold">({product.malayalam})</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-charcoal/55">
        <div className="flex" aria-label={`${product.rating} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={cn(
                "h-4 w-4",
                index < Math.floor(product.rating) ? "fill-gold text-gold" : "text-charcoal/15",
              )}
              aria-hidden="true"
            />
          ))}
        </div>
        <strong className="text-charcoal">{product.rating}</strong>
        <span aria-hidden="true">•</span>
        <span>{product.reviewsCount} reviews</span>
        <Check className="h-4 w-4 text-leaf" aria-hidden="true" />
      </div>
    </div>
  );
}
