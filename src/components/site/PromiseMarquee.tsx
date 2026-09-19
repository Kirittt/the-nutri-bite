import { HandHeart, Leaf, ShieldCheck, Sparkles } from "lucide-react";

const promises = [
  { icon: Leaf, title: "Pure & Natural", body: "Real ingredients, nothing unnecessary." },
  { icon: HandHeart, title: "Handcrafted", body: "Made in small batches, by hand." },
  { icon: ShieldCheck, title: "Hygienically Made", body: "Prepared in our own facility." },
  { icon: Sparkles, title: "Packed With Care", body: "Sealed and checked before dispatch." },
];

export function PromiseMarquee() {
  return (
    <section className="overflow-hidden border-y border-border bg-background" aria-label="Our promises">
      <div className="promise-marquee flex w-max py-7 hover:[animation-play-state:paused]">
        {[...promises, ...promises].map((item, index) => (
          <div key={`${item.title}-${index}`} className="flex w-[19rem] shrink-0 items-start gap-3 px-6 sm:w-[24rem]">
            <item.icon className="mt-0.5 size-6 shrink-0 text-leaf transition-transform duration-300 hover:scale-110" />
            <div><h2 className="font-display text-base">{item.title}</h2><p className="text-sm text-muted-foreground">{item.body}</p></div>
          </div>
        ))}
      </div>
    </section>
  );
}