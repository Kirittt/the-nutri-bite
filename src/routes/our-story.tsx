import { createFileRoute } from "@tanstack/react-router";

import storyImg from "@/assets/clean/sweets.jpg";
import trailImage from "@/assets/clean/trail-mix.jpg";

export const Route = createFileRoute("/our-story")({
  head: () => ({
    meta: [
      { title: "Our Story — The Nutri Bite" },
      {
        name: "description",
        content:
          "The Nutri Bite brings nature’s goodness to every family through handcrafted sweets and wholesome snacks.",
      },
      { property: "og:title", content: "Our Story — The Nutri Bite" },
      {
        property: "og:description",
        content: "Handcrafted sweets and wholesome snacks for healthier everyday living.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StoryPage,
});

const principles = [
  "Pure & Natural",
  "Handmade With Care",
  "Premium Ingredients",
  "Thoughtfully Prepared",
  "Hygienically Made",
  "Carefully Packed",
  "Family Friendly",
  "Traditional Goodness",
  "Modern Convenience",
  "Wholesome Choices",
];

function StoryPage() {
  return (
    <div>
      <section className="bg-softgreen">
        <div className="container-page section-y max-w-3xl text-center">
          <h1 className="font-display text-4xl text-primary sm:text-5xl">Our Story</h1>
          <p className="mt-6 text-lg leading-relaxed">
            The Nutri Bite brings nature’s goodness to every family through handcrafted sweets and
            wholesome snacks, thoughtfully created for healthier everyday living.
          </p>
        </div>
      </section>

      <div className="container-page section-y grid gap-12 lg:grid-cols-2 lg:items-center">
        <img
          src={storyImg}
          alt="Assorted Nutri Bite sweets and flavoured nuts in kraft bowls"
          className="rounded-lg shadow-lift transition duration-500 hover:scale-[1.02]"
          loading="lazy"
          width={1200}
          height={912}
        />
        <div className="grid gap-8">
          <div>
            <h2 className="font-display text-2xl text-primary">Our Mission</h2>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              To make natural, nutritious and thoughtfully crafted food a simple part of everyday
              life, while bringing traditional goodness to modern families.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl text-primary">Our Vision</h2>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              To build a healthier tomorrow by inspiring people to choose food that is natural,
              nourishing and crafted with integrity every day.
            </p>
          </div>
        </div>
      </div>

      <section className="bg-beige"><div className="container-page section-y grid gap-10 lg:grid-cols-2 lg:items-center"><div><p className="text-sm font-bold uppercase text-leaf">Why we began</p><h2 className="mt-3 font-display text-3xl text-primary">Making thoughtful food easier to enjoy</h2><p className="mt-4 leading-relaxed text-muted-foreground">The Nutri Bite began with a belief that familiar ingredients and careful craftsmanship can create snacks people genuinely look forward to. We combine traditional dry-fruit goodness with modern flavours, convenient packs and warm, dependable service.</p><p className="mt-4 leading-relaxed text-muted-foreground">From a family snack drawer to festive gifting, every collection is designed to feel generous, fresh and easy to share.</p></div><img src={trailImage} alt="A clean bowl of nuts, seeds and dried fruit" className="aspect-4/3 w-full rounded-lg object-cover transition duration-500 hover:scale-[1.02]" loading="lazy" width={1200} height={900} /></div></section>

      <div className="container-page pb-16">
        <h2 className="font-display text-2xl text-primary">What we stand for</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {principles.map((p) => (
            <span
              key={p}
              className="rounded-full border border-border bg-cream px-4 py-2 text-sm font-medium"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
