"use client";

import { useState } from "react";
import { HeroSlider } from "@/components/hero-slider";
import { CategorySelector } from "@/components/category-selector";
import { ProductGrid } from "@/components/product-grid";
import { getAllProducts, getCategories, getProductsByCategory, categories as allMockCategories } from "@/lib/mock-data";
import type { Product, Category } from "@/lib/types";
import { ProductDetailModal } from "@/components/product-detail-modal";


export default function HomePage() {
  const topLevelCategories = getCategories();
  const allProducts = getAllProducts();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>(allProducts);
  const [gridTitle, setGridTitle] = useState<string>("All Products");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);


  const handleSelectCategory = (category: Category | null) => {
    setSelectedCategory(category);
    if (category) {
        // If the selected category has sub-categories, show products from all of them.
        const subCategories = allMockCategories.filter(c => c.parentId === category.id);
        if (subCategories.length > 0) {
            const categoryIds = [category.id, ...subCategories.map(c => c.id)];
            const newProducts = allProducts.filter(p => categoryIds.includes(p.categoryId));
            setProducts(newProducts);
        } else {
            setProducts(getProductsByCategory(category.id));
        }
        setGridTitle(category.name);
    } else {
      setProducts(allProducts);
      setGridTitle("All Products");
    }
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleModalClose = () => {
    setSelectedProduct(null);
  }


  return (
    <div className="flex flex-col">
      <HeroSlider />
      <CategorySelector 
        categories={topLevelCategories} 
        title="Categories" 
        onSelectCategory={handleSelectCategory}
        selectedCategory={selectedCategory}
      />
      <section className="w-full py-6 md:py-12">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold tracking-tighter text-left mb-8 font-headline">
            {gridTitle}
          </h2>
          <ProductGrid products={products} onProductClick={handleProductClick} />
        </div>
      </section>
      {selectedProduct && (
        <ProductDetailModal 
          product={selectedProduct} 
          isOpen={!!selectedProduct}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}
