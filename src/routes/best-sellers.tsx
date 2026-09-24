import { createFileRoute } from "@tanstack/react-router";

import { ProductCard } from "@/components/site/ProductCard";
import { products } from "@/data/catalog";

export const Route = createFileRoute("/best-sellers")({
  head: () => ({
    meta: [
      { title: "Best Sellers — The Nutri Bite™" },
      {
        name: "description",
        content: "The Nutri Bite™ favourites: signature laddu, anjeer bites, protein bars and more.",
      },
      { property: "og:title", content: "Best Sellers — The Nutri Bite™" },
      {
        property: "og:description",
        content: "Our most-loved handcrafted sweets and premium nuts.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => {
    const items = products.filter((p) => p.bestSeller);
    return (
      <div className="container-page section-y">
        <h1 className="font-display text-4xl text-primary">Best Sellers</h1>
        <p className="mt-2 max-w-xl text-muted-foreground">
          The bites our families come back for, again and again.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </div>
    );
  },
});
