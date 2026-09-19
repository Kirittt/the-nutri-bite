import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CartItem = {
  slug: string;
  name: string;
  variant: string;
  price: number;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (slug: string, variant: string) => void;
  setQty: (slug: string, variant: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "nutribite-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const value = useMemo<CartContextValue>(() => {
    const key = (s: string, v: string) => `${s}__${v}`;
    return {
      items,
      add: (item, qty = 1) =>
        setItems((prev) => {
          const found = prev.find((i) => key(i.slug, i.variant) === key(item.slug, item.variant));
          if (found) {
            return prev.map((i) =>
              i === found ? { ...i, qty: Math.min(i.qty + qty, 99) } : i,
            );
          }
          return [...prev, { ...item, qty }];
        }),
      remove: (slug, variant) =>
        setItems((prev) => prev.filter((i) => key(i.slug, i.variant) !== key(slug, variant))),
      setQty: (slug, variant, qty) =>
        setItems((prev) =>
          qty <= 0
            ? prev.filter((i) => key(i.slug, i.variant) !== key(slug, variant))
            : prev.map((i) =>
                key(i.slug, i.variant) === key(slug, variant) ? { ...i, qty: Math.min(qty, 99) } : i,
              ),
        ),
      clear: () => setItems([]),
      count: items.reduce((n, i) => n + i.qty, 0),
      subtotal: items.reduce((n, i) => n + i.qty * i.price, 0),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
