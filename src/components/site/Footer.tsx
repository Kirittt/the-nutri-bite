import { Link } from "@tanstack/react-router";
import { Instagram, MapPin, MessageCircle, Phone } from "lucide-react";

import logo from "@/assets/nutri-bite-logo.png.asset.json";
import { BRAND, categories } from "@/data/catalog";

export function Footer() {
  return (
    <footer className="mt-16 bg-deep text-cream">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <img
              src={logo.url}
              alt="The Nutri Bite"
              className="size-16 rounded-full bg-white object-contain p-1"
              loading="lazy"
            />
            <span className="font-display text-xl">The Nutri Bite</span>
          </div>
          <p className="mt-4 text-sm text-cream/75">
            Nature’s goodness in every bite. Handcrafted and hygienically prepared, then packed
            with extra care and love.
          </p>
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
      </div>
      <div className="border-t border-cream/15">
        <div className="container-page py-5 text-xs text-cream/60">
          © {new Date().getFullYear()} The Nutri Bite — Healthy Bite, Happy Life.
        </div>
      </div>
    </footer>
  );
}
