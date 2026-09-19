import { createFileRoute, Link } from "@tanstack/react-router";

import { ProductCard } from "@/components/site/ProductCard";
import { BRAND, products } from "@/data/catalog";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReviewCarousel } from "@/components/site/ReviewCarousel";
import { categoryImages } from "@/data/catalog-images";

export const Route = createFileRoute("/new-launches")({
  head: () => ({
    meta: [
      { title: "New Launches — The Nutri Bite" },
      {
        name: "description",
        content: "Discover fresh arrivals, handcrafted snacks and wholesome sweets from The Nutri Bite.",
      },
      { property: "og:title", content: "New Launches — The Nutri Bite" },
      { property: "og:description", content: "Explore fresh arrivals and find your next favourite wholesome snack." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => {
    const fresh = products.filter((p) => p.newLaunch);
    return (
      <div>
      <section className="container-page section-y">
        <h1 className="font-display text-4xl text-primary">New Launches</h1>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {fresh.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
      <section className="relative isolate overflow-hidden bg-deep text-cream">
        <img src={categoryImages["trail-mix"]} alt="" width={1200} height={900} loading="lazy" className="absolute inset-0 -z-20 size-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-deep/95 via-deep/85 to-deep/50" />
        <div className="container-page section-y">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase text-sun">A fresh favourite awaits</p>
            <h2 className="mt-3 font-display text-3xl leading-snug sm:text-4xl">Nature’s goodness in every bite</h2>
            <p className="mt-4 text-cream/80">Discover bold flavours, wholesome ingredients and thoughtfully handcrafted bites. Find something new for your snack break, or let us help you choose a box to share.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-sun text-accent-foreground hover:bg-gold"><Link to="/shop">Shop wholesome bites <ArrowRight /></Link></Button>
              <Button asChild size="lg" variant="outline" className="border-cream/60 bg-background/10 text-cream hover:bg-cream hover:text-deep"><a href={BRAND.whatsapp}><MessageCircle /> Chat on WhatsApp</a></Button>
            </div>
          </div>
        </div>
      </section>
      <ReviewCarousel />
      </div>
      </div>
    );
  },
});
