import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { getProduct } from "@/data/catalog";

const checkoutSchema = z.object({
  customerName: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(8).max(20),
  email: z.string().email().max(200),
  addressLine: z.string().trim().min(5).max(300),
  city: z.string().trim().min(2).max(100),
  state: z.string().trim().min(2).max(100),
  pinCode: z.string().trim().min(4).max(10),
  notes: z.string().trim().max(500).optional(),
  items: z.array(z.object({ slug: z.string(), variant: z.string(), qty: z.number().int().min(1).max(20) })).min(1).max(50),
});

export const createOrder = createServerFn({ method: "POST" })
  .inputValidator((input) => checkoutSchema.parse(input))
  .handler(async ({ data }) => {
    const lineItems = data.items.map((item) => {
      const product = getProduct(item.slug);
      const variant = product?.variants.find((entry) => entry.label === item.variant);
      if (!product || variant?.price == null) throw new Error("One of these products is not currently orderable.");
      return { ...item, productName: product.name, unitPrice: variant.price, lineTotal: variant.price * item.qty };
    });
    const subtotal = lineItems.reduce((sum, item) => sum + item.lineTotal, 0);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: order, error } = await supabaseAdmin.from("orders").insert({
      user_id: null,
      customer_name: data.customerName,
      phone: data.phone,
      email: data.email,
      address: { line1: data.addressLine, city: data.city, state: data.state, pinCode: data.pinCode, country: "India" },
      notes: data.notes ?? null,
      subtotal,
      total: subtotal,
    }).select("id, order_number").single();
    if (error || !order) throw new Error("We could not save your order. Please call or WhatsApp us.");
    const rows = lineItems.map((item) => ({
      order_id: order.id,
      product_slug: item.slug,
      product_name: item.productName,
      variant_label: item.variant,
      unit_price: item.unitPrice,
      quantity: item.qty,
      line_total: item.lineTotal,
    }));
    const { error: itemError } = await supabaseAdmin.from("order_items").insert(rows);
    if (itemError) throw new Error("We could not save your order items. Please contact us.");
    return { orderNumber: order.order_number, subtotal };
  });

export const getMyOrders = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase.from("orders").select("order_number,status,total,tracking_number,tracking_url,created_at").order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  });

export const getAdminOverview = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: allowed } = await context.supabase.rpc("is_store_admin", { _user_id: context.userId });
    if (!allowed) throw new Error("Administrator access required.");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const [{ data: orders }, { data: products }, { data: reviews }, { data: banners }] = await Promise.all([
      supabaseAdmin.from("orders").select("id,order_number,customer_name,phone,status,total,created_at").order("created_at", { ascending: false }).limit(100),
      supabaseAdmin.from("store_products").select("id,slug,name,status,best_seller,new_launch,product_variants(id,label,price,stock,active)").order("name"),
      supabaseAdmin.from("reviews").select("id,customer_name,rating,title,body,status,is_demo,store_products(name)").order("created_at", { ascending: false }).limit(100),
      supabaseAdmin.from("site_banners").select("id,title,subtitle,active,sort_order").order("sort_order"),
    ]);
    return { orders: orders ?? [], products: products ?? [], reviews: reviews ?? [], banners: banners ?? [] };
  });

const orderStatuses = ["pending_confirmation","confirmed","processing","packed","ready_to_ship","shipped","out_for_delivery","delivered","cancelled","return_requested","returned","refunded"] as const;
export const updateOrderStatus = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ id: z.string().uuid(), status: z.enum(orderStatuses) }).parse(input))
  .handler(async ({ data, context }) => { const { data: allowed } = await context.supabase.rpc("is_store_admin", { _user_id: context.userId }); if (!allowed) throw new Error("Administrator access required."); const { error } = await context.supabase.from("orders").update({ status: data.status }).eq("id", data.id); if (error) throw error; return { ok: true }; });

export const moderateReview = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ id: z.string().uuid(), status: z.enum(["approved","rejected","hidden"]) }).parse(input))
  .handler(async ({ data, context }) => { const { data: allowed } = await context.supabase.rpc("is_store_admin", { _user_id: context.userId }); if (!allowed) throw new Error("Administrator access required."); const { error } = await context.supabase.from("reviews").update({ status: data.status }).eq("id", data.id); if (error) throw error; return { ok: true }; });

export const updateBanner = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ id: z.string().uuid(), active: z.boolean() }).parse(input))
  .handler(async ({ data, context }) => { const { data: allowed } = await context.supabase.rpc("is_store_admin", { _user_id: context.userId }); if (!allowed) throw new Error("Administrator access required."); const { error } = await context.supabase.from("site_banners").update({ active: data.active }).eq("id", data.id); if (error) throw error; return { ok: true }; });

export const updateVariantPrice = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ id: z.string().uuid(), price: z.number().int().nonnegative().nullable() }).parse(input))
  .handler(async ({ data, context }) => {
    const { data: allowed } = await context.supabase.rpc("is_store_admin", { _user_id: context.userId });
    if (!allowed) throw new Error("Administrator access required.");
    const { error } = await context.supabase.from("product_variants").update({ price: data.price }).eq("id", data.id);
    if (error) throw error;
    return { ok: true };
  });