import { createFileRoute } from "@tanstack/react-router";
import { Box, ClipboardCheck, Flame, Package, Sparkles, Wheat } from "lucide-react";

export const Route = createFileRoute("/our-process")({
  head: () => ({
    meta: [
      { title: "Our Process — The Nutri Bite" },
      {
        name: "description",
        content:
          "From ingredient selection to careful packing — how The Nutri Bite makes its sweets and snacks.",
      },
      { property: "og:title", content: "Our Process — The Nutri Bite" },
      {
        property: "og:description",
        content: "Handcrafted and hygienically prepared, then packed with extra care and love.",
      },
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
      <h1 className="font-display text-4xl text-primary">Our Process</h1>
      <p className="mt-2 max-w-xl text-muted-foreground">
        Handcrafted and hygienically prepared, then packed with extra care and love.
      </p>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((s, i) => (
          <div key={s.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
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
    </div>
  );
}
