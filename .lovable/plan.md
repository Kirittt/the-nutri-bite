# Enrich featured products, navigation, reviews, and footer

## What will change

- Replace repeated featured-card imagery with a unique, clean food photograph for every Best Seller and New Launch shown on the home page. Expand Best Sellers to five products while preserving the existing catalogue and prices.
- Rebuild the desktop Shop menu as a richer catalogue panel. Each category will show its spreadsheet-defined flavours/subcategories, a short description, and alternating green/orange brand accents. Mobile navigation will expose the same hierarchy without overcrowding.
- Add the spreadsheet’s missing flavour products to Trail Mix, Super Snack, Nut Mix, Cashews 320, and Cashews 240. Because the uploaded workbook contains no prices, these new items will be marked “Coming soon” rather than assigning invented prices.
- Add distinct icons to Our Story, Our Process, and About Us in both desktop and mobile menus.
- Add Facebook, WhatsApp, Instagram, X, and YouTube icons beneath the brochure link. WhatsApp and Instagram will be linked from existing business data; icons without supplied URLs will remain non-clickable.
- Add an email subscription form alongside the existing WhatsApp subscription. Store email sign-ups securely and show clear success/error feedback.
- Add a floating WhatsApp chat button across the site, with an accessible label and a compact mobile-safe position.
- Add 30 clearly labeled sample testimonials below New Launches. The carousel will move automatically, include previous/next and pause/play controls, use Indian customer names and cities, pause on interaction, and respect reduced-motion preferences.

## Technical details

- Generate and map product-specific image assets; do not embed the uploaded screenshots, which are visual references only.
- Extend catalogue data and derive menu groups from the same source so desktop, mobile, and shop pages stay synchronized.
- Add a newsletter-subscriber table with public insert-only access, duplicate-email handling, and a validated server action.
- Create focused components for the review carousel, enhanced Shop menu, and WhatsApp chat button.
- Complete missing `og:type` and `twitter:card` metadata on touched content routes.
- Validate on desktop and mobile, test carousel/menu/subscription interactions, and run the TypeScript check.

## Assumptions

- “Add 2 more” means showing five Best Sellers on the home page.
- The 30 testimonials are examples, not verified reviews, and will be labeled accordingly.
- No Facebook, X, or YouTube URL will be invented; those icons remain visible but inactive until URLs are supplied.
