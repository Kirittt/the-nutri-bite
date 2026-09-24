import { Link } from "@tanstack/react-router";
import { BookHeart, ChevronDown, ChevronRight, Factory, Menu, Phone, ShoppingBag, Store, UserRound, UsersRound, X } from "lucide-react";
import { useEffect, useState } from "react";

import logo from "@/assets/nutri-bite-logo.png.asset.json";
import { BRAND, categories, categorySubcategories, getProductForSubcategory, productsIn, subcategorySlug } from "@/data/catalog";
import { useCart } from "@/lib/cart";
import { supabase } from "@/integrations/supabase/client";
import { CategoryIcon } from "./icons";
import { Button } from "@/components/ui/button";

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
  { to: "/bulk-orders", label: "Bulk / Corporate" },
  { to: "/contact", label: "Contact" },
] as const;

const aboutLinks = [
  { to: "/our-story", label: "Our Story", body: "Why we started", icon: BookHeart },
  { to: "/our-process", label: "Our Process", body: "How every batch is made", icon: Factory },
  { to: "/about-us", label: "About Us", body: "Meet The Nutri Bite™", icon: UsersRound },
] as const;

export function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileCategory, setMobileCategory] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState(categories[0]?.slug ?? "");
  const selectedCategory = categories.find((category) => category.slug === activeCategory) ?? categories[0];
  const activeIndex = Math.max(0, categories.findIndex((category) => category.slug === selectedCategory?.slug));
  const bulletColor = activeIndex % 2 === 0 ? "bg-leaf" : "bg-sun";
  const selectedSweetProducts = selectedCategory?.slug === "natural-sweets-bites" ? productsIn(selectedCategory.slug) : [];
  const [userId, setUserId] = useState<string | null>(null);
  useEffect(() => {
    void supabase.auth.getUser().then(({ data }) => setUserId(data.user?.id ?? null));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => setUserId(session?.user.id ?? null));
    return () => listener.subscription.unsubscribe();
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

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

          <Link to="/" className="group flex items-center gap-3">
             <img src={logo.url} alt="The Nutri Bite™" className="size-14 object-contain transition-transform duration-300 group-hover:scale-105 group-hover:rotate-2" />
            <span className="hidden text-sm leading-tight sm:block">
               <span className="block font-display text-lg text-primary">The Nutri Bite™</span>
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
              <Link to="/shop" className="inline-flex items-center gap-1 hover:text-primary">
                Shop <ChevronDown className="size-3.5" />
              </Link>
              {shopOpen && (
                <div className="absolute top-full left-1/2 w-[56rem] -translate-x-1/2 pt-4">
                  <div className="grid grid-cols-[19rem_1fr] overflow-hidden border border-border bg-popover shadow-lift">
                    <div className="grid max-h-[31rem] overflow-y-auto border-r border-border p-2">
                      {categories.map((c, index) => (
                        <button key={c.slug} type="button" onMouseEnter={() => setActiveCategory(c.slug)} onFocus={() => setActiveCategory(c.slug)} onClick={() => setActiveCategory(c.slug)} className={`flex items-center gap-3 p-3 text-left transition-all ${activeCategory === c.slug ? index % 2 === 0 ? "bg-softgreen text-primary" : "bg-beige text-deep" : "hover:bg-muted"}`}>
                          <CategoryIcon name={c.icon} className={`size-5 shrink-0 ${index % 2 === 0 ? "text-leaf" : "text-sun"}`} />
                          <span className="text-sm font-semibold">{c.name}</span>
                          <ChevronDown className="ml-auto size-3 -rotate-90" />
                        </button>
                      ))}
                    </div>
                    {selectedCategory && <div className="p-6"><div className="flex items-start gap-4"><span className="grid size-12 shrink-0 place-items-center bg-softgreen"><CategoryIcon name={selectedCategory.icon} className={`size-6 ${activeIndex % 2 === 0 ? "text-leaf" : "text-sun"}`} /></span><div><h3 className="font-display text-2xl text-primary">{selectedCategory.name}</h3><p className="mt-1 text-sm text-muted-foreground">{selectedCategory.blurb}</p></div></div><div className="mt-6 grid max-h-72 grid-cols-2 gap-x-6 gap-y-2 overflow-y-auto pr-2">{selectedCategory.slug === "natural-sweets-bites" ? selectedSweetProducts.map((product) => <Link key={product.slug} to="/product/$slug" params={{ slug: product.slug }} onClick={() => setShopOpen(false)} className="group/item flex items-center gap-3 px-2 py-2 text-sm transition-transform hover:translate-x-1 hover:text-primary"><span className={`size-2.5 shrink-0 rotate-45 rounded-[2px] transition-transform group-hover/item:rotate-[135deg] ${bulletColor}`} />{product.name}</Link>) : (categorySubcategories[selectedCategory.slug] ?? []).map((item) => { const product = getProductForSubcategory(selectedCategory.slug, item); return product ? <Link key={item} to="/product/$slug" params={{ slug: product.slug }} onClick={() => setShopOpen(false)} className="group/item flex items-center gap-3 px-2 py-2 text-sm transition-transform hover:translate-x-1 hover:text-primary"><span className={`size-2.5 shrink-0 rotate-45 rounded-[2px] transition-transform group-hover/item:rotate-[135deg] ${bulletColor}`} />{item}</Link> : <Link key={item} to="/shop/$category/$subcategory" params={{ category: selectedCategory.slug, subcategory: subcategorySlug(item) }} onClick={() => setShopOpen(false)} className="group/item flex items-center gap-3 px-2 py-2 text-sm transition-transform hover:translate-x-1 hover:text-primary"><span className={`size-2.5 shrink-0 rotate-45 rounded-[2px] transition-transform group-hover/item:rotate-[135deg] ${bulletColor}`} />{item}</Link>; })}</div><Link to="/shop/$category" params={{ category: selectedCategory.slug }} onClick={() => setShopOpen(false)} className="mt-6 inline-flex items-center gap-2 bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-deep"><Store className="size-4" /> Shop all {selectedCategory.name}</Link></div>}
                  </div>
                </div>
              )}
            </div>
            <div className="relative" onMouseEnter={() => setAboutOpen(true)} onMouseLeave={() => setAboutOpen(false)}>
              <button type="button" className="flex items-center gap-1 hover:text-primary" onClick={() => setAboutOpen((value) => !value)}>About <ChevronDown className="size-3.5" /></button>
               {aboutOpen && <div className="absolute top-full left-1/2 w-72 -translate-x-1/2 pt-4"><div className="border border-border bg-popover p-2 shadow-lift">{aboutLinks.map((item, index) => <Link key={item.to} to={item.to} onClick={() => setAboutOpen(false)} className={`group flex gap-3 p-3 transition-colors ${index % 2 === 0 ? "hover:bg-softgreen" : "hover:bg-beige"}`}><item.icon className={`mt-0.5 size-5 ${index % 2 === 0 ? "text-leaf" : "text-sun"}`} /><span><span className="block font-semibold transition-transform group-hover:translate-x-1">{item.label}</span><span className="text-xs text-muted-foreground">{item.body}</span></span></Link>)}</div></div>}
            </div>
            {navLinks.map((l) => (
              <Link key={l.to} to={l.to} className="transition-transform hover:-translate-y-0.5 hover:text-primary">
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
            {userId ? <Link to="/account" className="rounded-full p-2 hover:bg-softgreen" aria-label="View account"><UserRound className="size-5" /></Link> : <Link to="/auth" className="rounded-full p-2 hover:bg-softgreen" aria-label="Sign in or view account"><UserRound className="size-5" /></Link>}
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
        <div className="fixed inset-x-0 top-29 bottom-0 overflow-y-auto overscroll-contain border-b border-border bg-background lg:hidden">
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
            {userId ? <Link to="/account" onClick={() => setOpen(false)} className="py-2 font-medium">My account</Link> : <Link to="/auth" onClick={() => setOpen(false)} className="py-2 font-medium">Sign in / Account</Link>}
            <p className="pt-3 text-xs font-bold uppercase text-muted-foreground">About</p>
             {aboutLinks.map((item, index) => <Link key={item.to} to={item.to} onClick={() => setOpen(false)} className="flex items-center gap-2 py-2 pl-3 font-medium"><item.icon className={`size-4 ${index % 2 === 0 ? "text-leaf" : "text-sun"}`} />{item.label}</Link>)}
             <p className="pt-3 text-xs font-bold uppercase text-muted-foreground">Shop collections</p>
             <div className="grid gap-2 pb-2">
              {categories.map((c, categoryIndex) => (
                <div key={c.slug} className="border border-border bg-softgreen px-3 py-3 odd:bg-softgreen even:bg-beige">
                   <Button type="button" variant="ghost" onClick={() => setMobileCategory((value) => value === c.slug ? null : c.slug)} className="h-auto w-full justify-start p-0 text-xs font-semibold"><CategoryIcon name={c.icon} className={`size-4 ${categoryIndex % 2 === 0 ? "text-leaf" : "text-sun"}`} />{c.name}<ChevronRight className={`ml-auto transition-transform ${mobileCategory === c.slug ? "rotate-90" : ""}`} /></Button>
                   {mobileCategory === c.slug && <div className="mt-3 grid gap-2 border-t border-border pt-3">{c.slug === "natural-sweets-bites" ? productsIn(c.slug).map((product) => <Link key={product.slug} to="/product/$slug" params={{ slug: product.slug }} onClick={() => setOpen(false)} className="flex items-center gap-2 text-xs text-muted-foreground"><span className={`size-1.5 rotate-45 rounded-[1px] ${categoryIndex % 2 === 0 ? "bg-leaf" : "bg-sun"}`} />{product.name}</Link>) : (categorySubcategories[c.slug] ?? []).map((item) => { const product = getProductForSubcategory(c.slug, item); return product ? <Link key={item} to="/product/$slug" params={{ slug: product.slug }} onClick={() => setOpen(false)} className="flex items-center gap-2 text-xs text-muted-foreground"><span className={`size-1.5 rotate-45 rounded-[1px] ${categoryIndex % 2 === 0 ? "bg-leaf" : "bg-sun"}`} />{item}</Link> : <Link key={item} to="/shop/$category/$subcategory" params={{ category: c.slug, subcategory: subcategorySlug(item) }} onClick={() => setOpen(false)} className="flex items-center gap-2 text-xs text-muted-foreground"><span className={`size-1.5 rotate-45 rounded-[1px] ${categoryIndex % 2 === 0 ? "bg-leaf" : "bg-sun"}`} />{item}</Link>; })}<Link to="/shop/$category" params={{ category: c.slug }} onClick={() => setOpen(false)} className="mt-1 text-xs font-bold text-primary">View all {c.name}</Link></div>}
                </div>
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
