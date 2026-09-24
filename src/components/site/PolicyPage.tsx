import type { ReactNode } from "react";
import { BRAND } from "@/data/catalog";

export function PolicyPage({ title, intro, children }: { title: string; intro: string; children: ReactNode }) {
  return <div className="container-page section-y max-w-4xl"><p className="text-sm font-bold text-leaf uppercase">The Nutri Bite™</p><h1 className="mt-2 font-display text-5xl text-primary">{title}</h1><p className="mt-5 text-lg text-muted-foreground">{intro}</p><div className="prose prose-green mt-10 max-w-none space-y-7 text-foreground [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-primary [&_p]:text-muted-foreground">{children}</div><div className="mt-10 rounded-lg bg-softgreen p-5 text-sm">Questions? Call <a className="font-semibold text-primary" href={`tel:${BRAND.phoneHref}`}>{BRAND.phone}</a> or contact us on <a className="font-semibold text-primary" href={BRAND.whatsapp}>WhatsApp</a>.</div></div>;
}