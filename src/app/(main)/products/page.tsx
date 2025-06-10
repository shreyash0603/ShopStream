import type { Metadata } from 'next';
import { ProductList } from '@/components/products/product-list';
import { mockProducts } from '@/lib/products';

export const metadata: Metadata = {
  title: 'All Products | ShopStream',
  description: 'Browse our complete collection of high-quality products.',
};

export default function ProductsPage() {
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-headline font-semibold mb-10 text-center">Our Products</h1>
      <ProductList products={mockProducts} />
    </div>
  );
}
