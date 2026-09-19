import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { CategoryIcon } from "@/components/site/icons";
import { ProductCard } from "@/components/site/ProductCard";
import { getCategory, productsIn } from "@/data/catalog";

export const Route = createFileRoute("/shop/$category")({
  loader: ({ params }) => {
    const category = getCategory(params.category);
    if (!category) throw notFound();
    return { category, items: productsIn(category.slug) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Not found — The Nutri Bite" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.category.name} — The Nutri Bite`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.category.blurb },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.category.blurb },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category, items } = Route.useLoaderData();

  return (
    <div className="container-page section-y">
      <nav className="text-xs text-muted-foreground">
        <Link to="/shop" className="hover:text-primary">
          Shop
        </Link>
        <span className="px-2">/</span>
        <span>{category.name}</span>
      </nav>

      <div className="mt-4 flex items-center gap-4">
        <span className="grid size-14 place-items-center rounded-2xl bg-softgreen">
          <CategoryIcon name={category.icon} className="size-7 text-leaf" />
        </span>
        <div>
          <h1 className="font-display text-3xl text-primary">{category.name}</h1>
          <p className="text-sm text-muted-foreground">{category.blurb}</p>
        </div>
      </div>

      {items.length ? (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      ) : (
        <p className="mt-10 rounded-2xl bg-softgreen p-8 text-center text-muted-foreground">
          Products in this collection are arriving soon.
        </p>
      )}
    </div>
  );
}
