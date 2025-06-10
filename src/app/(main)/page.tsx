import type { Metadata } from 'next';
import { ProductList } from '@/components/products/product-list';
import { ProductRecommendations } from '@/components/products/product-recommendations';
import { mockProducts } from '@/lib/products';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'ShopStream - Your Online Shopping Destination',
  description: 'Discover a wide range of products on ShopStream.',
};

export default function HomePage() {
  // For demo, take first 4 products as featured
  const featuredProducts = mockProducts.slice(0, 4);

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-accent text-primary-foreground py-20 px-6 rounded-lg shadow-xl overflow-hidden mb-16">
        <div className="absolute inset-0 opacity-20">
           {/* Decorative background elements, could be subtle patterns or abstract shapes */}
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline font-bold mb-6">
            Welcome to ShopStream
          </h1>
          <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto">
            Discover your next favorite item from our curated collection. Quality products, amazing prices.
          </p>
          <Button asChild size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
            <Link href="/products">Shop Now</Link>
          </Button>
        </div>
        <div className="absolute -bottom-1/3 left-0 right-0 h-1/2 opacity-10" style={{
            background: 'radial-gradient(ellipse at bottom, hsl(var(--accent)) 0%, transparent 70%)'
        }}></div>
      </section>

      {/* Featured Products Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-headline font-semibold mb-8 text-center">Featured Products</h2>
        <ProductList products={featuredProducts} />
        <div className="text-center mt-8">
          <Button asChild variant="outline">
            <Link href="/products">View All Products</Link>
          </Button>
        </div>
      </section>

      {/* AI Product Recommendations Section */}
      <section className="py-12 bg-card rounded-lg shadow-lg">
        <h2 className="text-3xl font-headline font-semibold mb-8 text-center text-card-foreground">Personalized Recommendations</h2>
        <ProductRecommendations />
      </section>
    </div>
  );
}
