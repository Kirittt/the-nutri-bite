import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, Leaf, MessageCircle, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { CategoryIcon } from "@/components/site/icons";
import { ProductCard } from "@/components/site/ProductCard";
import { formatINR, getCategory, getProduct, productsIn } from "@/data/catalog";
import { BRAND } from "@/data/catalog";
import { useCart } from "@/lib/cart";

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
        <div className="grid aspect-square place-items-center rounded-3xl bg-linear-to-br from-softgreen to-beige">
          <CategoryIcon name={cat?.icon ?? "cookie"} className="size-28 text-primary/25" />
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
