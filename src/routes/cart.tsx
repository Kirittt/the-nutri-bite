import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import { BRAND, formatINR } from "@/data/catalog";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — The Nutri Bite" },
      { name: "description", content: "Review the handcrafted sweets and snacks in your cart." },
      { property: "og:title", content: "Your Cart — The Nutri Bite" },
      { property: "og:description", content: "Review your Nutri Bite selection before ordering." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, setQty, remove, subtotal, clear } = useCart();

  const whatsappOrder =
    "https://wa.me/918487879935?text=" +
    encodeURIComponent(
      "Hello The Nutri Bite, I would like to order:\n" +
        items.map((i) => `• ${i.name} (${i.variant}) x${i.qty}`).join("\n") +
        `\nTotal: ${formatINR(subtotal)}`,
    );

  return (
    <div className="container-page section-y">
      <h1 className="font-display text-4xl text-primary">Your Cart</h1>

      {items.length === 0 ? (
        <div className="mt-10 grid place-items-center rounded-3xl bg-softgreen p-16 text-center">
          <ShoppingBag className="size-10 text-primary/40" />
          <p className="mt-4 text-muted-foreground">Your cart is empty.</p>
          <Link
            to="/shop"
            className="mt-6 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground"
          >
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_20rem]">
          <ul className="divide-y divide-border rounded-2xl border border-border">
            {items.map((i) => (
              <li key={`${i.slug}-${i.variant}`} className="flex flex-wrap items-center gap-4 p-4">
                <div className="min-w-40 flex-1">
                  <Link
                    to="/product/$slug"
                    params={{ slug: i.slug }}
                    className="font-medium hover:text-primary"
                  >
                    {i.name}
                  </Link>
                  <p className="text-xs text-muted-foreground">{i.variant}</p>
                </div>
                <div className="flex items-center gap-1 rounded-lg border border-border">
                  <button
                    className="p-2"
                    aria-label="Decrease quantity"
                    onClick={() => setQty(i.slug, i.variant, i.qty - 1)}
                  >
                    <Minus className="size-4" />
                  </button>
                  <span className="w-6 text-center text-sm">{i.qty}</span>
                  <button
                    className="p-2"
                    aria-label="Increase quantity"
                    onClick={() => setQty(i.slug, i.variant, i.qty + 1)}
                  >
                    <Plus className="size-4" />
                  </button>
                </div>
                <div className="w-20 text-right font-semibold">{formatINR(i.price * i.qty)}</div>
                <button
                  className="p-2 text-muted-foreground hover:text-destructive"
                  aria-label="Remove item"
                  onClick={() => remove(i.slug, i.variant)}
                >
                  <Trash2 className="size-4" />
                </button>
              </li>
            ))}
          </ul>

          <aside className="h-fit rounded-2xl border border-border bg-softgreen p-6">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span className="font-bold">{formatINR(subtotal)}</span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Shipping and taxes are confirmed when we take your order.
            </p>
            <a
              href={whatsappOrder}
              className="mt-5 block rounded-xl bg-primary px-5 py-3 text-center font-semibold text-primary-foreground hover:bg-deep"
            >
              Place order on WhatsApp
            </a>
            <a
              href={`tel:${BRAND.phoneHref}`}
              className="mt-2 block rounded-xl border border-primary px-5 py-3 text-center font-semibold text-primary"
            >
              Call {BRAND.phone}
            </a>
            <button onClick={clear} className="mt-4 w-full text-xs text-muted-foreground underline">
              Clear cart
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}
