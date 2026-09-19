# Complete The Nutri Bite Store

## Goal
Turn the current catalogue and WhatsApp cart into a complete store with customer accounts, saved orders, a securely invited administrator, editable products and prices, rich real imagery, an 11-slide hero, legal pages, and cookie controls.

## What will be built

### 1. Product and content foundation
- Extract the supplied photo bundles, spreadsheets, and six-page catalogue, then match identifiable visuals and product facts to the existing catalogue.
- Optimize and store usable product, category, process, story, gifting, and promotional images through the project asset system.
- Give every product card and product page a relevant visual. Exact supplied packshots take priority; missing packshots use honest ingredient/editorial imagery without inventing packaging claims.
- Expand product pages with stronger descriptions, key highlights, ingredients, hygiene/handmade care messaging, pack selection, availability, related products, and clearly separated factual details.
- Keep missing prices unpublished instead of showing ₹0 or inventing values.

### 2. Homepage and storefront presentation
- Replace the static first section with 11 product-led slides, changing every five seconds.
- Add previous/next controls, slide indicators, swipe and keyboard support, and a visible play/pause control; pause on interaction and respect reduced-motion preferences.
- Keep the brand and products prominent, with clear Shop, WhatsApp, and collection actions.
- Expand the homepage with image-led collections, why choose us, hygienic handmade process, featured launches, sweets, healthy crunch, Makhana, labelled sample customer love, bulk/corporate gifting, Instagram gallery, and locations.
- Enrich Story, Process, Bulk Orders, Contact, collection, and launch pages with relevant imagery and useful content.

### 3. Accounts and real orders
- Enable email/password and managed Google sign-in, including registration, sign-in, password reset, sign-out, and session-aware header controls.
- Add a protected customer area for profile, addresses, saved orders, order details, and tracking status.
- Keep guest checkout available. Add a mobile-friendly checkout form for Indian contact and address details, order notes, and required acceptance of the Terms and Privacy Policy.
- Save each order and its item-price snapshot securely, generate readable numbers such as `TNB-2026-000001`, clear the cart after success, and show an order confirmation page.
- Launch with “order without online payment”: payment remains marked for manual confirmation, with WhatsApp and phone support available. Razorpay, COD charging, and courier API integration are not activated in this milestone.

### 4. Secure admin area
- Add separate database roles and server-verified access; no admin role will live on customer profiles or browser storage.
- Create a single-use, expiring administrator invitation flow. The admin link will remain out of customer navigation.
- Build an admin dashboard with order totals, revenue summaries, pending orders, customers, top products, and recent orders.
- Add product management for names, descriptions, category, status, best-seller/new-launch flags, images, variants, prices, stock, and visibility.
- Add order management with status changes and tracking details, plus review moderation and basic homepage banner/announcement controls.
- Preserve audit-friendly price and order snapshots so later product edits do not rewrite past orders.

### 5. Reviews, legal pages, and consent
- Add review submission for signed-in customers and admin approve/reject/hide controls. Only approved reviews are public.
- Seed clearly labelled sample five-star cards for presentation only; exclude them from aggregate ratings and make them removable.
- Add Privacy Policy, Terms & Conditions, Cookie Policy, Shipping Policy, Cancellation/Refund Policy, Food Disclaimer, Allergen Disclaimer, and FAQs without inventing GSTIN, FSSAI, support email, or jurisdiction.
- Add a native cookie panel with Accept All, Reject Non-essential, and Customize. Necessary storage stays enabled; analytics and marketing stay off until consent.
- Add Cookie Settings and all legal links to the footer.

### 6. Navigation and contact actions
- Complete the desktop mega menu and mobile menu with search, account, wishlist-ready navigation, category links, and cart.
- Expand the footer into Shop, Company, Help, Legal, and Reach Us groups.
- Use the supplied phone number, WhatsApp, Instagram, office, and factory details consistently. Other social links stay hidden until real URLs are supplied.
- Add a floating WhatsApp action and mobile Call/WhatsApp/Cart bar without covering checkout or cookie controls.

## Technical details
- Use Lovable Cloud tables with explicit grants and row-level security for profiles, roles, invitations, addresses, catalog records, variants, orders, order items, reviews, banners/settings, and tracking events.
- Public visitors can read only active products and approved reviews. Customers can access only their own account data and orders. Admin operations require server-verified roles.
- Use protected TanStack routes for account/admin screens and authenticated server functions for private data and writes.
- Seed the existing catalogue into the new product tables so the first database-backed screen is not empty.
- Keep the current brand palette and type system, but use smaller corner radii, stable image ratios, semantic design tokens, responsive layouts, and accessible controls.
- Add unique metadata to every new content page and preserve current public URLs.

## Verification
- Confirm the earlier `use-mobile.tsx` message is not a real TypeScript source error, then run the project checks after implementation.
- Test sign-up/sign-in/sign-out, guest checkout, signed-in order history, invitation redemption, admin authorization, product/price editing, order status updates, review moderation, cookie choices, and cart clearing.
- Verify the 11-slide carousel and key store flows on desktop and mobile, including visual overlap, image loading, manual pause, five-second autoplay, keyboard use, and reduced motion.
- Run database security checks and confirm unauthorized users cannot reach admin data or another customer’s orders.

## Pending after this milestone
- Online Razorpay payments, COD fees, Shiprocket rates/labels/tracking, transactional email delivery, and additional social networks require credentials or confirmed business settings and will remain inactive.
- Legal placeholders for GSTIN, FSSAI, support email, and jurisdiction remain hidden until real values are provided.
