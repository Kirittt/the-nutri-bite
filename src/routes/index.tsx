import { createFileRoute, Link } from "@tanstack/react-router";
import { HandHeart, Leaf, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";

import { HeroCarousel } from "@/components/site/HeroCarousel";
import { CategoryIcon } from "@/components/site/icons";
import { ProductCard } from "@/components/site/ProductCard";
import { BRAND, categories, products } from "@/data/catalog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Nutri Bite — Healthy Bite, Happy Life" },
      {
        name: "description",
        content:
          "Handcrafted natural sweets, premium flavoured almonds and cashews, trail mixes and wholesome snacks from The Nutri Bite, Gujarat.",
      },
      { property: "og:title", content: "The Nutri Bite — Healthy Bite, Happy Life" },
      {
        property: "og:description",
        content: "Small Bite. Big Benefits. Nature’s goodness in every bite.",
      },
    ],
  }),
  component: Home,
});

const promises = [
  { icon: Leaf, title: "Pure & Natural", body: "Real ingredients, nothing unnecessary." },
  { icon: HandHeart, title: "Handcrafted", body: "Made in small batches, by hand." },
  { icon: ShieldCheck, title: "Hygienically Made", body: "Prepared in our own facility." },
  { icon: Sparkles, title: "Packed With Care", body: "Sealed and checked before dispatch." },
];

function Home() {
  const bestSellers = products.filter((p) => p.bestSeller);
  const fresh = products.filter((p) => p.newLaunch);

  return (
    <div>
      <HeroCarousel />

      {/* Promises */}
      <section className="border-y border-border bg-background">
        <div className="container-page grid gap-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {promises.map((p) => (
            <div key={p.title} className="flex items-start gap-3">
              <p.icon className="mt-0.5 size-6 shrink-0 text-leaf" />
              <div>
                <h2 className="font-display text-base">{p.title}</h2>
                <p className="text-sm text-muted-foreground">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-beige"><div className="container-page section-y grid gap-8 lg:grid-cols-2"><div><p className="text-sm font-bold text-leaf uppercase">From our hands to your home</p><h2 className="mt-3 font-display text-4xl text-primary">Neat, hygienic and packed with love</h2><p className="mt-4 text-muted-foreground">Every batch moves through thoughtful preparation, careful handling and clean packing. Our team checks each pack before dispatch so your family receives it the way we intended.</p><Link to="/our-process" className="mt-6 inline-block font-semibold text-primary underline">See our six-step process</Link></div><div className="grid grid-cols-2 gap-3">{["Selected ingredients","Small-batch craft","Careful quality checks","Hand-packed finish"].map((item)=><div key={item} className="rounded-lg bg-background p-5 font-display text-lg text-primary shadow-soft">{item}</div>)}</div></div></section>

      {/* Categories */}
      <section className="container-page section-y">
        <h2 className="font-display text-3xl text-primary">Shop by collection</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/shop/$category"
              params={{ category: c.slug }}
              className="group rounded-2xl border border-border bg-card p-5 shadow-soft transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lift"
            >
              <span className="grid size-12 place-items-center rounded-xl bg-softgreen">
                <CategoryIcon name={c.icon} className="size-6 text-leaf" />
              </span>
              <h3 className="mt-4 font-display text-lg">{c.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Best sellers */}
      <section className="bg-softgreen">
        <div className="container-page section-y">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="font-display text-3xl text-primary">Best Sellers</h2>
            <Link to="/best-sellers" className="text-sm font-semibold text-primary hover:underline">
              View all
            </Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {bestSellers.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Story strip */}
      <section className="container-page section-y">
        <div className="rounded-3xl bg-deep px-8 py-14 text-center text-cream">
          <h2 className="mx-auto max-w-2xl font-display text-3xl leading-snug">
            Nature’s goodness in every bite
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-cream/80">
            The Nutri Bite brings nature’s goodness to every family through handcrafted sweets and
            wholesome snacks, thoughtfully created for healthier everyday living.
          </p>
          <Link
            to="/our-story"
            className="mt-7 inline-block rounded-xl bg-sun px-7 py-3.5 font-semibold text-accent-foreground"
          >
            Read our story
          </Link>
        </div>
      </section>

      {/* New launches */}
      <section className="container-page pb-16">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-display text-3xl text-primary">New Launches</h2>
          <Link to="/new-launches" className="text-sm font-semibold text-primary hover:underline">
            View all
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {fresh.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
