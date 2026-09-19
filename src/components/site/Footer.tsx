import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import logo from "@/assets/nutri-bite-logo.png.asset.json";
import brochure from "@/assets/the-nutri-bite-brochure.pdf.asset.json";
import { BRAND, categories } from "@/data/catalog";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="mt-16 bg-deep text-cream">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_.8fr_.9fr_1.2fr_1fr]">
        <div className="max-w-sm">
          <div className="flex items-center gap-3">
            <img
              src={logo.url}
              alt="The Nutri Bite"
              className="size-16 rounded-full bg-background object-contain p-1 transition duration-300 hover:scale-105 hover:rotate-2"
              loading="lazy"
            />
            <span className="font-display text-xl">The Nutri Bite</span>
          </div>
          <p className="mt-4 text-sm text-cream/75">
            Nature’s goodness in every bite. Handcrafted and hygienically prepared, then packed
            with extra care and love.
          </p>
          <a href={brochure.url} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 font-semibold text-sun transition-transform hover:translate-x-1 hover:text-cream"><BookOpen className="size-4" /> View our brochure <ArrowRight className="size-4" /></a>
        </div>

        <div>
          <h3 className="font-display text-lg">Shop</h3>
          <ul className="mt-4 space-y-2 text-sm text-cream/75">
            {categories.slice(0, 7).map((c) => (
              <li key={c.slug}>
                <Link to="/shop/$category" params={{ category: c.slug }} className="hover:text-sun">
                  {c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/shop" className="hover:text-sun">
                View all
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg">Company</h3>
          <ul className="mt-4 space-y-2 text-sm text-cream/75">
            <li>
              <Link to="/our-story" className="hover:text-sun">
                Our Story
              </Link>
            </li>
            <li>
              <Link to="/our-process" className="hover:text-sun">
                Our Process
              </Link>
            </li>
            <li><Link to="/about-us" className="hover:text-sun">About Us</Link></li>
            <li>
              <Link to="/bulk-orders" className="hover:text-sun">
                Bulk / Corporate / Private Label
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-sun">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg">Reach us</h3>
          <ul className="mt-4 space-y-3 text-sm text-cream/75">
            <li>
              <a href={`tel:${BRAND.phoneHref}`} className="flex items-center gap-2 hover:text-sun">
                <Phone className="size-4" /> {BRAND.phone}
              </a>
            </li>
            <li>
              <a href={BRAND.whatsapp} className="flex items-center gap-2 hover:text-sun">
                <MessageCircle className="size-4" /> WhatsApp us
              </a>
            </li>
            <li>
              <a href={BRAND.instagram} className="flex items-center gap-2 hover:text-sun">
                <Instagram className="size-4" /> @the_nutribite
              </a>
            </li>
            <li className="flex gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0" />
              <span>
                <strong className="block text-cream">Office</strong>
                {BRAND.office}
              </span>
            </li>
            <li className="flex gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0" />
              <span>
                <strong className="block text-cream">Factory</strong>
                {BRAND.factory}
              </span>
            </li>
          </ul>
        </div>
        <div className="sm:col-span-2 lg:col-span-5 border-t border-cream/15 pt-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div><h3 className="font-display text-2xl">Subscribe now</h3><p className="mt-1 text-sm text-cream/70">Get new launch updates and special collection news on WhatsApp.</p></div>
            <Button asChild size="lg" className="bg-sun text-accent-foreground hover:bg-gold"><a href={`${BRAND.whatsapp}&text=${encodeURIComponent("Please subscribe me to The Nutri Bite updates.")}`} target="_blank" rel="noreferrer"><Mail /> Subscribe on WhatsApp</a></Button>
          </div>
        </div>
        <div>
          <h3 className="font-display text-lg">Help & policies</h3>
          <ul className="mt-4 space-y-2 text-sm text-cream/75">
            <li><Link to="/faq" className="hover:text-sun">FAQs</Link></li>
            <li><Link to="/shipping-policy" className="hover:text-sun">Shipping policy</Link></li>
            <li><Link to="/return-refund-policy" className="hover:text-sun">Returns & refunds</Link></li>
            <li><Link to="/cancellation-policy" className="hover:text-sun">Cancellation policy</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-sun">Privacy policy</Link></li>
            <li><Link to="/terms-and-conditions" className="hover:text-sun">Terms & conditions</Link></li>
            <li><Link to="/cookie-policy" className="hover:text-sun">Cookie policy</Link></li>
            <li><Link to="/product-disclaimer" className="hover:text-sun">Product disclaimer</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/15">
        <div className="container-page flex flex-wrap items-center justify-between gap-3 py-5 text-xs text-cream/60">
          <span>© {new Date().getFullYear()} The Nutri Bite — Healthy Bite, Happy Life.</span>
          <span>Handmade • Hygienically prepared • Packed with care</span>
        </div>
      </div>
    </footer>
  );
}
