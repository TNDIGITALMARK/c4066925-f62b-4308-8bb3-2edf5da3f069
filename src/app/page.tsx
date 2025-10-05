'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { heroProduct, featuredProducts } from '@/lib/products';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function HomePage() {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-primary rounded flex items-center justify-center">
              <span className="text-white font-bold">Δ</span>
            </div>
            <span className="text-xl font-semibold">DELTA GEAR</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground font-medium">HOME</Link>
            <Link href="/products" className="text-muted-foreground hover:text-foreground transition-colors">LAPTOPS</Link>
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

      {/* Hero Section */}
      <section className="relative px-4 py-20 md:py-32">
        <div className="container mx-auto text-center">
          <div className="space-y-8">
            <div className="space-y-4 animate-[fade-in_1s_ease-out]">
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                UNLEASH YOUR
                <br />
                POTENTIAL
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Experience desktop-class performance in a mobile form factor with our premium gaming electronics.
              </p>
              <Button size="lg" className="px-8 py-6 text-lg">
                Explore Now
              </Button>
            </div>

            {/* Hero Product */}
            <div className="relative">
              <div className={`transition-all duration-1000 ${imageLoaded ? 'animate-[float_6s_ease-in-out_infinite]' : 'opacity-0'}`}>
                <Image
                  src={heroProduct.image}
                  alt={heroProduct.name}
                  width={800}
                  height={500}
                  className="mx-auto max-w-full h-auto"
                  priority
                  onLoad={() => setImageLoaded(true)}
                />
              </div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-6 py-2 shadow-lg">
                <span className="text-sm font-medium text-muted-foreground">Starting at</span>
                <span className="text-lg font-bold text-primary ml-2">${heroProduct.price.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">FEATURED PRODUCTS</h2>
            <p className="text-muted-foreground">Discover our latest gaming innovations</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <Link href={`/product/${product.id}`} key={product.id}>
                <div className="group cursor-pointer">
                  <div
                    className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 animate-[fade-in_1s_ease-out] border"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="relative aspect-square mb-6">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="text-center space-y-2">
                      <Badge variant="secondary" className="mb-2">
                        {product.category === 'phone' ? '📱 PHONE' : '💻 LAPTOP'}
                      </Badge>
                      <h3 className="text-lg font-semibold">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">{product.tagline}</p>
                      <p className="text-xl font-bold text-primary">${product.price.toLocaleString()}</p>
                      <Button size="sm" className="w-full mt-4">
                        Learn More
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">TECHNOLOGY REDEFINED</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We push the boundaries of mobile gaming with cutting-edge technology and innovative design
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">⚡</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Desktop-Class Graphics</h3>
                  <p className="text-muted-foreground">
                    Full RTX 4090 desktop GPUs in a laptop form factor for unprecedented mobile performance.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🎯</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Gaming-First Design</h3>
                  <p className="text-muted-foreground">
                    Every component optimized for gaming performance with advanced cooling and ergonomics.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Experience the Future</h3>
                <p className="mb-6 opacity-90">
                  Join the next generation of mobile gaming with our revolutionary technology stack.
                </p>
                <Button variant="secondary" size="lg">
                  Explore the Future of Gaming
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
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