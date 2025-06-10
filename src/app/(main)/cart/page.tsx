"use client"; // This page uses client-side hooks

import type { Metadata } from 'next'; // Metadata can still be exported from client components
import { CartItem } from '@/components/cart/cart-item';
import { CartSummary } from '@/components/cart/cart-summary';
import { useCart } from '@/hooks/use-cart';
import { useAuth } from '@/hooks/use-auth';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

// Next.js allows exporting metadata from client components.
// However, for dynamic metadata based on client state, other strategies might be needed if values are not known at build time.
// For a static title like this, it's fine.
export const metadata: Metadata = {
  title: 'Shopping Cart | ShopStream',
  description: 'Review and manage items in your shopping cart.',
};

export default function CartPage() {
  const { cartItems, isLoading: cartLoading } = useCart();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login?redirect=/cart');
    }
  }, [isAuthenticated, authLoading, router]);

  if (authLoading || cartLoading) {
    return <div className="container mx-auto py-8 px-4 text-center">Loading cart...</div>;
  }

  if (!isAuthenticated) {
     // This case should ideally be handled by the redirect, but as a fallback:
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <p className="text-xl mb-4">Please log in to view your cart.</p>
        <Button asChild>
          <Link href="/login?redirect=/cart">Login</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-headline font-semibold mb-10 text-center">Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground mb-6" />
          <p className="text-xl text-muted-foreground mb-6">Your cart is currently empty.</p>
          <Button asChild size="lg">
            <Link href="/products">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="lg:grid lg:grid-cols-3 lg:gap-8 items-start">
          <div className="lg:col-span-2 bg-card p-6 rounded-lg shadow-md border">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className="lg:col-span-1 mt-8 lg:mt-0">
            <CartSummary />
          </div>
        </div>
      )}
    </div>
  );
}
