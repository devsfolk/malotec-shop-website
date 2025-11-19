"use client";

import Image from "next/image";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type ProductDetailModalProps = {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
};

export function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-start">
           {/* Image Section */}
          <div className="p-4 md:p-6">
            <div className="aspect-square relative rounded-lg overflow-hidden">
              {product.imageUrl && (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-contain"
                  data-ai-hint={product.imageHint}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}
            </div>
          </div>
          {/* Details Section */}
          <div className="flex flex-col justify-center space-y-6 p-6 pt-0 md:pt-6">
            <DialogHeader>
              <DialogTitle className="text-2xl md:text-3xl font-bold font-headline">{product.name}</DialogTitle>
              <DialogDescription className="text-muted-foreground pt-2 text-sm">
                {product.description}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-4xl font-bold text-primary">
                Rs {product.price.toLocaleString()}
              </p>
              <AddToCartButton product={product} size="lg" />
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">In Stock</Badge>
              <Badge variant="outline">Cash on Delivery</Badge>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
