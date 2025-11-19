"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { Badge } from '@/components/ui/badge';
import { usePathname } from 'next/navigation';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { CartView } from './cart-view';
import { CheckoutForm } from './checkout-form';

export function StoreHeader() {
  const { itemCount } = useCart();
  const pathname = usePathname();
  const [sheetView, setSheetView] = useState<'cart' | 'checkout'>('cart');
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  if (pathname.startsWith('/dmalo')) {
    return null;
  }

  const handleSheetOpenChange = (open: boolean) => {
    setIsSheetOpen(open);
    // Reset to cart view when sheet is closed
    if (!open) {
      setTimeout(() => setSheetView('cart'), 150);
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold lowercase">malotec.shop</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search..." className="pl-9" />
            </div>
          </div>
          <nav className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="relative h-3 w-3">
                <div className="absolute h-full w-full rounded-full bg-primary glow-green"></div>
              </div>
              <span className="text-sm font-medium text-muted-foreground hidden sm:inline">Operational</span>
            </div>
             <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
              <SheetTrigger asChild>
                 <Button variant="ghost" size="icon" aria-label="Shopping Cart">
                    <div className="relative">
                    <ShoppingBag className="h-5 w-5" />
                    {itemCount > 0 && (
                        <Badge variant="destructive" className="absolute -right-2 -top-2 h-5 w-5 justify-center rounded-full p-0 text-xs">
                        {itemCount}
                        </Badge>
                    )}
                    </div>
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full flex flex-col sm:max-w-lg p-0">
                 <SheetHeader>
                    <SheetTitle>{sheetView === 'cart' ? 'Your Cart' : 'Checkout'}</SheetTitle>
                </SheetHeader>
                {sheetView === 'cart' ? (
                  <CartView inSheet={true} onShowCheckout={() => setSheetView('checkout')} />
                ) : (
                  <CheckoutForm onBackToCart={() => setSheetView('cart')} />
                )}
              </SheetContent>
            </Sheet>
          </nav>
        </div>
      </div>
    </header>
  );
}
