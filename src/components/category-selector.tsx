import Link from "next/link";
import Image from "next/image";
import type { Category } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

type CategorySelectorProps = {
  categories: Category[];
  title?: string;
  onSelectCategory?: (category: Category | null) => void;
  selectedCategory?: Category | null;
};

export function CategorySelector({
  categories,
  title = "Categories",
  onSelectCategory,
  selectedCategory,
}: CategorySelectorProps) {
  const isInteractive = !!onSelectCategory;

  const renderCategoryCard = (category: Category) => (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg group-hover:-translate-y-1">
      <CardContent className="p-0">
        <div className="aspect-square relative">
          {category.imageUrl && (
            <Image
              src={category.imageUrl}
              alt={category.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={category.imageHint}
              sizes="20vw"
            />
          )}
        </div>
        <div className="p-2 text-center">
          <h3 className="text-xs font-semibold truncate">{category.name}</h3>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <section className="w-full pt-6 md:pt-8">
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold tracking-tighter text-left font-headline">
            {title}
            </h2>
            {isInteractive && (
                 <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onSelectCategory(null)}
                    className={cn("text-xs",!selectedCategory && "bg-accent")}
                >
                    View All
                </Button>
            )}
        </div>
        <Carousel
          opts={{
            align: "start",
            dragFree: true,
          }}
          className="w-full -ml-2"
        >
          <CarouselContent className="pl-2 -ml-2">
            {categories.map((category) => (
              <CarouselItem
                key={category.id}
                className="basis-1/3 sm:basis-1/4 md:basis-1/6 lg:basis-1/8 pl-2"
              >
                {isInteractive ? (
                   <button 
                     onClick={() => onSelectCategory(category)} 
                     className={cn(
                       "group w-full text-left p-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary",
                       selectedCategory?.id === category.id && "ring-2 ring-primary"
                     )}
                   >
                     {renderCategoryCard(category)}
                   </button>
                ) : (
                    <Link href={`/category/${category.slug}`} className="group block p-1">
                        {renderCategoryCard(category)}
                    </Link>
                )}
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
