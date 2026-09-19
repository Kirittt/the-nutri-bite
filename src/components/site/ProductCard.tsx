import { Link } from "@tanstack/react-router";

import { formatINR, fromPrice, type Product } from "@/data/catalog";
import { CategoryIcon } from "./icons";
import { getCategory } from "@/data/catalog";
import { getProductImage } from "@/data/catalog-images";

export function ProductCard({ product }: { product: Product }) {
  const price = fromPrice(product);
  const cat = getCategory(product.category);
  const image = getProductImage(product.slug, product.category);

  return (
    <Link
      to="/product/$slug"
      params={{ slug: product.slug }}
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lift"
    >
      <div className="relative grid aspect-4/3 place-items-center overflow-hidden bg-linear-to-br from-softgreen to-beige">
        {image ? <img src={image} alt={product.name} className="size-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" /> : <CategoryIcon
          name={cat?.icon ?? "cookie"}
          className="size-14 text-primary/30 transition-transform group-hover:scale-110"
        />}
        <div className="absolute top-3 left-3 flex gap-2">
          {product.bestSeller && (
            <span className="rounded-full bg-sun px-2.5 py-1 text-[0.65rem] font-bold tracking-wide text-accent-foreground uppercase">
              Best Seller
            </span>
          )}
          {product.newLaunch && (
            <span className="rounded-full bg-leaf px-2.5 py-1 text-[0.65rem] font-bold tracking-wide text-primary-foreground uppercase">
              New
            </span>
          )}
          {product.status === "coming-soon" && (
            <span className="rounded-full bg-primary px-2.5 py-1 text-[0.65rem] font-bold tracking-wide text-primary-foreground uppercase">
              Coming Soon
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="font-display text-base leading-snug">{product.name}</h3>
        <p className="line-clamp-2 text-xs text-muted-foreground">{product.tagline}</p>
        <div className="mt-auto pt-3 text-sm font-semibold text-primary">
          {price !== null ? (
            <>
              From {formatINR(price)}
              <span className="ml-1 text-xs font-normal text-muted-foreground">
                / {product.variants.find((v) => v.price === price)?.label}
              </span>
            </>
          ) : (
            <span className="text-muted-foreground">Price coming soon</span>
          )}
        </div>
      </div>
    </Link>
  );
}
