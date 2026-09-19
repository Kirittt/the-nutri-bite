import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PackageCheck, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getMyOrders } from "@/lib/store.functions";
import { supabase } from "@/integrations/supabase/client";
import { formatINR } from "@/data/catalog";

type Order = Awaited<ReturnType<typeof getMyOrders>>[number];
export const Route = createFileRoute("/_authenticated/account")({
  head: () => ({ meta: [{ title: "My Orders — The Nutri Bite" }, { name: "description", content: "Review your Nutri Bite orders and delivery updates." }, { property: "og:title", content: "My Orders — The Nutri Bite" }, { property: "og:description", content: "Private customer order history." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, { name: "robots", content: "noindex" }] }),
  component: AccountPage,
});
function AccountPage() {
  const navigate = useNavigate(); const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => { getMyOrders().then(setOrders).catch(() => setOrders([])); }, []);
  return <div className="container-page section-y"><div className="flex items-center justify-between"><div><h1 className="font-display text-4xl text-primary">My orders</h1><p className="mt-2 text-muted-foreground">Confirmed orders and delivery progress.</p></div><Button variant="outline" onClick={async () => { await supabase.auth.signOut(); navigate({ to: "/auth", replace: true }); }}>Sign out</Button></div>
    <div className="mt-8 grid gap-3">{orders.length ? orders.map((order) => <article key={order.order_number} className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border p-5"><div className="flex gap-3"><PackageCheck className="text-leaf" /><div><h2 className="font-semibold">{order.order_number}</h2><p className="text-sm capitalize text-muted-foreground">{order.status.replaceAll("_", " ")}</p></div></div><div className="text-right"><strong>{formatINR(order.total)}</strong><p className="text-xs text-muted-foreground">{new Date(order.created_at).toLocaleDateString("en-IN")}</p></div></article>) : <div className="rounded-lg bg-softgreen p-10 text-center text-muted-foreground">No account-linked orders yet.</div>}</div>
  </div>;
}