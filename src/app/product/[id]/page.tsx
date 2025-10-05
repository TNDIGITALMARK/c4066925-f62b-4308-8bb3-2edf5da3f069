'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { products } from '@/lib/products';
import { PurchaseDialog } from '@/components/purchase-dialog';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useState } from 'react';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find(p => p.id === params.id);
  const [selectedTab, setSelectedTab] = useState('specs');
  const [isPurchaseDialogOpen, setIsPurchaseDialogOpen] = useState(false);

  if (!product) {
    notFound();
  }

  const relatedProducts = products.filter(p => p.id !== product.id && p.category === product.category);

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

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-gradient-to-b from-gray-50 to-white rounded-2xl p-8 flex items-center justify-center">
              <Image
                src={product.image}
                alt={product.name}
                width={600}
                height={600}
                className="max-w-full h-auto animate-[scale-in_0.8s_ease-out]"
                priority
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8 animate-[slide-in_1s_ease-out]">
            <div className="space-y-4">
              <Badge variant="secondary" className="text-sm">
                {product.category === 'phone' ? '📱 GAMING PHONE' : '💻 GAMING LAPTOP'}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                {product.name}
              </h1>
              <p className="text-xl text-muted-foreground">
                {product.tagline}
              </p>
            </div>

            <div className="flex items-baseline space-x-4">
              <span className="text-4xl font-bold text-primary">
                ${product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-2xl text-muted-foreground line-through">
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* One-Click Purchase */}
            <div className="space-y-4">
              <Button
                size="lg"
                className="w-full py-6 text-lg font-semibold"
                onClick={() => setIsPurchaseDialogOpen(true)}
              >
                🚀 Buy Now - One Click
              </Button>
              <Button variant="outline" size="lg" className="w-full py-6">
                Add to Cart
              </Button>
              <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                <span>✓ Free shipping worldwide</span>
                <span>•</span>
                <span>✓ 30-day returns</span>
              </div>
            </div>

            {/* Key Features */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Key Features</h3>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <span className="text-primary">⚡</span>
                  <span className="font-medium">{product.specs.processor}</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <span className="text-primary">💾</span>
                  <span className="font-medium">{product.specs.memory} + {product.specs.storage}</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <span className="text-primary">🖥️</span>
                  <span className="font-medium">{product.specs.display}</span>
                </div>
                {product.specs.graphics && (
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <span className="text-primary">🎮</span>
                    <span className="font-medium">{product.specs.graphics}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="specs" className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-4">
              <TabsTrigger value="specs">Technical Specs</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="support">Support</TabsTrigger>
              <TabsTrigger value="reviews" className="hidden lg:block">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="specs" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Complete Technical Specifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center py-3 border-b">
                        <span className="font-medium capitalize text-muted-foreground">
                          {key.replace(/([A-Z])/g, ' $1')}
                        </span>
                        <span className="font-semibold">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="features" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Advanced Gaming Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          <span className="text-primary">🚀</span>
                        </div>
                        <div>
                          <h4 className="font-semibold">Boost Mode</h4>
                          <p className="text-sm text-muted-foreground">
                            Overclock performance for maximum gaming power
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          <span className="text-primary">❄️</span>
                        </div>
                        <div>
                          <h4 className="font-semibold">Advanced Cooling</h4>
                          <p className="text-sm text-muted-foreground">
                            Vapor chamber cooling keeps temperatures optimal
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          <span className="text-primary">🎵</span>
                        </div>
                        <div>
                          <h4 className="font-semibold">Immersive Audio</h4>
                          <p className="text-sm text-muted-foreground">
                            Studio-quality speakers with spatial audio
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          <span className="text-primary">⚡</span>
                        </div>
                        <div>
                          <h4 className="font-semibold">Fast Charging</h4>
                          <p className="text-sm text-muted-foreground">
                            Rapid charging technology for uninterrupted gaming
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="support" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Support & Warranty</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Warranty Coverage</h4>
                        <ul className="space-y-2 text-sm">
                          <li>✓ 2-year manufacturer warranty</li>
                          <li>✓ International coverage</li>
                          <li>✓ Accidental damage protection</li>
                          <li>✓ 24/7 premium support</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3">What's Included</h4>
                        <ul className="space-y-2 text-sm">
                          <li>✓ Premium carry case</li>
                          <li>✓ Fast charger adapter</li>
                          <li>✓ User manual & setup guide</li>
                          <li>✓ Gaming accessories bundle</li>
                        </ul>
                      </div>
                    </div>
                    <div className="border-t pt-6">
                      <Button className="mr-4">💬 Live Chat Support</Button>
                      <Button variant="outline">📧 Email Support</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Reviews coming soon!</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Be the first to review this amazing gaming device.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8 text-center">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.slice(0, 3).map((relatedProduct) => (
                <Link href={`/product/${relatedProduct.id}`} key={relatedProduct.id}>
                  <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                    <CardContent className="p-6">
                      <div className="aspect-square mb-4 bg-gradient-to-b from-gray-50 to-white rounded-lg p-4 flex items-center justify-center">
                        <Image
                          src={relatedProduct.image}
                          alt={relatedProduct.name}
                          width={200}
                          height={200}
                          className="max-w-full h-auto group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="font-semibold mb-2">{relatedProduct.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{relatedProduct.tagline}</p>
                      <p className="text-xl font-bold text-primary">${relatedProduct.price.toLocaleString()}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Purchase Dialog */}
      <PurchaseDialog
        isOpen={isPurchaseDialogOpen}
        onClose={() => setIsPurchaseDialogOpen(false)}
        product={product}
      />

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