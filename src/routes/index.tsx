import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Box,
  ClipboardCheck,
  Flame,
  MessageCircle,
  Package,
  Sparkles,
  Wheat,
} from "lucide-react";

import { HeroCarousel } from "@/components/site/HeroCarousel";
import { CategoryIcon } from "@/components/site/icons";
import { ProductCard } from "@/components/site/ProductCard";
import { PromiseMarquee } from "@/components/site/PromiseMarquee";
import { BRAND, categories, products } from "@/data/catalog";
import { categoryImages } from "@/data/catalog-images";
import { Button } from "@/components/ui/button";
import { ReviewCarousel } from "@/components/site/ReviewCarousel";

const processSteps = [
  {
    icon: Wheat,
    title: "Ingredient selection",
    body: "Fresh nuts, seeds, dates and berries are chosen for quality, size and taste.",
  },
  {
    icon: ClipboardCheck,
    title: "Preparation",
    body: "Every ingredient is carefully cleaned, sorted and prepared in small batches.",
  },
  {
    icon: Flame,
    title: "Roasting & crafting",
    body: "Controlled roasting and thoughtful blending bring out balanced flavour and texture.",
  },
  {
    icon: Sparkles,
    title: "Hygienic handling",
    body: "Clean handling practices are followed throughout every stage of preparation.",
  },
  {
    icon: Package,
    title: "Careful packing",
    body: "Each pack is filled, sealed and checked by hand to preserve freshness.",
  },
  {
    icon: Box,
    title: "Dispatch",
    body: "Finished orders are packed securely and prepared for a safe journey to you.",
  },
];

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
  const bestSellers = products.filter((p) => p.bestSeller || p.newLaunch).slice(0, 10);
  const fresh = products.filter((p) => p.newLaunch);

  return (
    <div>
      <HeroCarousel />

      <PromiseMarquee />

      <section className="bg-beige"><div className="container-page section-y grid gap-8 lg:grid-cols-2 lg:items-center"><div><p className="text-sm font-bold text-leaf uppercase">From our hands to your home</p><h2 className="mt-3 font-display text-4xl text-primary">Neat, hygienic and packed with love</h2><p className="mt-4 text-muted-foreground">Every batch moves through thoughtful preparation, careful handling and clean packing. Our team checks each pack before dispatch so your family receives it the way we intended.</p><Button asChild size="lg" className="mt-6"><Link to="/our-process">See our six-step process <ArrowRight /></Link></Button></div><div className="grid grid-cols-2 gap-3">{processSteps.slice(0,4).map((step, index)=><div key={step.title} className="group rounded-lg bg-background p-5 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"><span className={`grid size-10 place-items-center rounded-full ${index % 2 === 0 ? "bg-softgreen text-leaf" : "bg-beige text-sun"}`}><step.icon className="size-5" /></span><h3 className="mt-4 font-display text-lg text-primary">{["Selected ingredients","Small-batch craft","Careful quality checks","Hand-packed finish"][index]}</h3></div>)}</div></div></section>

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

      <section className="relative isolate min-h-80 overflow-hidden text-cream">
        <img src={categoryImages["natural-sweets-bites"]} alt="Handcrafted natural sweets arranged for sharing" className="absolute inset-0 -z-20 size-full object-cover" loading="lazy" width={1200} height={900} />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-deep/95 via-deep/75 to-deep/35" />
        <div className="container-page section-y flex min-h-80 flex-col justify-center gap-8 md:flex-row md:items-center md:justify-between">
          <div><p className="text-sm font-bold uppercase text-sun">Ready for a better snack?</p><h2 className="mt-2 max-w-2xl font-display text-3xl sm:text-4xl">Bring home a box packed with flavour and care.</h2><p className="mt-3 max-w-xl text-cream/85">Discover handcrafted sweets, premium nuts and wholesome mixes prepared for everyday moments and thoughtful gifting.</p></div>
          <div className="flex shrink-0 flex-wrap gap-3"><Button asChild size="lg" className="bg-sun text-accent-foreground hover:bg-gold"><Link to="/shop">Shop now <ArrowRight /></Link></Button><Button asChild size="lg" variant="outline" className="border-cream/60 bg-deep/30 text-cream hover:bg-cream hover:text-deep"><a href={BRAND.whatsapp}><MessageCircle /> WhatsApp</a></Button></div>
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
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {bestSellers.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Our process */}
      <section className="border-y border-border bg-background">
        <div className="container-page section-y">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase text-leaf">From selection to dispatch</p>
              <h2 className="mt-2 font-display text-3xl text-primary sm:text-4xl">
                Our process, made with care
              </h2>
              <p className="mt-3 text-muted-foreground">
                Six thoughtful stages help us keep every batch neat, hygienic and ready to enjoy.
              </p>
            </div>
            <Button asChild variant="outline" className="w-fit border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <Link to="/our-process">Read more <ArrowRight /></Link>
            </Button>
          </div>

          <ol className="mt-9 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((step, index) => (
              <li key={step.title} className="group relative border-t border-border pt-5">
                <div className="flex items-start gap-4">
                  <span className={`grid size-12 shrink-0 place-items-center rounded-lg transition-transform duration-300 group-hover:-translate-y-1 ${index % 2 === 0 ? "bg-softgreen text-leaf" : "bg-beige text-sun"}`}>
                    <step.icon className="size-6" aria-hidden="true" />
                  </span>
                  <div>
                    <span className="text-xs font-bold uppercase text-muted-foreground">Step {index + 1}</span>
                    <h3 className="mt-1 font-display text-xl text-primary">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Story strip */}
      <section className="container-page section-y">
        <div className="group relative min-h-[28rem] overflow-hidden rounded-lg">
          <img src={categoryImages["trail-mix"]} alt="A colourful selection of wholesome nuts, seeds and dried fruits" className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
          <div className="absolute inset-0 bg-linear-to-r from-deep/95 via-deep/75 to-deep/20" />
          <div className="relative flex min-h-[28rem] max-w-2xl flex-col justify-center px-7 py-14 text-cream sm:px-12">
            <p className="text-sm font-bold uppercase text-sun">Made thoughtfully, enjoyed naturally</p>
          <h2 className="mx-auto max-w-2xl font-display text-3xl leading-snug">
            Nature’s goodness in every bite
          </h2>
          <p className="mt-4 max-w-xl text-cream/80">
            The Nutri Bite brings nature’s goodness to every family through handcrafted sweets and
            wholesome snacks, thoughtfully created for healthier everyday living.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-sun text-accent-foreground hover:bg-gold"><Link to="/shop">Shop wholesome bites <ArrowRight /></Link></Button>
            <Button asChild size="lg" variant="outline" className="border-cream/60 bg-background/10 text-cream hover:bg-cream hover:text-deep"><Link to="/our-story">Read our story</Link></Button>
          </div>
          </div>
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
