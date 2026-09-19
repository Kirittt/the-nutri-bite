import { Pause, Play, Star } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function ProductReviews({ name }: { name: string }) {
  const [paused, setPaused] = useState(false);
  const reviews = [
    ["Aarav", "Ahmedabad", `I enjoyed ${name} with my afternoon tea. A nice change from my usual snacks.`],
    ["Diya", "Pune", `We shared ${name} at home and liked the flavour. I would choose a bigger pack next time.`],
    ["Meera", "Mumbai", `${name} made a lovely addition to our snack table. Easy to share with friends.`],
    ["Rohan", "Gandhinagar", `I tried ${name} during a work break. It was a pleasant little treat in a busy day.`],
  ];
  return (
    <section className="mt-12 overflow-hidden border-y border-border py-8" aria-label="Illustrative product reviews">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div><h2 className="font-display text-2xl text-primary">A few words about {name}</h2><p className="mt-2 text-sm text-muted-foreground">Illustrative reviews — fictional examples, not customer feedback.</p></div>
        <Button variant="outline" size="icon" aria-label={paused ? "Play product reviews" : "Pause product reviews"} onClick={() => setPaused(!paused)}>{paused ? <Play /> : <Pause />}</Button>
      </div>
      <div className="product-review-track flex w-max hover:[animation-play-state:paused]" style={{ animationPlayState: paused ? "paused" : undefined }}>
        {[0, 1].map((copy) => <div key={copy} className="flex" aria-hidden={copy === 1 ? true : undefined}>
          {reviews.map(([person, city, body]) => <div key={person} className="w-[19rem] shrink-0 px-2 sm:w-[24rem]">
            <article className="h-full rounded-lg border border-border bg-softgreen p-6">
              <div className="flex gap-1 text-sun" aria-label="Illustrative five-star rating">{[0, 1, 2, 3, 4].map((star) => <Star key={star} className="size-4 fill-current" />)}</div>
              <p className="mt-4 leading-relaxed">“{body}”</p><p className="mt-5 font-semibold text-primary">{person}</p><p className="text-sm text-muted-foreground">{city}, India</p>
            </article>
          </div>)}
        </div>)}
      </div>
    </section>
  );
}