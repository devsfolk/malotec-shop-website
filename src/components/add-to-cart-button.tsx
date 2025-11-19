"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import type { Product } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

type AddToCartButtonProps = {
  product: Product;
  children?: React.ReactNode;
  variant?: "default" | "secondary" | "outline" | "ghost" | "link" | "destructive" | null | undefined,
  size?: "default" | "sm" | "lg" | "icon" | null | undefined,
};

export function AddToCartButton({ product, children, variant = "default", size = "sm" }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent link navigation if button is inside a link
    addItem(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Button onClick={handleAddToCart} variant={variant} size={size}>
      {children || (
        <>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </>
      )}
    </Button>
  );
}
