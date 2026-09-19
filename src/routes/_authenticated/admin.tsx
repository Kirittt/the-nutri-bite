import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Package, RefreshCw, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatINR } from "@/data/catalog";
import { getAdminOverview, updateVariantPrice } from "@/lib/store.functions";

type Overview = Awaited<ReturnType<typeof getAdminOverview>>;
export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Store Manager — The Nutri Bite" }, { name: "description", content: "Private product and order management for The Nutri Bite." }, { property: "og:title", content: "Store Manager — The Nutri Bite" }, { property: "og:description", content: "Private store administration." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, { name: "robots", content: "noindex" }] }),
  component: AdminPage,
});
function AdminPage() {
  const [data, setData] = useState<Overview | null>(null); const [error, setError] = useState("");
  const load = () => getAdminOverview().then(setData).catch((reason: unknown) => setError(reason instanceof Error ? reason.message : "Access unavailable."));
  useEffect(() => { void load(); }, []);
  if (error) return <div className="container-page section-y max-w-xl"><ShieldCheck className="size-10 text-primary" /><h1 className="mt-4 font-display text-4xl text-primary">Administrator access required</h1><p className="mt-3 text-muted-foreground">This area is restricted to invited store managers.</p></div>;
  if (!data) return <div className="container-page section-y">Loading store manager…</div>;
  return <div className="container-page section-y"><div className="flex items-center justify-between"><div><p className="text-sm font-bold text-leaf uppercase">Private workspace</p><h1 className="font-display text-4xl text-primary">Store manager</h1></div><Button variant="outline" size="icon" onClick={load} aria-label="Refresh"><RefreshCw /></Button></div>
    <div className="mt-8 grid gap-8 lg:grid-cols-2"><section><h2 className="font-display text-2xl">Recent orders</h2><div className="mt-4 space-y-3">{data.orders.length ? data.orders.map((order) => <article key={order.id} className="rounded-lg border border-border p-4"><div className="flex items-center justify-between"><strong>{order.order_number}</strong><Badge variant="secondary" className="capitalize">{order.status.replaceAll("_", " ")}</Badge></div><p className="mt-2 text-sm">{order.customer_name} • {order.phone}</p><p className="mt-1 text-sm font-semibold text-primary">{formatINR(order.total)}</p></article>) : <p className="rounded-lg bg-softgreen p-6 text-muted-foreground">No orders yet.</p>}</div></section>
    <section><h2 className="font-display text-2xl">Products & prices</h2><div className="mt-4 max-h-[44rem] space-y-3 overflow-y-auto pr-1">{data.products.map((product) => <article key={product.id} className="rounded-lg border border-border p-4"><div className="flex items-center gap-2"><Package className="size-4 text-leaf" /><strong>{product.name}</strong><Badge variant="outline" className="ml-auto">{product.status}</Badge></div><div className="mt-3 space-y-2">{product.product_variants.map((variant) => <form key={variant.id} className="flex items-center gap-2" onSubmit={async (event) => { event.preventDefault(); const raw = new FormData(event.currentTarget).get("price"); const price = raw === "" ? null : Number(raw); try { await updateVariantPrice({ data: { id: variant.id, price } }); toast.success(`${product.name} price updated`); load(); } catch { toast.error("Price could not be updated."); } }}><span className="w-24 text-sm text-muted-foreground">{variant.label}</span><Input name="price" type="number" min="0" step="1" defaultValue={variant.price ?? ""} placeholder="Coming soon" /><Button type="submit" size="sm">Save</Button></form>)}</div></article>)}</div></section></div>
  </div>;
}