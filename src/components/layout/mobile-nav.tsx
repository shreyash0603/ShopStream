"use client";

import Link from 'next/link';
import { Menu, ShoppingCart, User, LogIn, LogOut, Package, HomeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { useAuth } from '@/hooks/use-auth';
import { useCart } from '@/hooks/use-cart';
import { Logo } from './logo';

export function MobileNav() {
  const { isAuthenticated, logout, user } = useAuth();
  const { getItemCount } = useCart();

  const navLinks = [
    { href: '/', label: 'Home', icon: HomeIcon },
    { href: '/products', label: 'Products', icon: Package },
    { href: '/cart', label: 'Cart', icon: ShoppingCart, badge: getItemCount() > 0 ? getItemCount() : undefined },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0">
        <div className="flex flex-col h-full">
          <div className="p-6 border-b">
            <Logo />
          </div>
          <nav className="flex-grow p-6 space-y-2">
            {navLinks.map((link) => (
              <SheetClose asChild key={link.href}>
                <Link
                  href={link.href}
                  className="flex items-center gap-3 rounded-md p-3 text-lg font-medium hover:bg-muted transition-colors"
                >
                  <link.icon className="h-5 w-5" />
                  {link.label}
                  {link.badge !== undefined && (
                    <span className="ml-auto bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                      {link.badge}
                    </span>
                  )}
                </Link>
              </SheetClose>
            ))}
          </nav>
          <div className="p-6 border-t mt-auto">
            {isAuthenticated ? (
              <div className="space-y-2">
                 <div className="flex items-center gap-2 p-3">
                    <User className="h-5 w-5" />
                    <span className="font-medium">{user?.email || 'User'}</span>
                  </div>
                <SheetClose asChild>
                  <Button variant="outline" className="w-full justify-start gap-3" onClick={logout}>
                    <LogOut className="h-5 w-5" />
                    Logout
                  </Button>
                </SheetClose>
              </div>
            ) : (
              <SheetClose asChild>
                <Link href="/login" legacyBehavior passHref>
                  <Button className="w-full justify-start gap-3">
                    <LogIn className="h-5 w-5" />
                    Login
                  </Button>
                </Link>
              </SheetClose>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
