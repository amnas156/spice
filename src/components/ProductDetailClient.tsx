"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  Award,
  Check,
  Copy,
  Heart,
  Minus,
  Plus,
  Share2,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ProductMedia } from "@/components/ui/ProductMedia";
import { Toast } from "@/components/ui/Toast";
import { createOrderUrl, formatPrice, getProductImage, getSavingsPercent } from "@/lib/commerce";
import { cn } from "@/lib/utils";
import { productsData, type Product, type ProductReview, type ProductVariant } from "@/lib/products";

interface ProductDetailClientProps {
  product: Product;
}

const tabs = [
  { id: "description", label: "Description" },
  { id: "ingredients", label: "Ingredients" },
  { id: "storage", label: "Storage" },
  { id: "shipping", label: "Shipping" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const [activeImage, setActiveImage] = useState(getProductImage(product, product.variants[0]));
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<TabId>("description");
  const [isFavorite, setIsFavorite] = useState(false);
  const [reviews, setReviews] = useState<ProductReview[]>(product.reviews ?? []);
  const [toast, setToast] = useState("");

  const gallery = useMemo(() => {
    const variantImage = getProductImage(product, selectedVariant);
    return [variantImage, ...product.gallery].filter(Boolean);
  }, [product, selectedVariant]);

  const relatedProducts = useMemo(
    () => productsData.filter((item) => item.id !== product.id).slice(0, 3),
    [product.id],
  );
  const savings = getSavingsPercent(selectedVariant);

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2800);
  };

  const selectVariant = (variant: ProductVariant) => {
    setSelectedVariant(variant);
    setActiveImage(getProductImage(product, variant));
  };

  const copyProductLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    showToast("Product link copied.");
  };

  return (
    <div className="container-page">
      {toast ? <Toast message={toast} /> : null}

      <Link
        href="/#products"
        className="mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-charcoal/55 transition hover:text-gold"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to Products
      </Link>

      <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-start lg:gap-16">
        <div className="space-y-4">
          <ProductMedia
            product={product}
            src={activeImage}
            alt={`JADEED ${product.name}`}
            priority
            className="aspect-square p-8"
          />
          <div className="grid grid-cols-5 gap-3">
            {gallery.slice(0, 5).map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setActiveImage(image)}
                className={cn(
                  "aspect-square border bg-white p-2 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                  activeImage === image ? "border-gold" : "border-charcoal/10 hover:border-charcoal/30",
                )}
                aria-label={`View product image ${index + 1}`}
              >
                <ProductMedia
                  product={product}
                  src={image}
                  alt=""
                  className="h-full border-0 p-0 shadow-none"
                  imageClassName="max-h-full"
                />
              </button>
            ))}
          </div>
        </div>

        <aside className="space-y-7 lg:sticky lg:top-28">
          <div className="space-y-4">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-gold">
              {product.subtitle}
            </p>
            <div className="flex flex-wrap items-baseline gap-3">
              <h1 className="font-serif text-4xl font-medium tracking-normal text-charcoal sm:text-5xl">
                {product.name}
              </h1>
              <span className="font-serif text-lg italic text-gold">({product.malayalam})</span>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-charcoal/58">
              <Stars rating={product.rating} />
              <strong className="text-charcoal">{product.rating}</strong>
              <span aria-hidden="true">•</span>
              <a href="#reviews" className="font-semibold text-gold hover:underline">
                {product.reviewsCount} reviews
              </a>
            </div>
            <p className="text-sm leading-7 text-charcoal/68 sm:text-base">{product.description}</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-4">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-charcoal/50">
                Select Variant
              </p>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold">
                {selectedVariant.weight} pack
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((variant) => (
                <button
                  key={variant.weight}
                  type="button"
                  aria-pressed={variant.weight === selectedVariant.weight}
                  onClick={() => selectVariant(variant)}
                  className={cn(
                    "min-h-11 border px-4 text-xs font-bold uppercase tracking-[0.16em] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                    variant.weight === selectedVariant.weight
                      ? "border-charcoal bg-charcoal text-white"
                      : "border-charcoal/15 bg-white text-charcoal hover:border-charcoal",
                  )}
                >
                  {variant.weight}
                </button>
              ))}
            </div>
          </div>

          <div className="surface flex flex-wrap items-end justify-between gap-4 p-5">
            <div>
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-charcoal/45">
                Price
              </p>
              <div className="mt-1 flex flex-wrap items-baseline gap-3">
                <p className="font-serif text-3xl font-semibold text-gold">
                  {formatPrice(selectedVariant.price)}
                </p>
                {selectedVariant.originalPrice > selectedVariant.price ? (
                  <p className="text-sm font-semibold text-charcoal/40 line-through">
                    {formatPrice(selectedVariant.originalPrice)}
                  </p>
                ) : null}
              </div>
            </div>
            {savings ? (
              <p className="border border-gold/25 bg-gold/10 px-3 py-2 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-gold">
                Save {savings}%
              </p>
            ) : null}
          </div>

          <div className="flex items-center gap-3">
            <div className="inline-flex min-h-11 border border-charcoal/15 bg-white">
              <button type="button" className="px-4" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Decrease quantity">
                <Minus className="h-4 w-4" />
              </button>
              <span className="grid min-w-12 place-items-center text-sm font-bold">{quantity}</span>
              <button type="button" className="px-4" onClick={() => setQuantity((value) => value + 1)} aria-label="Increase quantity">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              type="button"
              onClick={() => setIsFavorite((value) => !value)}
              className={cn(
                "grid h-11 w-11 place-items-center border transition",
                isFavorite ? "border-red-200 bg-red-50 text-red-600" : "border-charcoal/15 bg-white text-charcoal/60 hover:text-charcoal",
              )}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} />
            </button>
            <button
              type="button"
              onClick={copyProductLink}
              className="grid h-11 w-11 place-items-center border border-charcoal/15 bg-white text-charcoal/60 transition hover:text-charcoal"
              aria-label="Copy product link"
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => showToast(`Added ${quantity} x ${product.name} to cart.`)}
            >
              <ShoppingCart className="h-4 w-4" aria-hidden="true" />
              Add to Cart
            </Button>
            <Button
              type="button"
              onClick={() => window.open(createOrderUrl(product, selectedVariant, quantity), "_blank", "noopener,noreferrer")}
            >
              Buy Now
            </Button>
          </div>

          <ul className="grid gap-3 text-xs font-bold uppercase tracking-[0.14em] text-charcoal/58 sm:grid-cols-3">
            <TrustItem icon={Truck} label="Shipping above ₹499" />
            <TrustItem icon={ShieldCheck} label="Secure checkout" />
            <TrustItem icon={Award} label="Pure ingredients" />
          </ul>
        </aside>
      </div>

      <ProductTabs product={product} activeTab={activeTab} onChange={setActiveTab} />
      <Reviews product={product} reviews={reviews} onHelpful={(id) => setReviews((items) => items.map((review) => review.id === id ? { ...review, likes: review.likes + 1 } : review))} />
      <RelatedProducts products={relatedProducts} />
    </div>
  );
}

