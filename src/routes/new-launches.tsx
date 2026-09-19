import { createFileRoute } from "@tanstack/react-router";

import { ProductCard } from "@/components/site/ProductCard";
import { products } from "@/data/catalog";

export const Route = createFileRoute("/new-launches")({
  head: () => ({
    meta: [
      { title: "New Launches — The Nutri Bite" },
      {
        name: "description",
        content: "Newly launched and soon-to-arrive snacks and sweets from The Nutri Bite.",
      },
      { property: "og:title", content: "New Launches — The Nutri Bite" },
      { property: "og:description", content: "Fresh arrivals and collections launching soon." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => {
    const fresh = products.filter((p) => p.newLaunch);
    const soon = products.filter((p) => p.status === "coming-soon");
    return (
      <div className="container-page section-y">
        <h1 className="font-display text-4xl text-primary">New Launches</h1>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {fresh.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
        <h2 className="mt-16 font-display text-2xl text-primary">Launching soon</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {soon.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </div>
    );
  },
});
