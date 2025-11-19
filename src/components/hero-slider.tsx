"use client";

import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Bike, HandCoins } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export function HeroSlider() {
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  const slides = [
    {
      id: "hero-delivery",
      icon: <Bike className="h-12 w-12 text-primary" />,
      text: "Free delivery on all orders",
    },
    {
      id: "hero-payment",
      icon: <HandCoins className="h-12 w-12 text-primary" />,
      text: "First check, then pay",
    },
  ];

  return (
    <section className="w-full pt-2">
      <Carousel
        className="w-full"
        opts={{
          loop: true,
        }}
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {slides.map((slide) => {
            return (
              <CarouselItem key={slide.id}>
                <Card className="overflow-hidden bg-secondary border-0 shadow-none">
                  <CardContent className="relative flex aspect-[4/1] md:aspect-[5/1] items-center justify-center p-0">
                    <div className="relative z-10 flex flex-col items-center gap-4 text-center text-secondary-foreground p-4">
                      {slide.icon}
                      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
                        {slide.text}
                      </h2>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
