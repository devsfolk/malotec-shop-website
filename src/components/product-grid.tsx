import type { Product } from "@/lib/types";
import { ProductCard } from "./product-card";

type ProductGridProps = {
  products: Product[];
  onProductClick?: (product: Product) => void;
};

export function ProductGrid({ products, onProductClick }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-12">
        No products found in this category.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onProductClick={onProductClick} />
      ))}
    </div>
  );
}
