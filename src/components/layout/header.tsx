"use client";

import Link from 'next/link';
import { ShoppingCart, UserCircle2, LogIn, LogOut, Package, HomeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { useCart } from '@/hooks/use-cart';
import { Logo } from './logo';
import { MobileNav } from './mobile-nav';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const { getItemCount } = useCart();
  const cartItemCount = getItemCount();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Logo />
        <nav className="ml-auto hidden md:flex items-center gap-4 lg:gap-6">
          <Link href="/" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">
            Home
          </Link>
          <Link href="/products" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">
            Products
          </Link>
          <Link href="/cart" className="relative flex items-center text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <Badge variant="destructive" className="absolute -top-2 -right-3 px-1.5 py-0.5 text-xs">
                {cartItemCount}
              </Badge>
            )}
            <span className="sr-only">Shopping Cart</span>
          </Link>
          {isAuthenticated ? (
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <UserCircle2 className="h-6 w-6" />
                  <span className="sr-only">User Menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled>{user?.email}</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login" legacyBehavior passHref>
              <Button variant="ghost" size="sm">
                <LogIn className="mr-2 h-4 w-4" /> Login
              </Button>
            </Link>
          )}
        </nav>
        <div className="ml-auto md:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
