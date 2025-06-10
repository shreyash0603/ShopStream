
"use client";

import Link from 'next/link';
import { Menu, ShoppingCart, User, LogIn, LogOut, Package, HomeIcon, Search as SearchIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { useAuth } from '@/hooks/use-auth';
import { useCart } from '@/hooks/use-cart';
import { Logo } from './logo';
import type { Dispatch, SetStateAction } from 'react';

interface Category {
  value: string;
  label: string;
}

interface MobileNavProps {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  handleSearch: () => void;
  categories: Category[];
}

export function MobileNav({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  handleSearch,
  categories
}: MobileNavProps) {
  const { isAuthenticated, logout, user } = useAuth();
  const { getItemCount } = useCart();

  const navLinks = [
    { href: '/', label: 'Home', icon: HomeIcon },
    { href: '/products', label: 'Products', icon: Package },
    { href: '/cart', label: 'Cart', icon: ShoppingCart, badge: getItemCount() > 0 ? getItemCount() : undefined },
  ];

  const onSearchSubmit = () => {
    handleSearch();
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0 flex flex-col">
        <div className="p-6 border-b">
          <Logo />
        </div>

        <div className="p-4 border-b space-y-3">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full bg-muted">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex items-center gap-2">
            <Input
              type="search"
              placeholder="Search products..."
              className="flex-1 bg-muted"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { onSearchSubmit(); const activeElement = document.activeElement as HTMLElement; if (activeElement) {activeElement.blur();} } }} // Blur to help close sheet with SheetClose
            />
            <SheetClose asChild>
                <Button onClick={onSearchSubmit} aria-label="Search" size="icon">
                  <SearchIcon className="h-5 w-5" />
                </Button>
            </SheetClose>
          </div>
        </div>

        <nav className="flex-grow p-6 space-y-2 overflow-y-auto">
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
      </SheetContent>
    </Sheet>
  );
}
