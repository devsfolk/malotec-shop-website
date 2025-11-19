import { notFound } from "next/navigation";
import Image from "next/image";
import { getProductBySlug, products as allMockProducts } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { Badge } from "@/components/ui/badge";
import { BackButton } from "@/components/back-button";

type ProductPageProps = {
  params: {
    productSlug: string;
  };
};

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.productSlug);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-4xl py-8 md:py-12">
      <BackButton />
      <div className="grid md:grid-cols-2 gap-6 md:gap-12">
        <div className="aspect-square">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-square relative">
                {product.imageUrl && (
                    <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                    data-ai-hint={product.imageHint}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    />
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col justify-center space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold font-headline">{product.name}</h1>
            <p className="text-muted-foreground mt-2">{product.description}</p>
          </div>
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
    </div>
  );
}

// Optional: Pre-render pages for better performance
export async function generateStaticParams() {
  return allMockProducts.map((prod: any) => ({
    productSlug: prod.slug,
  }));
}
