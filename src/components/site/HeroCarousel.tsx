import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, MessageCircle, Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";

import { Button } from "@/components/ui/button";
import { BRAND } from "@/data/catalog";
import { heroVisuals } from "@/data/catalog-images";
import { getActiveBanners } from "@/lib/store.functions";

const slides = [
  ["Small Bite. Big Benefits.", "Handcrafted sweets and wholesome snacks for everyday happiness."],
  ["Mornings Made Better", "Activated almonds for a simple, wholesome morning ritual."],
  ["Premium Almonds", "Roasted, seasoned and packed with care for a satisfying crunch."],
  ["Cashews, Crafted Better", "Premium cashews in familiar and adventurous flavours."],
  ["Trail Mix for Every Day", "Nuts, seeds and berries balanced for work, travel and home."],
  ["A Better Kind of Crunch", "Thoughtful nut mixes with bold flavour and premium ingredients."],
  ["Wholesome Health Mixes", "Seeds, berries and nuts in easy everyday combinations."],
  ["Snack Bright", "Playful flavours, quality ingredients and careful small-batch preparation."],
  ["Berry & Fruit Mix", "Colourful fruit and berry blends with a lively Indian twist."],
  ["Mastana Makhana", "Four crunchy flavours in 70 g jars, each available for ₹189."],
  ["Packed With Extra Care & Love", "Hygienically prepared, checked and thoughtfully packed."],
] as const;

export function HeroCarousel() {
  const loadBanners = useServerFn(getActiveBanners);
  const [managedSlides, setManagedSlides] = useState<Awaited<ReturnType<typeof getActiveBanners>>>([]);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    void loadBanners().then(setManagedSlides).catch(() => setManagedSlides([]));
  }, [loadBanners]);

  const visibleSlides = managedSlides.length > 0
    ? managedSlides.map((banner) => ({ title: banner.title, subtitle: banner.subtitle, image: banner.image_url, mobileImage: banner.mobile_image_url, ctaText: banner.cta_text, ctaLink: banner.cta_link }))
    : slides.map((slide, index) => ({ title: slide[0], subtitle: slide[1], image: heroVisuals[index], mobileImage: null, ctaText: "Explore now", ctaLink: "/shop" }));

  useEffect(() => {
    if (!playing) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;
    const timer = window.setInterval(() => setActive((value) => (value + 1) % visibleSlides.length), 5000);
    return () => window.clearInterval(timer);
  }, [playing, visibleSlides.length]);

  const move = (direction: number) => {
    setPlaying(false);
    setActive((value) => (value + direction + visibleSlides.length) % visibleSlides.length);
  };

  const slide = visibleSlides[active] ?? visibleSlides[0];
  if (!slide) return null;

  return (
    <section className="relative min-h-[34rem] overflow-hidden bg-deep text-cream sm:min-h-[39rem]" aria-roledescription="carousel" aria-label="Featured collections">
      {visibleSlides.map((item, index) => (
        item.image ? <picture key={`${item.title}-${index}`}><source media="(max-width: 640px)" srcSet={item.mobileImage ?? item.image} /><img src={item.image} alt="" width={1600} height={900} fetchPriority={index === 0 ? "high" : "auto"} loading={index === 0 ? "eager" : "lazy"} className={`absolute inset-0 size-full object-cover transition-[opacity,transform] duration-700 ${index === active ? "scale-100 opacity-65" : "scale-105 opacity-0"}`} /></picture> : null
      ))}
      <div className="absolute inset-0 bg-linear-to-r from-deep via-deep/75 to-transparent" />
      <div className="container-page relative flex min-h-[34rem] items-center py-14 sm:min-h-[39rem]">
        <div className="max-w-2xl animate-fade-in" key={active}>
           <p className="text-sm font-bold tracking-[0.18em] text-sun uppercase">The Nutri Bite™</p>
           <h1 className="mt-4 font-display text-5xl leading-tight sm:text-6xl">{slide.title}</h1>
           <p className="mt-5 max-w-xl text-lg text-cream/85">{slide.subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
             <Button asChild size="lg" className="bg-sun text-accent-foreground hover:bg-gold"><a href={slide.ctaLink || "/shop"}>{slide.ctaText || "Explore now"}</a></Button>
            <Button asChild size="lg" variant="outline" className="border-cream/60 bg-deep/20 text-cream hover:bg-cream hover:text-deep"><a href={BRAND.whatsapp}><MessageCircle /> WhatsApp us</a></Button>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-2">
        <Button size="icon" variant="outline" className="border-cream/50 bg-deep/40 text-cream" onClick={() => move(-1)} aria-label="Previous slide"><ChevronLeft /></Button>
         <div className="flex gap-1.5" aria-label={`Slide ${active + 1} of ${visibleSlides.length}`}>
           {visibleSlides.map((item, index) => <button key={`${item.title}-${index}`} aria-label={`Show slide ${index + 1}`} onClick={() => { setPlaying(false); setActive(index); }} className={`h-2 rounded-full transition-all ${index === active ? "w-7 bg-sun" : "w-2 bg-cream/60"}`} />)}
        </div>
        <Button size="icon" variant="outline" className="border-cream/50 bg-deep/40 text-cream" onClick={() => move(1)} aria-label="Next slide"><ChevronRight /></Button>
        <Button size="icon" variant="outline" className="border-cream/50 bg-deep/40 text-cream" onClick={() => setPlaying((value) => !value)} aria-label={playing ? "Pause slides" : "Play slides"}>{playing ? <Pause /> : <Play />}</Button>
      </div>
    </section>
  );
}