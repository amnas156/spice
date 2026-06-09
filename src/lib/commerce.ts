import { siteConfig } from "@/config/site";
import type { Product, ProductVariant } from "@/lib/products";

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function getSavingsPercent(variant: ProductVariant) {
  if (!variant.originalPrice || variant.originalPrice <= variant.price) return 0;
  return Math.round(((variant.originalPrice - variant.price) / variant.originalPrice) * 100);
}

export function getProductImage(product: Product, variant?: ProductVariant) {
  const selected = variant ?? product.variants[0];

  if (selected.image.startsWith("/")) {
    return selected.image;
  }

  return product.gallery[0] ?? "/products/mulaku-podi.png";
}

export function createOrderUrl(product: Product, variant: ProductVariant, quantity = 1) {
  const totalPrice = variant.price * quantity;
  const text = `Hi JADEED Spices, I would like to order:
Product: JADEED ${product.name} (${product.subtitle})
Size/Weight: ${variant.weight}
Quantity: ${quantity}
Total Price: ${formatPrice(totalPrice)}
Delivery Area: Please verify my shipping pincode.`;

  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
