import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { lovable } from "@/integrations/lovable";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({ meta: [{ title: "Sign in — The Nutri Bite" }, { name: "description", content: "Sign in to view your Nutri Bite orders and delivery updates." }, { property: "og:title", content: "Sign in — The Nutri Bite" }, { property: "og:description", content: "Access your orders and delivery updates." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [signUp, setSignUp] = useState(false);
  const [busy, setBusy] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(event: React.FormEvent) {
    event.preventDefault(); setBusy(true);
    const result = signUp ? await supabase.auth.signUp({ email, password }) : await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (result.error) { toast.error(result.error.message); return; }
    if (signUp) toast.success("Check your email to confirm your account.");
    else navigate({ to: "/account" });
  }

  return <div className="container-page section-y max-w-md">
    <div className="rounded-lg border border-border bg-card p-7 shadow-soft">
      <h1 className="font-display text-4xl text-primary">{signUp ? "Create your account" : "Welcome back"}</h1>
      <p className="mt-2 text-sm text-muted-foreground">View saved orders, delivery progress and addresses.</p>
      <Button variant="outline" className="mt-6 w-full" onClick={() => lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin + "/auth" })}>Continue with Google</Button>
      <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" />or email<span className="h-px flex-1 bg-border" /></div>
      <form onSubmit={submit} className="space-y-4">
        <div><Label htmlFor="email">Email</Label><Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1" /></div>
        <div><Label htmlFor="password">Password</Label><Input id="password" type="password" minLength={8} required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1" /></div>
        <Button type="submit" className="w-full" disabled={busy}>{busy ? "Please wait…" : signUp ? "Create account" : "Sign in"}</Button>
      </form>
      <button className="mt-5 w-full text-sm text-primary underline" onClick={() => setSignUp((value) => !value)}>{signUp ? "Already have an account? Sign in" : "New here? Create an account"}</button>
      <p className="mt-5 text-center text-xs text-muted-foreground">You can always order as a guest. <Link to="/shop" className="underline">Continue shopping</Link></p>
    </div>
  </div>;
}