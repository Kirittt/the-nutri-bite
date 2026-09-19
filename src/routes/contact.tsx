import { createFileRoute } from "@tanstack/react-router";
import { Factory, Instagram, MapPin, MessageCircle, Phone } from "lucide-react";

import { BRAND } from "@/data/catalog";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — The Nutri Bite" },
      {
        name: "description",
        content:
          "Call or WhatsApp The Nutri Bite on +91 84878 79935, or visit our Gandhinagar office and Himmatnagar facility.",
      },
      { property: "og:title", content: "Contact — The Nutri Bite" },
      { property: "og:description", content: "We would love to hear from you." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="container-page section-y">
      <h1 className="font-display text-4xl text-primary">Contact Us</h1>
      <p className="mt-2 max-w-xl text-muted-foreground">
        Questions about a product, an order or a bulk enquiry? We are happy to help.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <a
          href={`tel:${BRAND.phoneHref}`}
          className="flex items-center gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft hover:border-primary"
        >
          <span className="grid size-12 place-items-center rounded-xl bg-softgreen">
            <Phone className="size-5 text-leaf" />
          </span>
          <span>
            <span className="block font-display text-lg">Call now</span>
            <span className="text-sm text-muted-foreground">{BRAND.phone}</span>
          </span>
        </a>
        <a
          href={BRAND.whatsapp}
          className="flex items-center gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft hover:border-primary"
        >
          <span className="grid size-12 place-items-center rounded-xl bg-softgreen">
            <MessageCircle className="size-5 text-leaf" />
          </span>
          <span>
            <span className="block font-display text-lg">WhatsApp</span>
            <span className="text-sm text-muted-foreground">Chat with our team</span>
          </span>
        </a>
        <div className="flex gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft">
          <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-softgreen">
            <MapPin className="size-5 text-leaf" />
          </span>
          <span>
            <span className="block font-display text-lg">Office</span>
            <span className="text-sm text-muted-foreground">{BRAND.office}</span>
          </span>
        </div>
        <div className="flex gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft">
          <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-softgreen">
            <Factory className="size-5 text-leaf" />
          </span>
          <span>
            <span className="block font-display text-lg">Manufacturing facility</span>
            <span className="text-sm text-muted-foreground">{BRAND.factory}</span>
          </span>
        </div>
      </div>

      <a
        href={BRAND.instagram}
        className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
      >
        <Instagram className="size-4" /> Follow @the_nutribite
      </a>
    </div>
  );
}
