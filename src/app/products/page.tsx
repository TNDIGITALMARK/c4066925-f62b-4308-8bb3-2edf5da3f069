'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { products } from '@/lib/products';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get('category');

  const [sortBy, setSortBy] = useState('featured');
  const [filterCategory, setFilterCategory] = useState(categoryFilter || 'all');

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (filterCategory !== 'all') {
      filtered = filtered.filter(p => p.category === filterCategory);
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered = filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered = filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        filtered = filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return filtered;
  }, [sortBy, filterCategory]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-primary rounded flex items-center justify-center">
                <span className="text-white font-bold">Δ</span>
              </div>
              <span className="text-xl font-semibold">DELTA GEAR</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">HOME</Link>
            <Link href="/products" className="text-foreground font-medium">LAPTOPS</Link>
            <Link href="/products?category=phone" className="text-muted-foreground hover:text-foreground transition-colors">PHONES</Link>
            <Link href="/products" className="text-muted-foreground hover:text-foreground transition-colors">ACCESSORIES</Link>
            <Link href="/support" className="text-muted-foreground hover:text-foreground transition-colors">SUPPORT</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">🔍</Button>
            <Button variant="ghost" size="sm">🛒</Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12 animate-[fade-in_1s_ease-out]">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {filterCategory === 'phone' ? 'Gaming Phones' :
             filterCategory === 'laptop' ? 'Gaming Laptops' :
             'All Products'}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our complete range of premium gaming electronics designed for ultimate performance.
          </p>
        </div>

        {/* Filters and Sorting */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium">Filter:</span>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Products</SelectItem>
                <SelectItem value="laptop">Laptops</SelectItem>
                <SelectItem value="phone">Phones</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium">Sort by:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="text-sm text-muted-foreground">
            Showing {filteredAndSortedProducts.length} products
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredAndSortedProducts.map((product, index) => (
            <Link href={`/product/${product.id}`} key={product.id}>
              <Card
                className="group hover:shadow-xl transition-all duration-500 cursor-pointer border-0 shadow-md animate-[scale-in_0.6s_ease-out]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-0">
                  {/* Product Image */}
                  <div className="relative aspect-square bg-gradient-to-b from-gray-50 to-white rounded-t-lg p-6 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                    {product.featured && (
                      <Badge className="absolute top-4 left-4 bg-primary">
                        Featured
                      </Badge>
                    )}
                    {product.originalPrice && (
                      <Badge variant="destructive" className="absolute top-4 right-4">
                        Sale
                      </Badge>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-6 space-y-4">
                    <div className="space-y-2">
                      <Badge variant="secondary" className="text-xs">
                        {product.category === 'phone' ? '📱 GAMING PHONE' : '💻 GAMING LAPTOP'}
                      </Badge>
                      <h3 className="font-bold text-lg group-hover:text-primary transition-colors duration-300">
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {product.tagline}
                      </p>
                    </div>

                    {/* Key Specs */}
                    <div className="space-y-1">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <span className="w-3 h-3 bg-blue-100 rounded-full mr-2"></span>
                        {product.specs.processor}
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <span className="w-3 h-3 bg-green-100 rounded-full mr-2"></span>
                        {product.specs.memory}
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <span className="w-3 h-3 bg-purple-100 rounded-full mr-2"></span>
                        {product.specs.display}
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-baseline space-x-2">
                          <span className="text-2xl font-bold text-primary">
                            ${product.price.toLocaleString()}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              ${product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Free shipping worldwide
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-2 pt-2">
                      <Button
                        className="w-full group-hover:bg-primary group-hover:text-white transition-all duration-300"
                        variant="outline"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* No products found */}
        {filteredAndSortedProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-2">No products found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your filters or search criteria.
            </p>
            <Button onClick={() => setFilterCategory('all')}>
              View All Products
            </Button>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our gaming experts are here to help you find the perfect device for your needs.
            Get personalized recommendations and exclusive offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8">
              💬 Chat with Experts
            </Button>
            <Button variant="outline" size="lg" className="px-8">
              📧 Get Custom Quote
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link href="/about">About</Link></li>
                <li><Link href="/careers">Careers</Link></li>
                <li><Link href="/news">News</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link href="/products">Laptops</Link></li>
                <li><Link href="/products">Phones</Link></li>
                <li><Link href="/accessories">Accessories</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link href="/support">Contact</Link></li>
                <li><Link href="/warranty">Warranty</Link></li>
                <li><Link href="/repairs">Repairs</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link href="/privacy">Privacy</Link></li>
                <li><Link href="/terms">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            © 2024 Delta Gear. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}