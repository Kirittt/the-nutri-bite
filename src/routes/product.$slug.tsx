import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, Heart, Leaf, MessageCircle, ShoppingBag, Sparkles, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { CategoryIcon } from "@/components/site/icons";
import { ProductCard } from "@/components/site/ProductCard";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { formatINR, getCategory, getProduct, productsIn } from "@/data/catalog";
import { BRAND } from "@/data/catalog";
import { useCart } from "@/lib/cart";
import { getProductImage } from "@/data/catalog-images";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return {
      product,
      related: productsIn(product.category)
        .filter((p) => p.slug !== product.slug)
        .slice(0, 4),
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Not found — The Nutri Bite" }, { name: "robots", content: "noindex" }],
      };
    }
    const { product } = loaderData;
    const title = `${product.name} — The Nutri Bite`;
    return {
      meta: [
        { title },
        { name: "description", content: product.tagline },
        { property: "og:title", content: title },
        { property: "og:description", content: product.tagline },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product, related } = Route.useLoaderData();
  const cat = getCategory(product.category);
  const { add } = useCart();
  const firstPriced = product.variants.findIndex((v) => v.price !== null);
  const [selected, setSelected] = useState(firstPriced === -1 ? 0 : firstPriced);
  const variant = product.variants[selected];
  const image = getProductImage(product.slug, product.category);

  return (
    <div className="container-page section-y">
      <nav className="text-xs text-muted-foreground">
        <Link to="/shop" className="hover:text-primary">
          Shop
        </Link>
        <span className="px-2">/</span>
        {cat && (
          <Link to="/shop/$category" params={{ category: cat.slug }} className="hover:text-primary">
            {cat.name}
          </Link>
        )}
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div className="group grid aspect-square place-items-center overflow-hidden rounded-lg bg-linear-to-br from-softgreen to-beige">
          {image ? <img src={image} alt={product.name} className="size-full object-cover transition-transform duration-500 group-hover:scale-105" width={1200} height={900} /> : <CategoryIcon name={cat?.icon ?? "cookie"} className="size-28 text-primary/25 transition-transform group-hover:scale-110" />}
        </div>

        <div>
          <h1 className="font-display text-4xl text-primary">{product.name}</h1>
          <p className="mt-2 text-lg text-muted-foreground">{product.tagline}</p>

          {product.variants.length > 0 ? (
            <>
              <div className="mt-8">
                <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                  Pack size
                </span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.variants.map((v, i) => (
                    <button
                      key={v.label}
                      onClick={() => setSelected(i)}
                      disabled={v.price === null}
                      className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${
                        i === selected
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background hover:border-primary"
                      } disabled:cursor-not-allowed disabled:opacity-45`}
                    >
                      {v.label}
                      {v.price === null && (
                        <span className="ml-1.5 text-[0.65rem] uppercase">soon</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 text-3xl font-bold text-primary">
                {variant?.price !== null && variant
                  ? formatINR(variant.price)
                  : "Price coming soon"}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  disabled={!variant || variant.price === null}
                  onClick={() => {
                    if (!variant || variant.price === null) return;
                    add({
                      slug: product.slug,
                      name: product.name,
                      variant: variant.label,
                      price: variant.price,
                    });
                    toast.success(`${product.name} (${variant.label}) added to cart`);
                  }}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-soft transition-colors hover:bg-deep disabled:opacity-50"
                >
                  <ShoppingBag className="size-5" /> Add to cart
                </button>
                <a
                  href={BRAND.whatsapp}
                  className="inline-flex items-center gap-2 rounded-xl border border-primary px-6 py-3 font-semibold text-primary hover:bg-softgreen"
                >
                  <MessageCircle className="size-5" /> WhatsApp us
                </a>
              </div>
            </>
          ) : (
            <p className="mt-8 rounded-2xl bg-softgreen p-5 text-sm">
              This product is launching soon. Message us on WhatsApp to be told first.
            </p>
          )}

          <p className="mt-8 leading-relaxed">{product.description}</p>

          {product.highlights && (
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {product.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2 text-sm">
                  <Check className="size-4 text-leaf" /> {h}
                </li>
              ))}
            </ul>
          )}

          {product.ingredients.length > 0 && (
            <div className="mt-8 rounded-2xl border border-border p-5">
              <h2 className="flex items-center gap-2 font-display text-lg">
                <Leaf className="size-4 text-leaf" /> Ingredients
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {product.ingredients.join(", ")}
              </p>
            </div>
          )}

          {product.note && (
            <p className="mt-4 text-xs text-muted-foreground italic">{product.note}</p>
          )}
        </div>
      </div>

      <section className="mt-16 grid gap-6 lg:grid-cols-3">
        <div className="rounded-lg bg-softgreen p-6"><Sparkles className="text-leaf" /><h2 className="mt-3 font-display text-xl text-primary">Why you’ll enjoy it</h2><ul className="mt-3 space-y-2 text-sm text-muted-foreground"><li>• Thoughtfully selected ingredients</li><li>• Convenient packs for home, work or travel</li><li>• Satisfying flavour and texture</li></ul></div>
        <div className="rounded-lg bg-beige p-6"><Heart className="text-primary" /><h2 className="mt-3 font-display text-xl text-primary">Made with care</h2><ul className="mt-3 space-y-2 text-sm text-muted-foreground"><li>• Neat and hygienic preparation</li><li>• Handmade in carefully managed batches</li><li>• Checked and packed with extra care and love</li></ul></div>
        <div className="rounded-lg border border-border p-6"><div className="flex gap-1 text-sun">{[1,2,3,4,5].map((n)=><Star key={n} className="size-4 fill-current" />)}</div><h2 className="mt-3 font-display text-xl text-primary">“Fresh, flavourful and beautifully packed.”</h2><p className="mt-3 text-sm text-muted-foreground">A representative customer-style testimonial while verified reviews are collected.</p><span className="mt-4 inline-block rounded-full bg-muted px-2 py-1 text-[0.65rem] font-bold uppercase">Sample review — not included in ratings</span></div>
      </section>

      <section className="mt-16 grid gap-10 border-y border-border py-14 lg:grid-cols-[.85fr_1.15fr]">
        <div><p className="text-sm font-bold uppercase text-leaf">Need help choosing?</p><h2 className="mt-2 font-display text-3xl text-primary">Questions about {product.name}</h2><p className="mt-4 text-muted-foreground">Our team can help with pack sizes, ingredients, gifting quantities and delivery before you order.</p><div className="mt-6 flex flex-wrap gap-3"><Button asChild size="lg"><a href={BRAND.whatsapp}><MessageCircle /> Ask on WhatsApp</a></Button><Button asChild size="lg" variant="outline"><a href={`tel:${BRAND.phoneHref}`}>Call {BRAND.phone}</a></Button></div></div>
        <Accordion type="single" collapsible className="border-t border-border">
          <AccordionItem value="freshness"><AccordionTrigger>How is this product prepared and packed?</AccordionTrigger><AccordionContent className="text-muted-foreground">It is prepared in carefully managed batches, handled hygienically, checked and packed by hand with extra care.</AccordionContent></AccordionItem>
          <AccordionItem value="storage"><AccordionTrigger>How should I store it?</AccordionTrigger><AccordionContent className="text-muted-foreground">Keep the pack sealed in a cool, dry place away from direct sunlight. After opening, close it securely and follow any storage directions printed on the pack.</AccordionContent></AccordionItem>
          <AccordionItem value="ingredients"><AccordionTrigger>Where can I check ingredients and allergens?</AccordionTrigger><AccordionContent className="text-muted-foreground">The ingredient list is shown above. Please check the delivered pack before eating and contact us if you have a food allergy or dietary concern.</AccordionContent></AccordionItem>
          <AccordionItem value="bulk"><AccordionTrigger>Can I order this for gifting or in bulk?</AccordionTrigger><AccordionContent className="text-muted-foreground">Yes. Pack selection and availability depend on quantity. Send us your required quantity and date on WhatsApp for options.</AccordionContent></AccordionItem>
        </Accordion>
      </section>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display text-2xl text-primary">You may also like</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
