'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/lib/products';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';

interface PurchaseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

export function PurchaseDialog({ isOpen, onClose, product }: PurchaseDialogProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'United States',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePurchase = async () => {
    setIsProcessing(true);

    // Simulate purchase processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Purchase Successful! 🎉",
      description: `Your ${product.name} will be shipped within 24 hours. Check your email for tracking information.`,
    });

    setIsProcessing(false);
    onClose();
  };

  const isFormValid = formData.email && formData.fullName && formData.address && formData.city && formData.zipCode;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <span>🚀 One-Click Purchase</span>
          </DialogTitle>
          <DialogDescription>
            Complete your purchase in seconds with our streamlined checkout process.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Product Summary */}
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="relative w-16 h-16">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain rounded"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-sm text-muted-foreground">{product.tagline}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="secondary">
                  {product.category === 'phone' ? '📱 Phone' : '💻 Laptop'}
                </Badge>
                <span className="text-lg font-bold text-primary">
                  ${product.price.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="space-y-4">
            <h4 className="font-semibold">Shipping Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="john@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Address *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="123 Gaming Street"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="San Francisco"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP Code *</Label>
                <Input
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  placeholder="94102"
                />
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>${product.price.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm text-green-600">
              <span>Shipping</span>
              <span>FREE</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t pt-2">
              <span>Total</span>
              <span className="text-primary">${product.price.toLocaleString()}</span>
            </div>
          </div>

          {/* Purchase Benefits */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h5 className="font-semibold text-blue-900 mb-2">Your Purchase Includes:</h5>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>✓ Free worldwide shipping</li>
              <li>✓ 30-day money-back guarantee</li>
              <li>✓ 2-year manufacturer warranty</li>
              <li>✓ 24/7 premium support</li>
              <li>✓ Gaming accessories bundle</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              onClick={handlePurchase}
              disabled={!isFormValid || isProcessing}
              className="flex-1"
              size="lg"
            >
              {isProcessing ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                <>🚀 Complete Purchase</>
              )}
            </Button>
            <Button variant="outline" onClick={onClose} size="lg">
              Cancel
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            By completing your purchase, you agree to our Terms of Service and Privacy Policy.
            All transactions are secured with enterprise-grade encryption.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}