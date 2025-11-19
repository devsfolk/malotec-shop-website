"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SheetClose } from "@/components/ui/sheet";

type CartViewProps = {
  inSheet?: boolean;
  onShowCheckout?: () => void;
};

export function CartView({ inSheet = false, onShowCheckout }: CartViewProps) {
  const { state, updateQuantity, removeItem, itemCount, totalPrice } = useCart();
  
  if (itemCount === 0) {
    const startShoppingButton = (
      <Button asChild className="mt-6">
        <Link href="/">Start Shopping</Link>
      </Button>
    );

    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-4">
        <ShoppingBag className="h-16 w-16 text-muted-foreground" />
        <h2 className="mt-6 text-2xl font-semibold">Your cart is empty</h2>
        <p className="mt-2 text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
        {inSheet ? <SheetClose asChild>{startShoppingButton}</SheetClose> : startShoppingButton}
      </div>
    );
  }

  const checkoutButton = (
      <Button onClick={onShowCheckout} className="w-full" size="lg">
        Proceed to Checkout
      </Button>
  );
  
  const content = (
      <div className="flex flex-col h-full">
            <CardContent className="flex-grow overflow-y-auto px-6 pt-6">
                <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-border">
                    {state.items.map(({ product, quantity }) => {
                    return (
                        <li key={product.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-border">
                            {product.imageUrl && <Image
                            src={product.imageUrl}
                            alt={product.name}
                            width={96}
                            height={96}
                            className="h-full w-full object-cover object-center"
                            data-ai-hint={product.imageHint}
                            />}
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                            <div>
                            <div className="flex justify-between text-base font-medium text-foreground">
                                <h3>
                                <Link href={`/product/${product.slug}`}>{product.name}</Link>
                                </h3>
                                <p className="ml-4">Rs {(product.price * quantity).toLocaleString()}</p>
                            </div>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="flex items-center border border-border rounded-md">
                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(product.id, quantity - 1)}>
                                    <Minus className="h-4 w-4"/>
                                </Button>
                                <span className="w-8 text-center">{quantity}</span>
                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(product.id, quantity + 1)}>
                                    <Plus className="h-4 w-4"/>
                                </Button>
                            </div>
                            <div className="flex">
                                <Button variant="ghost" type="button" onClick={() => removeItem(product.id)}>
                                <Trash2 className="h-4 w-4 mr-1" /> Remove
                                </Button>
                            </div>
                            </div>
                        </div>
                        </li>
                    )
                    })}
                </ul>
                </div>
            </CardContent>

            <CardFooter className="flex-col items-stretch space-y-4 border-t px-6 pt-6">
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>Rs {totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Shipping</span>
                        <span className="text-primary">Free</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>Rs {totalPrice.toLocaleString()}</span>
                    </div>
                </div>
                 {onShowCheckout ? (
                  checkoutButton
                ) : (
                  <Button asChild className="w-full" size="lg">
                    <Link href="/cart">Proceed to Checkout</Link>
                  </Button>
                )}
            </CardFooter>
      </div>
  )

  if (inSheet) {
    return content;
  }

  return (
    <Card className="h-full">
        {content}
    </Card>
  );
}
