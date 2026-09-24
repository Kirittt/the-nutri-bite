import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { ProductCard } from "@/components/site/ProductCard";
import { getCategory, getSubcategoryLabel, productsInSubcategory } from "@/data/catalog";

export const Route = createFileRoute("/shop/$category_/$subcategory")({
  loader: ({ params }) => {
    const category = getCategory(params.category);
    const subcategory = getSubcategoryLabel(params.category, params.subcategory);
    if (!category || !subcategory) throw notFound();
    return { category, subcategory, items: productsInSubcategory(category.slug, subcategory) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Not found — The Nutri Bite™" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.subcategory} ${loaderData.category.name} — The Nutri Bite™`;
    const description = `Shop ${loaderData.subcategory} from our ${loaderData.category.name} collection.`;
    return { meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ] };
  },
  component: SubcategoryPage,
});

function SubcategoryPage() {
  const { category, subcategory, items } = Route.useLoaderData();
  return (
    <main className="container-page section-y">
      <nav className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <Link to="/shop" className="hover:text-primary">Shop</Link><span>/</span>
        <Link to="/shop/$category" params={{ category: category.slug }} className="hover:text-primary">{category.name}</Link><span>/</span>
        <span>{subcategory}</span>
      </nav>
      <p className="mt-8 text-sm font-bold uppercase text-leaf">{category.name}</p>
      <h1 className="mt-2 font-display text-4xl text-primary">{subcategory}</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">Explore every {subcategory.toLowerCase()} option currently available in this collection.</p>
      {items.length > 0 ? (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((product) => <ProductCard key={product.slug} product={product} />)}
        </div>
      ) : (
        <div className="mt-10 border border-border bg-softgreen p-8 text-center">
          <p className="font-display text-xl text-primary">This flavour is arriving soon.</p>
          <p className="mt-2 text-sm text-muted-foreground">Please check back or ask us on WhatsApp for availability.</p>
        </div>
      )}
    </main>
  );
}