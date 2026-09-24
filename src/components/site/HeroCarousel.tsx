import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, MessageCircle, Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { BRAND } from "@/data/catalog";
import { heroVisuals } from "@/data/catalog-images";

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
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;
    const timer = window.setInterval(() => setActive((value) => (value + 1) % slides.length), 5000);
    return () => window.clearInterval(timer);
  }, [playing]);

  const move = (direction: number) => {
    setPlaying(false);
    setActive((value) => (value + direction + slides.length) % slides.length);
  };

  const slide = slides[active];
  if (!slide) return null;

  return (
    <section className="relative min-h-[34rem] overflow-hidden bg-deep text-cream sm:min-h-[39rem]" aria-roledescription="carousel" aria-label="Featured collections">
      {heroVisuals.map((image, index) => (
        <img key={image} src={image} alt="" className={`absolute inset-0 size-full object-cover transition-[opacity,transform] duration-700 ${index === active ? "scale-100 opacity-65" : "scale-105 opacity-0"}`} />
      ))}
      <div className="absolute inset-0 bg-linear-to-r from-deep via-deep/75 to-transparent" />
      <div className="container-page relative flex min-h-[34rem] items-center py-14 sm:min-h-[39rem]">
        <div className="max-w-2xl animate-fade-in" key={active}>
          <p className="text-sm font-bold tracking-[0.18em] text-sun uppercase">The Nutri Bite</p>
          <h1 className="mt-4 font-display text-5xl leading-tight sm:text-6xl">{slide[0]}</h1>
          <p className="mt-5 max-w-xl text-lg text-cream/85">{slide[1]}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-sun text-accent-foreground hover:bg-gold"><Link to="/shop">Explore now</Link></Button>
            <Button asChild size="lg" variant="outline" className="border-cream/60 bg-deep/20 text-cream hover:bg-cream hover:text-deep"><a href={BRAND.whatsapp}><MessageCircle /> WhatsApp us</a></Button>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-2">
        <Button size="icon" variant="outline" className="border-cream/50 bg-deep/40 text-cream" onClick={() => move(-1)} aria-label="Previous slide"><ChevronLeft /></Button>
        <div className="flex gap-1.5" aria-label={`Slide ${active + 1} of ${slides.length}`}>
          {slides.map((item, index) => <button key={item[0]} aria-label={`Show slide ${index + 1}`} onClick={() => { setPlaying(false); setActive(index); }} className={`h-2 rounded-full transition-all ${index === active ? "w-7 bg-sun" : "w-2 bg-cream/60"}`} />)}
        </div>
        <Button size="icon" variant="outline" className="border-cream/50 bg-deep/40 text-cream" onClick={() => move(1)} aria-label="Next slide"><ChevronRight /></Button>
        <Button size="icon" variant="outline" className="border-cream/50 bg-deep/40 text-cream" onClick={() => setPlaying((value) => !value)} aria-label={playing ? "Pause slides" : "Play slides"}>{playing ? <Pause /> : <Play />}</Button>
      </div>
    </section>
  );
}