import { MessageCircle } from "lucide-react";

import { BRAND } from "@/data/catalog";

export function WhatsAppChat() {
  return (
    <a href={BRAND.whatsapp} target="_blank" rel="noreferrer" aria-label="Chat with The Nutri Bite on WhatsApp" className="group fixed right-4 bottom-4 z-40 grid size-14 place-items-center rounded-full bg-leaf text-primary-foreground shadow-lift transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:right-6 sm:bottom-6">
      <MessageCircle className="size-7" />
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-md bg-deep px-3 py-2 text-xs font-semibold text-cream shadow-soft group-hover:block">Chat on WhatsApp</span>
    </a>
  );
}