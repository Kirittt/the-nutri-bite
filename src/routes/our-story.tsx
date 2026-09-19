import { createFileRoute } from "@tanstack/react-router";

import storyImg from "@/assets/story-craft.jpg";

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
          className="rounded-3xl shadow-lift"
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
