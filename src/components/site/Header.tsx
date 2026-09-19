import { Link } from "@tanstack/react-router";
import { Menu, Phone, ShoppingBag, UserRound, X } from "lucide-react";
import { useEffect, useState } from "react";

import logo from "@/assets/nutri-bite-logo.png.asset.json";
import { BRAND, categories } from "@/data/catalog";
import { useCart } from "@/lib/cart";
import { CategoryIcon } from "./icons";

const messages = [
  "Handcrafted With Care",
  "Pure • Natural • Wholesome",
  "Small Bite. Big Benefits.",
  "Healthy Bite, Happy Life.",
];

function AnnouncementBar() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % messages.length), 4000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="bg-deep text-cream">
      <div className="container-page flex h-9 items-center justify-center text-center text-xs tracking-[0.18em] uppercase">
        {messages[i]}
      </div>
    </div>
  );
}

const navLinks = [
  { to: "/best-sellers", label: "Best Sellers" },
  { to: "/new-launches", label: "New Launches" },
  { to: "/our-story", label: "Our Story" },
  { to: "/our-process", label: "Our Process" },
  { to: "/bulk-orders", label: "Bulk / Corporate" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <AnnouncementBar />
      <div className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container-page flex h-20 items-center gap-4">
          <button
            className="-ml-2 rounded-md p-2 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Open menu"
          >
            {open ? <Menu className="size-5" /> : <Menu className="size-5" />}
          </button>

          <Link to="/" className="flex items-center gap-3">
            <img src={logo.url} alt="The Nutri Bite" className="size-14 object-contain" />
            <span className="hidden text-sm leading-tight sm:block">
              <span className="block font-display text-lg text-primary">The Nutri Bite</span>
              <span className="block text-[0.7rem] tracking-wide text-muted-foreground">
                Healthy Bite, Happy Life
              </span>
            </span>
          </Link>

          <nav className="ml-auto hidden items-center gap-6 text-sm font-medium lg:flex">
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
            <div
              className="relative"
              onMouseEnter={() => setShopOpen(true)}
              onMouseLeave={() => setShopOpen(false)}
            >
              <Link to="/shop" className="hover:text-primary">
                Shop
              </Link>
              {shopOpen && (
                <div className="absolute top-full left-1/2 w-[46rem] -translate-x-1/2 pt-4">
                  <div className="grid grid-cols-3 gap-1 rounded-2xl border border-border bg-popover p-4 shadow-lift">
                    {categories.map((c) => (
                      <Link
                        key={c.slug}
                        to="/shop/$category"
                        params={{ category: c.slug }}
                        className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-softgreen"
                        onClick={() => setShopOpen(false)}
                      >
                        <CategoryIcon name={c.icon} className="mt-0.5 size-5 text-leaf" />
                        <span>
                          <span className="block text-sm font-semibold">{c.name}</span>
                          <span className="block text-xs text-muted-foreground">{c.blurb}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {navLinks.map((l) => (
              <Link key={l.to} to={l.to} className="hover:text-primary">
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-1 lg:ml-4">
            <a
              href={`tel:${BRAND.phoneHref}`}
              className="hidden rounded-full p-2 text-primary hover:bg-softgreen sm:block"
              aria-label="Call us"
            >
              <Phone className="size-5" />
            </a>
            <Link to="/auth" className="rounded-full p-2 hover:bg-softgreen" aria-label="Sign in or view account">
              <UserRound className="size-5" />
            </Link>
            <Link to="/cart" className="relative rounded-full p-2 hover:bg-softgreen" aria-label="Cart">
              <ShoppingBag className="size-5" />
              {count > 0 && (
                <span className="absolute top-0 right-0 grid size-5 place-items-center rounded-full bg-sun text-[0.65rem] font-bold text-accent-foreground">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {open && (
        <div className="border-b border-border bg-background lg:hidden">
          <div className="container-page grid gap-1 py-4">
            <div className="flex items-center justify-between">
              <span className="text-xs tracking-widest uppercase text-muted-foreground">Menu</span>
              <button onClick={() => setOpen(false)} aria-label="Close menu">
                <X className="size-5" />
              </button>
            </div>
            <Link to="/" onClick={() => setOpen(false)} className="py-2 font-medium">
              Home
            </Link>
            <Link to="/shop" onClick={() => setOpen(false)} className="py-2 font-medium">
              Shop All
            </Link>
            <Link to="/auth" onClick={() => setOpen(false)} className="py-2 font-medium">Sign in / Account</Link>
            <div className="grid grid-cols-2 gap-1 pb-2">
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  to="/shop/$category"
                  params={{ category: c.slug }}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-lg bg-softgreen px-3 py-2 text-xs"
                >
                  <CategoryIcon name={c.icon} className="size-4 text-leaf" />
                  {c.name}
                </Link>
              ))}
            </div>
            {navLinks.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="py-2 font-medium">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
