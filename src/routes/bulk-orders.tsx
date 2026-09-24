import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, Gift, MessageCircle, Phone, Tags } from "lucide-react";

import { BRAND } from "@/data/catalog";

export const Route = createFileRoute("/bulk-orders")({
  head: () => ({
    meta: [
      { title: "Bulk, Corporate & Private Label — The Nutri Bite™" },
      {
        name: "description",
        content:
          "Corporate gifting, festive hampers and private label manufacturing from The Nutri Bite™, Gujarat.",
      },
      { property: "og:title", content: "Bulk, Corporate & Private Label — The Nutri Bite™" },
      {
        property: "og:description",
        content: "Talk to us about bulk orders, corporate gifting and private label snacks.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BulkPage,
});

const offers = [
  {
    icon: Briefcase,
    title: "Corporate gifting",
    body: "Curated hampers for employees, clients and festive occasions, packed to your quantity.",
  },
  {
    icon: Gift,
    title: "Wedding & events",
    body: "Handcrafted sweets and nut packs in event-ready presentation.",
  },
  {
    icon: Tags,
    title: "Private label",
    body: "Our recipes and manufacturing, your brand on the pack. Talk to us about minimums.",
  },
];

function BulkPage() {
  return (
    <div className="container-page section-y">
      <h1 className="font-display text-4xl text-primary">Bulk, Corporate & Private Label</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        We manufacture at our own facility in Himmatnagar, Gujarat — so quantities, flavours and
        packing can be tailored to your requirement.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {offers.map((o) => (
          <div key={o.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <span className="grid size-11 place-items-center rounded-xl bg-softgreen">
              <o.icon className="size-5 text-leaf" />
            </span>
            <h2 className="mt-4 font-display text-lg">{o.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{o.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-3xl bg-deep p-10 text-cream">
        <h2 className="font-display text-2xl">Tell us what you need</h2>
        <p className="mt-2 text-cream/80">
          Share quantity, timeline and preferred products, and we will revert with options.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={BRAND.whatsapp}
            className="inline-flex items-center gap-2 rounded-xl bg-sun px-6 py-3 font-semibold text-accent-foreground"
          >
            <MessageCircle className="size-5" /> WhatsApp enquiry
          </a>
          <a
            href={`tel:${BRAND.phoneHref}`}
            className="inline-flex items-center gap-2 rounded-xl border border-cream/40 px-6 py-3 font-semibold"
          >
            <Phone className="size-5" /> {BRAND.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