function Stars({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  return (
    <div className="flex" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={cn(
            size === "md" ? "h-5 w-5" : "h-4 w-4",
            index < Math.floor(rating) ? "fill-gold text-gold" : "text-charcoal/15",
          )}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function TrustItem({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <li className="flex items-center gap-2">
      <Icon className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
      <span>{label}</span>
    </li>
  );
}

function ProductTabs({
  product,
  activeTab,
  onChange,
}: {
  product: Product;
  activeTab: TabId;
  onChange: (tab: TabId) => void;
}) {
  return (
    <section className="mt-16 border-t border-charcoal/10 pt-10 sm:mt-24 sm:pt-14">
      <div className="flex gap-6 overflow-x-auto border-b border-charcoal/10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={cn(
              "shrink-0 border-b-2 pb-4 text-xs font-bold uppercase tracking-[0.2em] transition",
              activeTab === tab.id
                ? "border-gold text-charcoal"
                : "border-transparent text-charcoal/42 hover:text-charcoal",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="max-w-4xl py-8 text-sm leading-7 text-charcoal/70 sm:text-base">
        {activeTab === "description" ? (
          <div className="space-y-4">
            <p className="font-semibold text-charcoal">Authentic Wayanad & Idukki quality spices.</p>
            <p>{product.longDescription}</p>
          </div>
        ) : null}
        {activeTab === "ingredients" ? (
          <ul className="grid gap-2">
            {product.ingredients.map((ingredient) => (
              <li key={ingredient} className="flex gap-2">
                <Check className="mt-1 h-4 w-4 shrink-0 text-leaf" aria-hidden="true" />
                <span>{ingredient}</span>
              </li>
            ))}
            <li className="flex gap-2">
              <Check className="mt-1 h-4 w-4 shrink-0 text-leaf" aria-hidden="true" />
              <span>No artificial preservatives or chemical colors.</span>
            </li>
          </ul>
        ) : null}
        {activeTab === "storage" ? <p>{product.storage}</p> : null}
        {activeTab === "shipping" ? <p>{product.shipping}</p> : null}
      </div>
    </section>
  );
}

function Reviews({
  product,
  reviews,
  onHelpful,
}: {
  product: Product;
  reviews: ProductReview[];
  onHelpful: (id: string) => void;
}) {
  return (
    <section id="reviews" className="border-t border-charcoal/10 pt-10 sm:pt-14">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-gold">
            Verified Feedback
          </p>
          <h2 className="mt-3 font-serif text-3xl font-medium text-charcoal">Customer Reviews</h2>
        </div>
        <div className="surface px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="font-serif text-3xl font-semibold text-charcoal">{product.rating}</span>
            <Stars rating={product.rating} size="md" />
          </div>
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="surface p-8 text-center text-charcoal/60">
          No reviews yet for JADEED {product.name}. Be the first after purchase.
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {reviews.map((review) => (
            <article key={review.id} className="surface p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-charcoal">
                    {review.userName}
                  </h3>
                  <p className="mt-1 text-xs text-charcoal/45">{review.date}</p>
                </div>
                <Stars rating={review.rating} />
              </div>
              <p className="mt-4 text-sm leading-7 text-charcoal/68">{review.comment}</p>
              <button
                type="button"
                onClick={() => onHelpful(review.id)}
                className="mt-5 inline-flex items-center gap-2 border border-charcoal/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-charcoal/55 transition hover:border-gold hover:text-gold"
              >
                <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                Helpful ({review.likes})
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function RelatedProducts({ products }: { products: Product[] }) {
  return (
    <section className="mt-16 border-t border-charcoal/10 pt-10 sm:mt-24 sm:pt-14">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-gold">
            Explore the Range
          </p>
          <h2 className="mt-3 font-serif text-3xl font-medium text-charcoal">Related Products</h2>
        </div>
        <Link href="/#products" className="text-xs font-bold uppercase tracking-[0.18em] text-gold hover:text-charcoal">
          All Products
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => {
          const variant = product.variants[0];
          return (
            <Link key={product.id} href={`/product/${product.id}`} className="surface group block p-5 transition hover:-translate-y-1">
              <ProductMedia
                product={product}
                src={getProductImage(product, variant)}
                alt={product.name}
                className="mb-5 aspect-square p-5 shadow-none"
                imageClassName="max-h-44"
              />
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-gold">
                {product.subtitle}
              </p>
              <div className="mt-2 flex items-baseline justify-between gap-3">
                <h3 className="font-serif text-xl font-medium text-charcoal">{product.name}</h3>
                <p className="text-sm font-bold text-gold">From {formatPrice(variant.price)}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
