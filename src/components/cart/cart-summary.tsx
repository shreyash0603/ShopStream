"use client";

import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

export function CartSummary() {
  const { getCartTotal, getItemCount } = useCart();
  const total = getCartTotal();
  const itemCount = getItemCount();

  if (itemCount === 0) {
    return null; 
  }

  return (
    <div className="mt-8 p-6 bg-card rounded-lg shadow-md border">
      <h2 className="text-2xl font-headline font-semibold mb-4 text-card-foreground">Order Summary</h2>
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span className="text-green-600">FREE</span>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="flex justify-between font-bold text-xl mb-6">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <Button asChild size="lg" className="w-full">
        <Link href="/order-summary">Proceed to Order Summary</Link>
      </Button>
    </div>
  );
}
