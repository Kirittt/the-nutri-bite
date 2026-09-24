import { createFileRoute, Link } from "@tanstack/react-router";
import { HandHeart, Leaf, MapPin, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { BRAND } from "@/data/catalog";
import giftingImage from "@/assets/clean/gifting.jpg";
import sweetsImage from "@/assets/clean/sweets.jpg";

export const Route = createFileRoute("/about-us")({
  head: () => ({
    meta: [
      { title: "About Us — The Nutri Bite™" },
      { name: "description", content: "Meet The Nutri Bite™, a Gujarat food brand crafting natural sweets, premium nuts and wholesome snacks with care." },
      { property: "og:title", content: "About Us — The Nutri Bite™" },
      { property: "og:description", content: "Wholesome ingredients, careful small-batch preparation and thoughtful packing." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const values = [
  { icon: Leaf, title: "Ingredients first", body: "We select nuts, seeds, fruit and familiar Indian flavours for freshness, texture and everyday enjoyment." },
  { icon: HandHeart, title: "Made by hand", body: "Small batches let our team give each blend and bite the attention it deserves." },
  { icon: ShieldCheck, title: "Clean preparation", body: "Careful handling, quality checks and hygienic packing guide every stage of our process." },
];

function AboutPage() {
  return (
    <div>
      <section className="container-page section-y grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase text-leaf">About The Nutri Bite™</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-primary sm:text-5xl">Food made thoughtfully, for everyday moments</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">We are a Gujarat-based food brand bringing together handcrafted natural sweets, premium nuts, fruit mixes and wholesome snacks. Our aim is simple: make better snacking feel delicious, dependable and easy to share.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="lg"><Link to="/shop">Explore products</Link></Button>
            <Button asChild size="lg" variant="outline"><a href={BRAND.whatsapp}>Talk to our team</a></Button>
          </div>
        </div>
        <img src={giftingImage} alt="A curated Nutri Bite gift assortment" className="aspect-4/3 w-full rounded-lg object-cover shadow-lift transition duration-500 hover:scale-[1.02] hover:shadow-xl" width={1200} height={900} />
      </section>

      <section className="bg-softgreen">
        <div className="container-page section-y grid gap-6 md:grid-cols-3">
          {values.map((value) => <div key={value.title} className="border-t-2 border-leaf pt-5"><value.icon className="size-6 text-leaf" /><h2 className="mt-4 font-display text-xl text-primary">{value.title}</h2><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value.body}</p></div>)}
        </div>
      </section>

      <section className="container-page section-y grid gap-10 lg:grid-cols-2 lg:items-center">
        <img src={sweetsImage} alt="Handcrafted dry-fruit bites prepared with nuts and dates" className="aspect-4/3 w-full rounded-lg object-cover transition duration-500 hover:scale-[1.02]" loading="lazy" width={1200} height={900} />
        <div><MapPin className="size-7 text-leaf" /><h2 className="mt-4 font-display text-3xl text-primary">Rooted in Gujarat</h2><p className="mt-4 leading-relaxed text-muted-foreground">Our products are prepared at our Himmatnagar facility and supported from our Gandhinagar office. From selecting ingredients to sealing every pack, our team works to deliver food that feels fresh, generous and made with genuine care.</p><div className="mt-6 grid gap-3 text-sm"><p><strong>Manufacturing facility:</strong> {BRAND.factory}</p><p><strong>Office:</strong> {BRAND.office}</p></div></div>
      </section>
    </div>
  );
}