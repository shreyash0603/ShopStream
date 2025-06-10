"use client"; // This page uses client-side hooks

import type { Metadata } from 'next';
import { useCart } from '@/hooks/use-cart';
import { useAuth } from '@/hooks/use-auth';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

export const metadata: Metadata = {
  title: 'Order Summary | ShopStream',
  description: 'Review your order details before confirmation.',
};

export default function OrderSummaryPage() {
  const { cartItems, getCartTotal, clearCart, isLoading: cartLoading } = useCart();
  const { isAuthenticated, user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login?redirect=/order-summary');
    }
  }, [isAuthenticated, authLoading, router]);

  const handleConfirmOrder = () => {
    // In a real app, this would submit the order to a backend.
    // For this MVP, we'll just clear the cart and show a success message.
    clearCart();
    toast({
      title: "Order Confirmed!",
      description: "Thank you for your purchase. Your order is being processed.",
      duration: 5000,
    });
    router.push('/'); 
  };

  if (authLoading || cartLoading) {
    return <div className="container mx-auto py-8 px-4 text-center">Loading order summary...</div>;
  }
  
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <p className="text-xl mb-4">Please log in to view your order summary.</p>
        <Button asChild>
          <Link href="/login?redirect=/order-summary">Login</Link>
        </Button>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <p className="text-xl mb-4">Your cart is empty. There's nothing to summarize.</p>
        <Button asChild>
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  const total = getCartTotal();

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-headline font-semibold mb-10 text-center">Order Summary</h1>
      <Card className="max-w-2xl mx-auto shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Review Your Order</CardTitle>
          <CardDescription>Please check your items and total before confirming.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mb-6">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center gap-4 border-b pb-2 last:border-b-0 last:pb-0">
                <Image src={item.imageUrl} alt={item.name} width={60} height={60} className="rounded-md object-cover aspect-square" data-ai-hint={item.dataAiHint || "product image"} />
                <div className="flex-grow">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                </div>
                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <Separator className="my-4" />
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-green-600">FREE</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <Separator className="my-4" />
          <div>
            <h3 className="font-semibold mb-2">Shipping to:</h3>
            <p className="text-sm text-muted-foreground">{user?.email || "Your registered email"}</p>
            <p className="text-sm text-muted-foreground">123 Shopping Lane, Anytown, USA</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button size="lg" className="w-full" onClick={handleConfirmOrder}>
            Confirm Order & Pay (Mock)
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
