CREATE TYPE public.app_role AS ENUM ('customer', 'staff', 'admin', 'super_admin');
CREATE TYPE public.order_status AS ENUM ('pending_confirmation', 'confirmed', 'processing', 'packed', 'ready_to_ship', 'shipped', 'out_for_delivery', 'delivered', 'cancelled', 'return_requested', 'returned', 'refunded');
CREATE TYPE public.review_status AS ENUM ('pending', 'approved', 'rejected', 'hidden');

CREATE TABLE public.profiles (
  id uuid PRIMARY KEY,
  full_name text,
  phone text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles own read" ON public.profiles FOR SELECT TO authenticated USING (id = auth.uid());
CREATE POLICY "profiles own insert" ON public.profiles FOR INSERT TO authenticated WITH CHECK (id = auth.uid());
CREATE POLICY "profiles own update" ON public.profiles FOR UPDATE TO authenticated USING (id = auth.uid()) WITH CHECK (id = auth.uid());

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "roles own read" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;

CREATE OR REPLACE FUNCTION public.is_store_admin(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT public.has_role(_user_id, 'admin') OR public.has_role(_user_id, 'super_admin')
$$;
GRANT EXECUTE ON FUNCTION public.is_store_admin(uuid) TO authenticated, service_role;

CREATE TABLE public.admin_invitations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  token_hash text NOT NULL UNIQUE,
  role public.app_role NOT NULL DEFAULT 'admin',
  expires_at timestamptz NOT NULL,
  used_at timestamptz,
  used_by uuid,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.admin_invitations TO authenticated;
GRANT ALL ON public.admin_invitations TO service_role;
ALTER TABLE public.admin_invitations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins manage invitations" ON public.admin_invitations FOR ALL TO authenticated USING (public.is_store_admin(auth.uid())) WITH CHECK (public.is_store_admin(auth.uid()));

CREATE TABLE public.addresses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  label text NOT NULL DEFAULT 'Home',
  full_name text NOT NULL,
  phone text NOT NULL,
  address_line_1 text NOT NULL,
  address_line_2 text,
  apartment text,
  landmark text,
  city text NOT NULL,
  state text NOT NULL,
  pin_code text NOT NULL,
  country text NOT NULL DEFAULT 'India',
  is_default boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.addresses TO authenticated;
GRANT ALL ON public.addresses TO service_role;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "addresses own read" ON public.addresses FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "addresses own insert" ON public.addresses FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "addresses own update" ON public.addresses FOR UPDATE TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "addresses own delete" ON public.addresses FOR DELETE TO authenticated USING (user_id = auth.uid());

CREATE TABLE public.store_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  blurb text NOT NULL DEFAULT '',
  icon text NOT NULL DEFAULT 'cookie',
  image_url text,
  sort_order integer NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.store_categories TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.store_categories TO authenticated;
GRANT ALL ON public.store_categories TO service_role;
ALTER TABLE public.store_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public active categories" ON public.store_categories FOR SELECT TO anon, authenticated USING (active OR public.is_store_admin(auth.uid()));
CREATE POLICY "admins manage categories" ON public.store_categories FOR ALL TO authenticated USING (public.is_store_admin(auth.uid())) WITH CHECK (public.is_store_admin(auth.uid()));

CREATE TABLE public.store_products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  category_slug text NOT NULL,
  name text NOT NULL,
  subcategory text,
  tagline text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  ingredients text[] NOT NULL DEFAULT '{}',
  highlights text[] NOT NULL DEFAULT '{}',
  benefits text[] NOT NULL DEFAULT '{}',
  how_to_enjoy text,
  allergens text[] NOT NULL DEFAULT '{}',
  image_url text,
  gallery_urls text[] NOT NULL DEFAULT '{}',
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active','coming-soon','draft')),
  best_seller boolean NOT NULL DEFAULT false,
  new_launch boolean NOT NULL DEFAULT false,
  needs_review boolean NOT NULL DEFAULT false,
  note text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.store_products TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.store_products TO authenticated;
GRANT ALL ON public.store_products TO service_role;
ALTER TABLE public.store_products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public active products" ON public.store_products FOR SELECT TO anon, authenticated USING (status IN ('active','coming-soon') OR public.is_store_admin(auth.uid()));
CREATE POLICY "admins manage products" ON public.store_products FOR ALL TO authenticated USING (public.is_store_admin(auth.uid())) WITH CHECK (public.is_store_admin(auth.uid()));
CREATE INDEX store_products_category_idx ON public.store_products(category_slug);

CREATE TABLE public.product_variants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES public.store_products(id) ON DELETE CASCADE,
  label text NOT NULL,
  sku text,
  price integer CHECK (price IS NULL OR price >= 0),
  compare_price integer CHECK (compare_price IS NULL OR compare_price >= 0),
  stock integer NOT NULL DEFAULT 0 CHECK (stock >= 0),
  active boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(product_id, label)
);
GRANT SELECT ON public.product_variants TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.product_variants TO authenticated;
GRANT ALL ON public.product_variants TO service_role;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public active variants" ON public.product_variants FOR SELECT TO anon, authenticated USING (active OR public.is_store_admin(auth.uid()));
CREATE POLICY "admins manage variants" ON public.product_variants FOR ALL TO authenticated USING (public.is_store_admin(auth.uid())) WITH CHECK (public.is_store_admin(auth.uid()));

CREATE SEQUENCE public.order_number_seq START 1;
GRANT USAGE ON SEQUENCE public.order_number_seq TO service_role;
CREATE OR REPLACE FUNCTION public.next_order_number()
RETURNS text LANGUAGE sql VOLATILE SECURITY DEFINER SET search_path = public AS $$
  SELECT 'TNB-' || to_char(now(), 'YYYY') || '-' || lpad(nextval('public.order_number_seq')::text, 6, '0')
$$;
GRANT EXECUTE ON FUNCTION public.next_order_number() TO service_role;

CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text NOT NULL UNIQUE DEFAULT public.next_order_number(),
  user_id uuid,
  guest_access_token_hash text,
  status public.order_status NOT NULL DEFAULT 'pending_confirmation',
  payment_status text NOT NULL DEFAULT 'manual_confirmation_pending',
  customer_name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  address jsonb NOT NULL,
  company_name text,
  gstin text,
  notes text,
  subtotal integer NOT NULL CHECK (subtotal >= 0),
  shipping integer NOT NULL DEFAULT 0 CHECK (shipping >= 0),
  tax integer NOT NULL DEFAULT 0 CHECK (tax >= 0),
  total integer NOT NULL CHECK (total >= 0),
  courier_name text,
  tracking_number text,
  tracking_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.orders TO authenticated;
GRANT ALL ON public.orders TO service_role;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "orders own or admin read" ON public.orders FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.is_store_admin(auth.uid()));
CREATE POLICY "admins update orders" ON public.orders FOR UPDATE TO authenticated USING (public.is_store_admin(auth.uid())) WITH CHECK (public.is_store_admin(auth.uid()));
CREATE INDEX orders_user_idx ON public.orders(user_id);
CREATE INDEX orders_status_idx ON public.orders(status);

