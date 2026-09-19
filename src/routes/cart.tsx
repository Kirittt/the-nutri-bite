import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BRAND, formatINR } from "@/data/catalog";
import { useCart } from "@/lib/cart";
import { createOrder } from "@/lib/store.functions";

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
  const [checkout, setCheckout] = useState(false);
  const [busy, setBusy] = useState(false);
  const [confirmation, setConfirmation] = useState<string | null>(null);

  const whatsappOrder =
    "https://wa.me/918487879935?text=" +
    encodeURIComponent(
      "Hello The Nutri Bite, I would like to order:\n" +
        items.map((i) => `• ${i.name} (${i.variant}) x${i.qty}`).join("\n") +
        `\nTotal: ${formatINR(subtotal)}`,
    );

  async function placeOrder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setBusy(true);
    try {
      const result = await createOrder({ data: {
        customerName: String(form.get("name") ?? ""), phone: String(form.get("phone") ?? ""),
        email: String(form.get("email") ?? ""), addressLine: String(form.get("address") ?? ""),
        city: String(form.get("city") ?? ""), state: String(form.get("state") ?? ""),
        pinCode: String(form.get("pin") ?? ""), notes: String(form.get("notes") ?? ""),
        items: items.map((item) => ({ slug: item.slug, variant: item.variant, qty: item.qty })),
      }});
      setConfirmation(result.orderNumber);
      clear();
    } catch (error) { toast.error(error instanceof Error ? error.message : "Could not save your order."); }
    finally { setBusy(false); }
  }

  return (
    <div className="container-page section-y">
      <h1 className="font-display text-4xl text-primary">Your Cart</h1>

      {confirmation ? <div className="mt-10 rounded-lg bg-softgreen p-10 text-center"><h2 className="font-display text-3xl text-primary">Order saved</h2><p className="mt-3">Your reference is <strong>{confirmation}</strong>.</p><p className="mt-2 text-sm text-muted-foreground">Send it to our team to confirm delivery and payment.</p><a href={BRAND.whatsapp} className="mt-6 inline-flex rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground">Confirm on WhatsApp</a></div> : items.length === 0 ? (
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
            <Button className="mt-5 w-full" onClick={() => setCheckout(true)}>Save order & continue</Button>
            <a href={whatsappOrder} className="mt-2 block text-center text-xs text-primary underline">Or send cart directly on WhatsApp</a>
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
      {checkout && items.length > 0 && <div className="fixed inset-0 z-50 grid place-items-center bg-deep/60 p-4" role="dialog" aria-modal="true" aria-label="Delivery details"><form onSubmit={placeOrder} className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-lg bg-background p-6 shadow-lift"><div className="flex items-center justify-between"><h2 className="font-display text-3xl text-primary">Delivery details</h2><Button type="button" variant="ghost" size="icon" onClick={() => setCheckout(false)} aria-label="Close"><Trash2 className="rotate-45" /></Button></div><p className="mt-1 text-sm text-muted-foreground">No online payment now. Our team will confirm your order personally.</p><div className="mt-5 grid gap-4 sm:grid-cols-2"><div><Label htmlFor="name">Full name</Label><Input id="name" name="name" required /></div><div><Label htmlFor="phone">Phone</Label><Input id="phone" name="phone" type="tel" required /></div><div className="sm:col-span-2"><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" required /></div><div className="sm:col-span-2"><Label htmlFor="address">Address</Label><Input id="address" name="address" required /></div><div><Label htmlFor="city">City</Label><Input id="city" name="city" required /></div><div><Label htmlFor="state">State</Label><Input id="state" name="state" required defaultValue="Gujarat" /></div><div><Label htmlFor="pin">PIN code</Label><Input id="pin" name="pin" required /></div><div><Label htmlFor="notes">Order note</Label><Input id="notes" name="notes" /></div></div><Button type="submit" className="mt-6 w-full" disabled={busy}>{busy ? "Saving order…" : `Save order • ${formatINR(subtotal)}`}</Button></form></div>}
    </div>
  );
}
