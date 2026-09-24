import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BRAND, formatINR, getProduct } from "@/data/catalog";
import { useCart } from "@/lib/cart";
import { createOrder } from "@/lib/store.functions";
import { getProductImage } from "@/data/catalog-images";

type CheckoutFields = "name" | "phone" | "email" | "address" | "city" | "state" | "pin";
type CheckoutErrors = Partial<Record<CheckoutFields, string>>;

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — The Nutri Bite" },
      { name: "description", content: "Review the handcrafted sweets and snacks in your cart." },
      { property: "og:title", content: "Your Cart — The Nutri Bite" },
      { property: "og:description", content: "Review your Nutri Bite selection before ordering." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
  const [confirmedItems, setConfirmedItems] = useState(items);
  const [confirmedSubtotal, setConfirmedSubtotal] = useState(0);
  const [errors, setErrors] = useState<CheckoutErrors>({});

  useEffect(() => {
    document.body.style.overflow = checkout ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [checkout]);

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
    const values = {
      name: String(form.get("name") ?? "").trim(), phone: String(form.get("phone") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(), address: String(form.get("address") ?? "").trim(),
      city: String(form.get("city") ?? "").trim(), state: String(form.get("state") ?? "").trim(),
      pin: String(form.get("pin") ?? "").trim(),
    };
    const nextErrors: CheckoutErrors = {};
    if (values.name.length < 2) nextErrors.name = "Please enter your full name.";
    if (!/^[6-9]\d{9}$/.test(values.phone.replace(/\s/g, ""))) nextErrors.phone = "Enter a valid 10-digit Indian phone number.";
    if (!/^\S+@\S+\.\S+$/.test(values.email)) nextErrors.email = "Enter a valid email address.";
    if (values.address.length < 5) nextErrors.address = "Please enter at least 5 characters for your address.";
    if (values.city.length < 2) nextErrors.city = "Please enter your city.";
    if (values.state.length < 2) nextErrors.state = "Please enter your state.";
    if (!/^\d{6}$/.test(values.pin)) nextErrors.pin = "Enter a valid 6-digit PIN code.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setBusy(true);
    try {
      const result = await createOrder({ data: {
        customerName: values.name, phone: values.phone, email: values.email, addressLine: values.address,
        city: values.city, state: values.state, pinCode: values.pin, notes: String(form.get("notes") ?? ""),
        items: items.map((item) => ({ slug: item.slug, variant: item.variant, qty: item.qty })),
      }});
      setConfirmedItems(items);
      setConfirmedSubtotal(result.subtotal);
      setConfirmation(result.orderNumber);
      setCheckout(false);
      clear();
    } catch { toast.error("We could not save your order. Please check your details and try again."); }
    finally { setBusy(false); }
  }

  return (
    <div className="container-page section-y">
      <h1 className="font-display text-4xl text-primary">Your Cart</h1>

      {confirmation ? <div className="mt-10 mx-auto max-w-3xl overflow-hidden rounded-lg border border-border bg-card shadow-lift"><div className="bg-softgreen p-8 text-center"><h2 className="font-display text-3xl text-primary">Order saved</h2><p className="mt-3">Your reference is <strong>{confirmation}</strong>.</p><p className="mt-2 text-sm text-muted-foreground">Review your order and send it to our team to confirm delivery and payment.</p></div><div className="divide-y divide-border">{confirmedItems.map((item)=>{const product=getProduct(item.slug);const image=getProductImage(item.slug,product?.category ?? "");return <div key={`${item.slug}-${item.variant}`} className="flex items-center gap-4 p-4">{image ? <img src={image} alt="" className="size-16 rounded-md bg-softgreen object-cover" width={64} height={64} /> : <span className="size-16 rounded-md bg-softgreen" />}<div className="min-w-0 flex-1"><p className="font-semibold">{item.name}</p><p className="text-xs text-muted-foreground">{item.variant} • Quantity {item.qty}</p></div><strong>{formatINR(item.price * item.qty)}</strong></div>})}</div><div className="flex items-center justify-between border-t border-border p-5"><span className="font-semibold">Order total</span><strong className="text-xl text-primary">{formatINR(confirmedSubtotal)}</strong></div><div className="p-5 pt-0"><a href={`https://wa.me/${BRAND.phoneHref.replace("+", "")}?text=${encodeURIComponent(`Hello The Nutri Bite, please confirm order ${confirmation}.\n${confirmedItems.map((item)=>`• ${item.name} (${item.variant}) x${item.qty} — ${formatINR(item.price * item.qty)}`).join("\n")}\nTotal: ${formatINR(confirmedSubtotal)}`)}`} className="flex w-full justify-center rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground">Confirm on WhatsApp</a></div></div> : items.length === 0 ? (
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
                {(() => { const product = getProduct(i.slug); const image = getProductImage(i.slug, product?.category ?? ""); return image ? <img src={image} alt="" className="size-16 rounded-md bg-softgreen object-cover" loading="lazy" width={64} height={64} /> : <span className="size-16 rounded-md bg-softgreen" />; })()}
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
                  <X className="size-4" />
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
       {checkout && items.length > 0 && <div className="fixed inset-0 z-60 grid place-items-center overflow-y-auto overscroll-contain bg-deep/60 p-4" role="dialog" aria-modal="true" aria-label="Delivery details"><form onSubmit={placeOrder} noValidate className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-lg bg-background p-6 shadow-lift"><div className="flex items-center justify-between"><h2 className="font-display text-3xl text-primary">Delivery details</h2><Button type="button" variant="ghost" size="icon" onClick={() => setCheckout(false)} aria-label="Close"><X /></Button></div><p className="mt-1 text-sm text-muted-foreground">No online payment now. Our team will confirm your order personally.</p><div className="mt-5 grid gap-4 sm:grid-cols-2">{([['name','Full name','text'],['phone','Phone','tel'],['email','Email','email'],['address','Address','text'],['city','City','text'],['state','State','text'],['pin','PIN code','text']] as const).map(([name,label,type])=><div key={name} className={name === 'email' || name === 'address' ? 'sm:col-span-2' : ''}><Label htmlFor={name}>{label}</Label><Input id={name} name={name} type={type} defaultValue={name === 'state' ? 'Gujarat' : undefined} aria-invalid={Boolean(errors[name])} className={errors[name] ? 'border-destructive focus-visible:ring-destructive' : ''} onChange={()=>setErrors((current)=>({...current,[name]:undefined}))} />{errors[name] && <p className="mt-1 text-xs text-destructive">{errors[name]}</p>}</div>)}<div><Label htmlFor="notes">Order note</Label><Input id="notes" name="notes" /></div></div><Button type="submit" className="mt-6 w-full" disabled={busy}>{busy ? "Saving order…" : `Save order • ${formatINR(subtotal)}`}</Button></form></div>}
    </div>
  );
}
