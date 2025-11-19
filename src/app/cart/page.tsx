import { CartView } from "@/components/cart-view";
import { CheckoutForm } from "@/components/checkout-form";

export default function CartPage() {
  // This page is no longer the primary checkout flow, but can be kept for direct access.
  // The main flow is now within the side-panel sheet.
  return (
    <div className="container mx-auto max-w-6xl py-8 md:py-12">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="md:col-span-1">
           <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 font-headline">
            Shopping Cart
          </h1>
          <CartView />
        </div>
        <div className="md:col-span-1">
           <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 font-headline">
            Checkout
          </h1>
          <CheckoutForm />
        </div>
      </div>
    </div>
  );
}
