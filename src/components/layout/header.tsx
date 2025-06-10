
"use client";

import Link from 'next/link';
import { ShoppingCart, UserCircle2, LogIn, LogOut, HomeIcon, Search as SearchIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
} from "@/components/ui/dropdown-menu";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const categories = [
  { value: 'all', label: 'All' },
  { value: 'Electronics', label: 'Electronics' },
  { value: 'Apparel', label: 'Apparel' },
  { value: 'Home Goods', label: 'Home Goods' },
  { value: 'Accessories', label: 'Accessories' },
  { value: 'Groceries', label: 'Groceries' },
  { value: 'Sports', label: 'Sports' },
];

export function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const { getItemCount } = useCart();
  const cartItemCount = getItemCount();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleSearch = () => {
    if (searchTerm.trim() === '' && selectedCategory === 'all') {
      router.push('/products');
      return;
    }
    const queryParams = new URLSearchParams();
    if (searchTerm.trim()) {
      queryParams.set('q', searchTerm.trim());
    }
    if (selectedCategory !== 'all') {
      queryParams.set('category', selectedCategory);
    }
    router.push(`/search?${queryParams.toString()}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Logo />

        <div className="hidden md:flex flex-1 max-w-2xl items-center gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[150px] bg-card">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            type="search"
            placeholder="Search products..."
            className="flex-1 bg-card"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
          />
          <Button onClick={handleSearch} aria-label="Search" size="icon">
            <SearchIcon className="h-5 w-5" />
          </Button>
        </div>

        <nav className="hidden md:flex items-center gap-3 lg:gap-4">
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

        <div className="md:hidden">
          <MobileNav 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            handleSearch={handleSearch}
            categories={categories}
          />
        </div>
      </div>
    </header>
  );
}
