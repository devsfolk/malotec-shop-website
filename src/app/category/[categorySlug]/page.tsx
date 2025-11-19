"use client";

import { useRouter } from "next/navigation";
import { getCategoryBySlug, getCategories, getProductsByCategory, categories as allMockCategories } from "@/lib/mock-data";
import { CategorySelector } from "@/components/category-selector";
import { ProductGrid } from "@/components/product-grid";
import { BackButton } from "@/components/back-button";

type CategoryPageProps = {
  params: {
    categorySlug: string;
  };
};

export default function CategoryPage({ params }: CategoryPageProps) {
  const router = useRouter();
  const category = getCategoryBySlug(params.categorySlug);

  if (!category) {
    // Redirect to home if category not found
    router.push("/");
    return null;
  }

  const subCategories = getCategories(category.id);

  if (subCategories.length > 0) {
    return (
      <div className="container px-4 md:px-6 py-8 md:py-12">
        <BackButton />
        <CategorySelector
          categories={subCategories}
          title={`Shop by Brand in ${category.name}`}
        />
      </div>
    );
  }

  const products = getProductsByCategory(category.id);

  return (
    <div className="container px-4 md:px-6 py-8 md:py-12">
      <BackButton />
      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 font-headline">
        {category.name}
      </h1>
      <ProductGrid products={products} />
    </div>
  );
}
