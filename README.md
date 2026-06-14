# JADEED Spices & Oil Frontend

Production-focused Next.js storefront for JADEED Spices & Oil. The frontend is organized around reusable sections, shared UI primitives, centralized site configuration, and product-driven commerce helpers.

## Architecture

- `src/app` contains route shells, metadata, structured data, and global styling.
- `src/components` contains page sections and interactive product experiences.
- `src/components/ui` contains reusable UI primitives for buttons, section headings, product media, and toast feedback.
- `src/config/site.ts` centralizes brand, contact, navigation, and trust messaging.
- `src/lib/products.ts` is the product catalog and business content source.
- `src/lib/commerce.ts` formats INR pricing, resolves product imagery, calculates savings, and builds WhatsApp order URLs.

## Design System

The visual system is defined in `src/app/globals.css` using Tailwind theme tokens:

- `cream`, `paper`, `charcoal`, `earth`, `gold`, `chilli`, `leaf`, and `sun`
- shared `container-page` layout utility
- shared `surface` treatment for cards, forms, product panels, and review items
- reduced, CSS-only motion with `prefers-reduced-motion` support

## Key Features Preserved

- Home hero, product showcase, value proposition, contact form, and footer
- Product detail pages with variant selection, quantity controls, gallery, tabs, reviews, favorites, share/copy link, related products, and WhatsApp ordering
- Product and organization structured data
- Open Graph and Twitter metadata
- Responsive mobile-first layouts
- Contact enquiry flow through WhatsApp

## Performance Notes

- Removed heavy animation libraries and the canvas particle effect.
- Uses Next Image for product and logo assets.
- Keeps client components scoped to interaction-heavy surfaces.
- Uses CSS transitions and reduced-motion support instead of scroll animation libraries.
- Keeps shared commerce logic out of UI components to reduce repeated code.

## Development

```bash
npm run dev
npm run lint
npm run build
```

If PowerShell blocks `npm.ps1`, run the commands through `npm.cmd` instead.
