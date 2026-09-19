import { ArrowLeft, ArrowRight, Pause, Play, Star } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

const reviews = [
  ["Aarav Shah", "Ahmedabad", "Fresh, balanced flavours and beautiful packing. The family finished the box much faster than expected."],
  ["Diya Patel", "Gandhinagar", "The dry-fruit bites felt rich without being heavy. A lovely option for evening tea."],
  ["Krisha Mehta", "Mehsana", "Crunchy almonds, neat packing and prompt help on WhatsApp. I will order again."],
  ["Rohan Desai", "Vadodara", "The trail mix is easy to carry and tastes genuinely fresh."],
  ["Anaya Joshi", "Surat", "The gift assortment looked thoughtful and everyone enjoyed the variety."],
  ["Vivaan Iyer", "Mumbai", "Spicy almonds have a bold flavour without overpowering the nutty taste."],
  ["Mira Kulkarni", "Pune", "Activated almonds were crisp, clean-tasting and ideal for my morning routine."],
  ["Arjun Nair", "Chennai", "The edamame had a satisfying crunch and the seasoning was excellent."],
  ["Ishita Rao", "Bengaluru", "A colourful, flavourful snack selection that arrived carefully packed."],
  ["Kabir Singh", "Delhi", "The protein bars are filling and convenient for workdays."],
  ["Saanvi Gupta", "Jaipur", "Natural sweets with a homemade character and premium ingredients."],
  ["Reyansh Verma", "Lucknow", "The cashews were crisp and evenly seasoned. Very enjoyable."],
  ["Aadhya Menon", "Kochi", "Loved the freshness and the simple, careful presentation."],
  ["Dhruv Kapoor", "Chandigarh", "A dependable gifting choice with flavours for every age group."],
  ["Myra Reddy", "Hyderabad", "The berry mix is tangy, bright and perfect for travel."],
  ["Advik Bose", "Kolkata", "Each pack felt fresh and thoughtfully prepared."],
  ["Kiara Jain", "Indore", "The laddus have a wonderful texture and just the right sweetness."],
  ["Vihaan Mishra", "Bhopal", "The nut mixes make a satisfying afternoon snack."],
  ["Aarohi Soni", "Rajkot", "Fast assistance, careful packing and genuinely tasty products."],
  ["Atharv Trivedi", "Nashik", "The smoky flavours are distinct and pair beautifully with the nuts."],
  ["Navya Chawla", "Noida", "A polished experience from selection to delivery."],
  ["Ayaan Malhotra", "Gurugram", "The protein booster mix is now a regular desk snack."],
  ["Prisha Das", "Bhubaneswar", "Fresh ingredients and an impressive range of flavours."],
  ["Arnav Pillai", "Coimbatore", "The roasted edamame is light, crunchy and very moreish."],
  ["Anvi Agarwal", "Nagpur", "The assorted bites made a warm and memorable gift."],
  ["Shaurya Patel", "Anand", "Clear pack options, quick support and excellent taste."],
  ["Riya Shah", "Nadiad", "The anjeer bites taste premium and are easy to serve."],
  ["Dev Mehta", "Udaipur", "Well-seasoned cashews and a noticeably fresh crunch."],
  ["Tara Bhat", "Mangaluru", "The fruit mix is colourful, lively and thoughtfully balanced."],
  ["Neil Parmar", "Bhavnagar", "Handmade quality comes through in every bite."],
] as const;

function ReviewCard({ name, city, body }: { name: string; city: string; body: string }) {
  return (
    <article className="w-[280px] shrink-0 border-t-4 border-sun bg-background p-6 shadow-soft sm:w-[340px]">
      <div className="flex gap-1 text-sun" aria-label="5 out of 5 stars">{[1, 2, 3, 4, 5].map((star) => <Star key={star} className="size-4 fill-current" />)}</div>
      <p className="mt-5 leading-relaxed">“{body}”</p>
      <p className="mt-5 font-semibold text-primary">{name}</p>
      <p className="text-sm text-muted-foreground">{city}, India</p>
    </article>
  );
}

export function ReviewCarousel() {
  const [playing, setPlaying] = useState(true);
  const [leftward, setLeftward] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const moving = playing && !reducedMotion;
  const trackStyle: React.CSSProperties = {
    animationPlayState: moving ? "running" : "paused",
    animationDirection: leftward ? "normal" : "reverse",
  };

  return (
    <section className="overflow-hidden bg-beige" aria-labelledby="customer-notes-title">
      <div className="container-page section-y">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="text-sm font-bold uppercase text-leaf">Shared with warmth</p>
            <h2 id="customer-notes-title" className="mt-2 font-display text-3xl text-primary sm:text-4xl">Happy bites across India</h2>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={() => setLeftward(true)} aria-label="Move testimonials left"><ArrowLeft /></Button>
            <Button variant="outline" size="icon" onClick={() => setPlaying((value) => !value)} aria-label={playing ? "Pause testimonials" : "Play testimonials"}>{playing ? <Pause /> : <Play />}</Button>
            <Button variant="outline" size="icon" onClick={() => setLeftward(false)} aria-label="Move testimonials right"><ArrowRight /></Button>
          </div>
        </div>
      </div>
      <div
        className="pb-4"
        onMouseEnter={() => setPlaying(false)}
        onMouseLeave={() => setPlaying(true)}
      >
        <div className="testimonial-marquee flex w-max gap-4 px-2" style={trackStyle}>
          {[...reviews, ...reviews].map(([name, city, body], position) => (
            <ReviewCard key={`${name}-${position}`} name={name} city={city} body={body} />
          ))}
        </div>
      </div>
    </section>
  );
}
