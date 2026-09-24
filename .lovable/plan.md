# Admin-managed product image galleries

## Goal
Allow store administrators to upload several clean product photos at once, manage their order, remove unwanted photos, and show the saved gallery on each product’s buy page.

## What will change
- Add a public `product-images` media area in Lovable Cloud with an 8 MB per-file limit.
- Restrict uploads, replacements, and deletions to authenticated store administrators; customers can only view the published images.
- Expand **Products & prices** in the store manager with:
  - multi-file image selection,
  - JPG, PNG, and WebP validation,
  - upload progress/busy feedback,
  - thumbnail previews,
  - move-left/move-right ordering controls,
  - individual remove controls.
- Save the first image as the product’s main image and the ordered set as its gallery.
- Show uploaded images as a selectable gallery on the product buy page, while retaining the existing built-in product image when no uploaded gallery exists.
- Keep the current catalogue, pricing, menus, orders, and banner management unchanged.

## Technical details
- Reuse the existing `store_products.image_url` and `store_products.gallery_urls` fields; no new product table is needed.
- Add administrator-only server actions for saving gallery order and securely deleting product media after checking the caller’s store role.
- Read only the selected product’s published image fields on its public page.
- Use stable product-based file paths with unique filenames to avoid collisions and stale browser caches.
- Keep previews responsive, reserve image dimensions to prevent page shifting, and lazy-load non-primary gallery images.

## Validation
- Verify an administrator can upload multiple files in one selection, reorder them, remove one, and see the changes after refresh.
- Verify the first uploaded photo appears as the main product image and thumbnails select the other photos.
- Verify non-admin uploads and deletions are rejected.
- Check desktop and mobile product/admin layouts, failed-image fallback, and TypeScript correctness.
