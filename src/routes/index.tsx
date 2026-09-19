import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";

import { HeroCarousel } from "@/components/site/HeroCarousel";
import { CategoryIcon } from "@/components/site/icons";
import { ProductCard } from "@/components/site/ProductCard";
import { PromiseMarquee } from "@/components/site/PromiseMarquee";
import { BRAND, categories, products } from "@/data/catalog";
import { categoryImages } from "@/data/catalog-images";
import { Button } from "@/components/ui/button";
import { ReviewCarousel } from "@/components/site/ReviewCarousel";

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
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const bestSellers = products.filter((p) => p.bestSeller);
  const fresh = products.filter((p) => p.newLaunch);

  return (
    <div>
      <HeroCarousel />

      <PromiseMarquee />

      <section className="bg-beige"><div className="container-page section-y grid gap-8 lg:grid-cols-2"><div><p className="text-sm font-bold text-leaf uppercase">From our hands to your home</p><h2 className="mt-3 font-display text-4xl text-primary">Neat, hygienic and packed with love</h2><p className="mt-4 text-muted-foreground">Every batch moves through thoughtful preparation, careful handling and clean packing. Our team checks each pack before dispatch so your family receives it the way we intended.</p><Link to="/our-process" className="mt-6 inline-block font-semibold text-primary underline">See our six-step process</Link></div><div className="grid grid-cols-2 gap-3">{["Selected ingredients","Small-batch craft","Careful quality checks","Hand-packed finish"].map((item)=><div key={item} className="rounded-lg bg-background p-5 font-display text-lg text-primary shadow-soft">{item}</div>)}</div></div></section>

      {/* Categories */}
      <section className="container-page section-y">
        <div className="max-w-2xl"><p className="text-sm font-bold uppercase text-leaf">Find your favourite</p><h2 className="mt-2 font-display text-4xl text-primary">Shop by collection</h2><p className="mt-3 text-muted-foreground">From naturally sweet bites to bold roasted nuts, explore a collection for every craving and occasion.</p></div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/shop/$category"
              params={{ category: c.slug }}
              className="group relative min-h-64 overflow-hidden rounded-lg bg-deep shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <img src={categoryImages[c.slug]} alt="" className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" width={1200} height={900} />
              <div className="absolute inset-0 bg-linear-to-t from-deep via-deep/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-cream"><span className="grid size-10 place-items-center rounded-md bg-background/90"><CategoryIcon name={c.icon} className="size-5 text-leaf" /></span><h3 className="mt-3 font-display text-xl">{c.name}</h3><p className="mt-1 line-clamp-2 text-sm text-cream/75">{c.blurb}</p><span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-sun">Explore <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-deep text-cream"><div className="container-page section-y flex flex-col justify-between gap-7 md:flex-row md:items-center"><div><p className="text-sm font-bold uppercase text-sun">Ready for a better snack?</p><h2 className="mt-2 max-w-2xl font-display text-3xl sm:text-4xl">Bring home a box packed with flavour and care.</h2><p className="mt-3 text-cream/75">Order available products online or ask our team to help you choose.</p></div><div className="flex shrink-0 flex-wrap gap-3"><Button asChild size="lg" className="bg-sun text-accent-foreground hover:bg-gold"><Link to="/shop">Shop now <ArrowRight /></Link></Button><Button asChild size="lg" variant="outline" className="border-cream/50 bg-transparent text-cream hover:bg-cream hover:text-deep"><a href={BRAND.whatsapp}><MessageCircle /> WhatsApp</a></Button></div></div></section>

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
      <ReviewCarousel />
    </div>
  );
}
