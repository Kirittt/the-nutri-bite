import { createFileRoute } from "@tanstack/react-router";
import { Factory, Instagram, MapPin, MessageCircle, Phone, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div className="grid gap-3 sm:grid-cols-2">
        <a
          href={`tel:${BRAND.phoneHref}`}
           className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 shadow-soft hover:border-primary"
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
           className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 shadow-soft hover:border-primary"
        >
          <span className="grid size-12 place-items-center rounded-xl bg-softgreen">
            <MessageCircle className="size-5 text-leaf" />
          </span>
          <span>
            <span className="block font-display text-lg">WhatsApp</span>
            <span className="text-sm text-muted-foreground">Chat with our team</span>
          </span>
        </a>
         <div className="flex gap-3 rounded-lg border border-border bg-card p-4 shadow-soft">
          <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-softgreen">
            <MapPin className="size-5 text-leaf" />
          </span>
          <span>
            <span className="block font-display text-lg">Office</span>
            <span className="text-sm text-muted-foreground">{BRAND.office}</span>
          </span>
        </div>
         <div className="flex gap-3 rounded-lg border border-border bg-card p-4 shadow-soft">
          <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-softgreen">
            <Factory className="size-5 text-leaf" />
          </span>
          <span>
            <span className="block font-display text-lg">Manufacturing facility</span>
            <span className="text-sm text-muted-foreground">{BRAND.factory}</span>
          </span>
         </div>
         <a href={BRAND.instagram} className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 shadow-soft hover:border-primary sm:col-span-2"><span className="grid size-12 place-items-center rounded-xl bg-softgreen"><Instagram className="size-5 text-leaf" /></span><span><span className="block font-display text-lg">Instagram</span><span className="text-sm text-muted-foreground">Follow @the_nutribite</span></span></a>
        </div>
        <aside className="flex min-h-80 flex-col justify-center rounded-lg bg-deep p-8 text-cream shadow-lift"><div className="flex gap-1 text-sun" aria-label="Five stars">{Array.from({length:5}).map((_,index)=><Star key={index} className="size-5 fill-current" />)}</div><h2 className="mt-5 font-display text-3xl">Share your experience</h2><p className="mt-3 text-cream/80">Your feedback helps families discover thoughtfully made snacks and helps our team keep improving every batch.</p><div className="mt-6 rounded-md border border-cream/20 bg-background/10 p-4 text-sm text-cream/70">Google review link and QR code will appear here once provided.</div><Button disabled size="lg" className="mt-5 w-fit bg-sun text-accent-foreground">Review on Google</Button></aside>
       </div>
    </div>
  );
}
