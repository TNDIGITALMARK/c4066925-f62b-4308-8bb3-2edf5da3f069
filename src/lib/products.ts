export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: 'phone' | 'laptop';
  featured: boolean;
  specs: {
    processor: string;
    memory: string;
    storage: string;
    display: string;
    graphics?: string;
    battery?: string;
    camera?: string;
    cooling?: string;
  };
}

export const products: Product[] = [
  {
    id: 'titan-gaming-laptop',
    name: 'Titan Gaming Laptop',
    tagline: 'Desktop Power, Mobile Freedom',
    price: 6999,
    originalPrice: 7499,
    image: '/generated/titan-gaming-laptop-hero.png',
    category: 'laptop',
    featured: true,
    specs: {
      processor: 'Intel i9-13900HX',
      memory: '32GB DDR5',
      storage: '2TB NVMe SSD',
      display: '15.6" 240Hz QHD',
      graphics: 'RTX 4090 Desktop GPU',
      cooling: 'Vapor Chamber + Liquid Metal',
    }
  },
  {
    id: 'vortex-pro-phone',
    name: 'Vortex Pro Gaming Phone',
    tagline: 'Mobile Gaming Perfection',
    price: 2499,
    image: '/generated/vortex-pro-phone.png',
    category: 'phone',
    featured: true,
    specs: {
      processor: 'Snapdragon 8 Gen 3',
      memory: '16GB LPDDR5X',
      storage: '512GB UFS 4.0',
      display: '6.8" 144Hz AMOLED',
      camera: '200MP Triple Camera',
      battery: '6000mAh + 120W Charging',
    }
  },
  {
    id: 'apex-ultra-phone',
    name: 'Apex Ultra Gaming Phone',
    tagline: 'The Ultimate Gaming Experience',
    price: 3299,
    image: '/generated/apex-ultra-phone.png',
    category: 'phone',
    featured: true,
    specs: {
      processor: 'MediaTek Dimensity 9300',
      memory: '18GB LPDDR5X',
      storage: '1TB UFS 4.0',
      display: '6.9" 165Hz AMOLED',
      camera: '108MP Quad Camera',
      battery: '6500mAh + 150W Charging',
    }
  },
  {
    id: 'storm-workstation-laptop',
    name: 'Storm Workstation Laptop',
    tagline: 'Professional Gaming Powerhouse',
    price: 4999,
    image: '/generated/storm-workstation-laptop.png',
    category: 'laptop',
    featured: true,
    specs: {
      processor: 'AMD Ryzen 9 7945HX',
      memory: '64GB DDR5',
      storage: '4TB NVMe SSD',
      display: '17.3" 4K OLED',
      graphics: 'RTX 4080 Desktop GPU',
      cooling: 'Dual-Fan Thermal Management',
    }
  }
];

export const heroProduct = products.find(p => p.id === 'titan-gaming-laptop')!;
export const featuredProducts = products.filter(p => p.featured && p.id !== 'titan-gaming-laptop');