import { createFileRoute, Link } from "@tanstack/react-router";

import { CategoryIcon } from "@/components/site/icons";
import { ProductCard } from "@/components/site/ProductCard";
import { categories, products } from "@/data/catalog";

export const Route = createFileRoute("/shop/")({
  head: () => ({
    meta: [
      { title: "Shop All — The Nutri Bite" },
      {
        name: "description",
        content:
          "Browse handcrafted natural sweets, flavoured almonds and cashews, trail mixes, health mixes and more from The Nutri Bite.",
      },
      { property: "og:title", content: "Shop All — The Nutri Bite" },
      {
        property: "og:description",
        content: "Handcrafted sweets, premium nuts and wholesome snacks, delivered across India.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  return (
    <div className="container-page section-y">
      <h1 className="font-display text-4xl text-primary">Shop All</h1>
      <p className="mt-2 max-w-xl text-muted-foreground">
        Pure • Natural • Wholesome. Every pack is handcrafted, hygienically prepared and packed
        with care.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {categories.map((c) => (
          <Link
            key={c.slug}
            to="/shop/$category"
            params={{ category: c.slug }}
            className="flex items-center gap-2 rounded-full border border-border bg-softgreen px-4 py-2 text-sm font-medium hover:border-primary"
          >
            <CategoryIcon name={c.icon} className="size-4 text-leaf" />
            {c.name}
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}
