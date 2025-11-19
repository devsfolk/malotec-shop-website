"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { SheetClose } from "@/components/ui/sheet";
import { ArrowLeft, ShoppingBag } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(11, "A valid phone number is required"),
  address: z.string().min(10, "A detailed address is required"),
  deliveryNote: z.string().optional(),
});

type CheckoutFormProps = {
  onBackToCart?: () => void;
};


export function CheckoutForm({ onBackToCart }: CheckoutFormProps) {
  const { state, totalPrice, clearCart, itemCount } = useCart();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      deliveryNote: "",
    },
  });
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (itemCount === 0) {
        toast({
            variant: "destructive",
            title: "Your cart is empty",
            description: "Add items to your cart before placing an order.",
        });
        return;
    }
    const whatsAppNumber = "923444850161";
    let message = `New Order from malotec.shop\n\n`;
    message += `*Customer Details:*\n`;
    message += `Name: ${values.name}\n`;
    message += `Phone: ${values.phone}\n`;
    message += `Address: ${values.address}\n\n`;
    message += `*Order Items:*\n`;
    
    state.items.forEach(item => {
      message += `- ${item.quantity}x ${item.product.name}\n`;
    });
    
    message += `\n*Total Amount:* Rs ${totalPrice.toLocaleString()}\n`;
    if (values.deliveryNote) {
      message += `*Delivery Note:* ${values.deliveryNote}\n`;
    }

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsAppNumber}?text=${encodedMessage}`;

    clearCart();

    toast({
        title: "Order Placed!",
        description: "You will be redirected to WhatsApp to confirm your order.",
    });

    window.location.href = whatsappUrl;
  }
  
  const content = (
    <>
      <CardHeader>
        <div className="flex items-center gap-4">
          {onBackToCart && (
            <Button variant="ghost" size="icon" onClick={onBackToCart} className="shrink-0">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to cart</span>
            </Button>
          )}
          <CardTitle>Shipping Information</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {itemCount > 0 ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 03001234567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shipping Address</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Your full address, including house number, street, and area." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deliveryNote"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Delivery Note (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Call before arriving" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" size="lg" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Placing Order..." : "Place Order via WhatsApp"}
              </Button>
            </form>
          </Form>
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-4 h-full">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">Your cart is empty. Add some products to continue.</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">You will confirm the order on WhatsApp. Payment is cash on delivery.</p>
      </CardFooter>
    </>
  );


  if (onBackToCart) {
    return (
        <div className="flex flex-col h-full">
            {content}
        </div>
    )
  }

  return (
    <Card>
      {content}
    </Card>
  );
}