CREATE TABLE public.order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id uuid,
  product_slug text NOT NULL,
  product_name text NOT NULL,
  variant_label text NOT NULL,
  unit_price integer NOT NULL CHECK (unit_price >= 0),
  quantity integer NOT NULL CHECK (quantity > 0),
  line_total integer NOT NULL CHECK (line_total >= 0),
  image_url text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.order_items TO authenticated;
GRANT ALL ON public.order_items TO service_role;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "order items owner or admin read" ON public.order_items FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.orders o WHERE o.id = order_id AND (o.user_id = auth.uid() OR public.is_store_admin(auth.uid()))));

CREATE TABLE public.order_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  status public.order_status NOT NULL,
  note text,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.order_events TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.order_events TO authenticated;
GRANT ALL ON public.order_events TO service_role;
ALTER TABLE public.order_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "events owner or admin read" ON public.order_events FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.orders o WHERE o.id = order_id AND (o.user_id = auth.uid() OR public.is_store_admin(auth.uid()))));
CREATE POLICY "admins manage events" ON public.order_events FOR ALL TO authenticated USING (public.is_store_admin(auth.uid())) WITH CHECK (public.is_store_admin(auth.uid()));

CREATE TABLE public.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES public.store_products(id) ON DELETE CASCADE,
  user_id uuid,
  customer_name text NOT NULL,
  rating integer NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title text NOT NULL,
  body text NOT NULL,
  verified_purchase boolean NOT NULL DEFAULT false,
  status public.review_status NOT NULL DEFAULT 'pending',
  featured boolean NOT NULL DEFAULT false,
  is_demo boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.reviews TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.reviews TO authenticated;
GRANT ALL ON public.reviews TO service_role;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public approved reviews" ON public.reviews FOR SELECT TO anon, authenticated USING (status = 'approved' OR user_id = auth.uid() OR public.is_store_admin(auth.uid()));
CREATE POLICY "customers submit reviews" ON public.reviews FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid() AND status = 'pending' AND is_demo = false);
CREATE POLICY "customers edit pending reviews" ON public.reviews FOR UPDATE TO authenticated USING (user_id = auth.uid() AND status = 'pending') WITH CHECK (user_id = auth.uid() AND status = 'pending' AND is_demo = false);
CREATE POLICY "admins manage reviews" ON public.reviews FOR ALL TO authenticated USING (public.is_store_admin(auth.uid())) WITH CHECK (public.is_store_admin(auth.uid()));

CREATE TABLE public.site_banners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subtitle text NOT NULL DEFAULT '',
  image_url text,
  mobile_image_url text,
  cta_text text,
  cta_link text,
  sort_order integer NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_banners TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.site_banners TO authenticated;
GRANT ALL ON public.site_banners TO service_role;
ALTER TABLE public.site_banners ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public active banners" ON public.site_banners FOR SELECT TO anon, authenticated USING (active OR public.is_store_admin(auth.uid()));
CREATE POLICY "admins manage banners" ON public.site_banners FOR ALL TO authenticated USING (public.is_store_admin(auth.uid())) WITH CHECK (public.is_store_admin(auth.uid()));

CREATE TABLE public.site_settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL DEFAULT '{}'::jsonb,
  public_read boolean NOT NULL DEFAULT false,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_settings TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public settings read" ON public.site_settings FOR SELECT TO anon, authenticated USING (public_read OR public.is_store_admin(auth.uid()));
CREATE POLICY "admins manage settings" ON public.site_settings FOR ALL TO authenticated USING (public.is_store_admin(auth.uid())) WITH CHECK (public.is_store_admin(auth.uid()));