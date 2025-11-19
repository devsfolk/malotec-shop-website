import Image from "next/image";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import type { Product } from "@/lib/types";
import { AddToCartButton } from "./add-to-cart-button";

type ProductCardProps = {
  product: Product;
  onProductClick?: (product: Product) => void;
};

export function ProductCard({ product, onProductClick }: ProductCardProps) {
    const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
        // We stop propagation to prevent the AddToCartButton's click handler
        // from also triggering this one.
        if (onProductClick && !(e.target as HTMLElement).closest('button')) {
            e.preventDefault();
            onProductClick(product);
        }
    };
    
  return (
    <div onClick={handleCardClick} className={`group cursor-pointer ${onProductClick ? '' : 'pointer-events-none'}`}>
      <Card className="h-full flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-xl">
        <CardContent className="p-0">
          <div className="aspect-square relative overflow-hidden">
            {product.imageUrl && (
                <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={product.imageHint}
                />
            )}
          </div>
        </CardContent>
        <div className="p-4 flex flex-col flex-grow">
          <CardTitle className="text-base font-semibold mb-1 leading-tight tracking-normal">
            {product.name}
          </CardTitle>
          <p className="text-lg font-bold text-primary mt-auto">
            Rs {product.price.toLocaleString()}
          </p>
        </div>
        <CardFooter className="p-4 pt-0">
          <AddToCartButton product={product} variant="secondary" />
        </CardFooter>
      </Card>
    </div>
  );
}
