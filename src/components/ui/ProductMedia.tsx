import Image from "next/image";
import { Package } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/products";

interface ProductMediaProps {
  product: Product;
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
}

export function ProductMedia({
  product,
  src,
  alt,
  priority = false,
  className,
  imageClassName,
}: ProductMediaProps) {
  return (
    <div
      className={cn(
        "relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden border border-charcoal/10 bg-white p-6 shadow-sm",
        className,
      )}
    >
      <div
        className="absolute h-2/3 w-2/3 rounded-full opacity-15 blur-3xl"
        style={{ backgroundColor: product.color }}
      />
      {src.startsWith("/") ? (
        <Image
          src={src}
          alt={alt}
          width={640}
          height={800}
          priority={priority}
          sizes="(min-width: 1024px) 42vw, (min-width: 640px) 55vw, 90vw"
          className={cn("relative z-10 h-full max-h-[420px] w-full object-contain", imageClassName)}
        />
      ) : (
        <div
          className="relative z-10 flex h-72 w-48 flex-col justify-between border p-5 text-white shadow-xl"
          style={{ backgroundColor: product.color, borderColor: `${product.color}33` }}
        >
          <div className="space-y-1 text-center">
            <p className="text-[0.55rem] font-bold uppercase tracking-[0.28em] text-gold">
              Pure Kerala Spice
            </p>
            <p className="font-serif text-sm uppercase tracking-[0.24em]">JADEED</p>
          </div>
          <div className="grid place-items-center gap-3 text-center">
            <Package className="h-10 w-10 text-white/70" aria-hidden="true" />
            <p className="font-serif text-xl uppercase tracking-[0.16em] text-gold">
              {product.name}
            </p>
          </div>
          <p className="text-center text-[0.6rem] font-bold uppercase tracking-[0.24em] text-white/70">
            100% Pure
          </p>
        </div>
      )}
    </div>
  );
}
