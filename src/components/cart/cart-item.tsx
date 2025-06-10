"use client";

import Image from 'next/image';
import type { CartItem as CartItemType } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/hooks/use-cart';
import { Trash2, Plus, Minus } from 'lucide-react';
import Link from 'next/link';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(item.id, newQuantity);
  };

  return (
    <div className="flex items-center gap-4 border-b py-4 last:border-b-0">
      <Link href={`/products/${item.id}`} legacyBehavior passHref>
        <a className="block shrink-0">
          <Image
            src={item.imageUrl}
            alt={item.name}
            width={80}
            height={80}
            className="rounded-md object-cover aspect-square"
            data-ai-hint={item.dataAiHint || "product image"}
          />
        </a>
      </Link>
      <div className="flex-grow">
        <Link href={`/products/${item.id}`} legacyBehavior passHref>
          <a className="hover:underline">
            <h3 className="font-medium font-headline text-lg">{item.name}</h3>
          </a>
        </Link>
        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={() => handleQuantityChange(item.quantity - 1)} disabled={item.quantity <= 1}>
          <Minus className="h-4 w-4" />
          <span className="sr-only">Decrease quantity</span>
        </Button>
        <Input
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10) || 1)}
          className="w-16 h-9 text-center"
          aria-label={`Quantity for ${item.name}`}
        />
        <Button variant="outline" size="icon" onClick={() => handleQuantityChange(item.quantity + 1)}>
          <Plus className="h-4 w-4" />
          <span className="sr-only">Increase quantity</span>
        </Button>
      </div>
      <p className="font-semibold w-24 text-right">${(item.price * item.quantity).toFixed(2)}</p>
      <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)} className="text-destructive hover:text-destructive/80">
        <Trash2 className="h-5 w-5" />
        <span className="sr-only">Remove {item.name} from cart</span>
      </Button>
    </div>
  );
}
