import { useServerFn } from "@tanstack/react-start";
import { Mail } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { subscribeNewsletter } from "@/lib/store.functions";

export function NewsletterForm() {
  const subscribe = useServerFn(subscribeNewsletter);
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    try {
      const result = await subscribe({ data: { email } });
      toast.success(result.existing ? "You’re already subscribed." : "You’re subscribed. Welcome!");
      setEmail("");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "We couldn’t save your email.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="grid w-full max-w-xl gap-2 sm:grid-cols-[minmax(12rem,1fr)_auto]">
      <label htmlFor="newsletter-email" className="sr-only">Email address</label>
      <input id="newsletter-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Your email address" className="h-11 min-w-0 rounded-md border border-cream/30 bg-background px-4 text-foreground outline-none focus:border-sun focus:ring-2 focus:ring-sun/30" />
      <Button type="submit" size="lg" disabled={busy} className="h-11 w-full bg-sun text-accent-foreground hover:bg-gold"><Mail /> {busy ? "Subscribing…" : "Subscribe by email"}</Button>
    </form>
  );
}