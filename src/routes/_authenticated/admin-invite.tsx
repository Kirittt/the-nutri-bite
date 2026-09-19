import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin-invite")({
  validateSearch: (search) => z.object({ token: z.string().optional() }).parse(search),
  head: () => ({ meta: [{ title: "Accept Store Invitation — The Nutri Bite" }, { name: "description", content: "Private one-time store manager invitation." }, { property: "og:title", content: "Accept Store Invitation — The Nutri Bite" }, { property: "og:description", content: "Private invitation." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, { name: "robots", content: "noindex" }] }),
  component: InvitePage,
});
function InvitePage() {
  const search = Route.useSearch(); const navigate = useNavigate(); const [token, setToken] = useState(search.token ?? ""); const [busy, setBusy] = useState(false);
  return <div className="container-page section-y max-w-md"><div className="rounded-lg border border-border p-7"><h1 className="font-display text-4xl text-primary">Store manager invitation</h1><p className="mt-3 text-sm text-muted-foreground">Enter the private, single-use invitation code. It expires automatically and cannot be reused.</p><form className="mt-6 space-y-4" onSubmit={async (event)=>{event.preventDefault();setBusy(true);const {data,error}=await supabase.rpc("claim_admin_invitation",{_token:token});setBusy(false);if(error||!data){toast.error("This invitation is invalid, expired or already used.");return;}toast.success("Store manager access granted.");navigate({to:"/admin"});}}><div><Label htmlFor="token">Invitation code</Label><Input id="token" value={token} onChange={(event)=>setToken(event.target.value)} required className="mt-1" autoComplete="off" /></div><Button className="w-full" disabled={busy}>{busy?"Checking invitation…":"Accept invitation"}</Button></form></div></div>;
}