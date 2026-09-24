import { createFileRoute } from "@tanstack/react-router";
import { Box, ClipboardCheck, Flame, Package, Sparkles, Wheat } from "lucide-react";
import processImage from "@/assets/clean/nut-mix.jpg";

export const Route = createFileRoute("/our-process")({
  head: () => ({
    meta: [
      { title: "Our Process — The Nutri Bite™" },
      {
        name: "description",
        content:
          "From ingredient selection to careful packing — how The Nutri Bite™ makes its sweets and snacks.",
      },
      { property: "og:title", content: "Our Process — The Nutri Bite™" },
      {
        property: "og:description",
        content: "Handcrafted and hygienically prepared, then packed with extra care and love.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProcessPage,
});

const steps = [
  {
    icon: Wheat,
    title: "Ingredient selection",
    body: "Nuts, seeds, dates and berries are chosen for grade, size and freshness before anything else begins.",
  },
  {
    icon: ClipboardCheck,
    title: "Preparation",
    body: "Ingredients are cleaned, sorted and prepared in small batches at our Himmatnagar facility.",
  },
  {
    icon: Flame,
    title: "Roasting & crafting",
    body: "Roasting and blending are done in controlled small batches so texture and flavour stay consistent.",
  },
  {
    icon: Sparkles,
    title: "Hygienic handling",
    body: "Every stage follows strict hygiene practice, from handling to final finish.",
  },
  {
    icon: Package,
    title: "Careful packing",
    body: "Packs are filled, sealed and checked by hand — packed with extra care and love.",
  },
  {
    icon: Box,
    title: "Dispatch",
    body: "Orders are packed for safe transit and dispatched from our Gandhinagar office.",
  },
];

function ProcessPage() {
  return (
    <div className="container-page section-y">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center"><div><p className="text-sm font-bold uppercase text-leaf">From selection to dispatch</p><h1 className="mt-3 font-display text-4xl text-primary">Our Process</h1><p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">Handcrafted and hygienically prepared, then packed with extra care and love. We keep every stage clear and considered so quality is built into the process, not checked only at the end.</p></div><img src={processImage} alt="A freshly prepared almond and cashew mix" className="aspect-4/3 w-full rounded-lg object-cover shadow-lift transition duration-500 hover:scale-[1.02]" width={1200} height={900} /></div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((s, i) => (
          <div key={s.title} className="rounded-lg border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lift">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-xl bg-softgreen">
                <s.icon className="size-5 text-leaf" />
              </span>
              <span className="text-xs font-bold tracking-widest text-muted-foreground">
                STEP {i + 1}
              </span>
            </div>
            <h2 className="mt-4 font-display text-lg">{s.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
          </div>
        ))}
      </div>
      <div className="mt-14 border-l-4 border-sun bg-beige p-7"><h2 className="font-display text-2xl text-primary">Care that continues after packing</h2><p className="mt-3 max-w-3xl text-muted-foreground">Every order is prepared for safe transit and supported by our team through confirmation and dispatch. If you need help with a pack, gifting quantity or delivery, call or WhatsApp us before placing your order.</p></div>
    </div>
  );
}
