import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

const KEY = "nutribite-cookie-choice-v1";
export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  useEffect(() => setVisible(!localStorage.getItem(KEY)), []);
  if (!visible) return null;
  const choose = (value: string) => { localStorage.setItem(KEY, value); setVisible(false); };
  return <aside className="fixed inset-x-3 bottom-3 z-[70] mx-auto max-w-3xl rounded-lg border border-border bg-background p-5 shadow-lift" aria-label="Cookie preferences"><div className="flex flex-col gap-4 sm:flex-row sm:items-center"><div className="flex-1"><h2 className="font-display text-xl text-primary">Your cookie choice</h2><p className="mt-1 text-sm text-muted-foreground">Essential storage keeps your cart working. You can allow optional experience cookies too. <Link to="/cookie-policy" className="underline">Read our policy</Link>.</p></div><div className="flex shrink-0 gap-2"><Button variant="outline" onClick={() => choose("essential")}>Essential only</Button><Button onClick={() => choose("all")}>Allow all</Button></div></div></aside>;
}