
'use client';

import { useSearchParams } from 'next/navigation';
import { ProductList } from '@/components/products/product-list';
import { mockProducts } from '@/lib/products';
import type { Product } from '@/types';
import { useEffect, useState, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ShoppingBag } from 'lucide-react';


// Note: Dynamic metadata based on searchParams is not directly supported in client components
// in the same way as server components. This is a static fallback.
// export const metadata: Metadata = { 
//   title: 'Search Results | ShopStream',
//   description: 'Find products on ShopStream.',
// };


function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const category = searchParams.get('category');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageTitle, setPageTitle] = useState('Search Results | ShopStream');

  useEffect(() => {
    let title = 'Search Results';
    if (query) title += ` for "${query}"`;
    if (category && category !== 'all') title += ` in ${category}`;
    title += ' | ShopStream';
    setPageTitle(title);
    // document.title = title; // Also update document title for immediate effect if needed
  }, [query, category]);
  
  useEffect(() => {
    setLoading(true);
    let products = mockProducts;

    if (query) {
      const lowerCaseQuery = query.toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(lowerCaseQuery) || 
        p.description.toLowerCase().includes(lowerCaseQuery)
      );
    }

    if (category && category !== 'all') {
      products = products.filter(p => p.category === category);
    }

    setFilteredProducts(products);
    setLoading(false);
  }, [query, category]);

  if (loading) {
    return <div className="container mx-auto py-8 px-4 text-center">Searching products...</div>;
  }
  
  let headingText = "Search Results";
  if (query && category && category !== 'all') {
    headingText = `Results for "${query}" in ${category}`;
  } else if (query) {
    headingText = `Results for "${query}"`;
  } else if (category && category !== 'all') {
    headingText = `Results in ${category}`;
  }


  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-headline font-semibold mb-8 text-center sm:text-left">
        {headingText}
      </h1>
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground mb-6" />
          <p className="text-xl text-muted-foreground mb-6">No products found matching your criteria.</p>
           <Button asChild size="lg">
            <Link href="/products">Browse All Products</Link>
          </Button>
        </div>
      ) : (
        <ProductList products={filteredProducts} />
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="container mx-auto py-8 px-4 text-center">Loading search...</div>}>
      <SearchResults />
    </Suspense>
  );
}
