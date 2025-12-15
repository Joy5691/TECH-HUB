// ============================================
// TECH HUB - Product Operations
// ============================================

class ProductManager {
  constructor() {
    this.products = [];
    this.categories = ['laptop', 'desktop', 'phone', 'gaming', 'accessories'];
    this.useFirebase = false;
  }

  // Sample product data with 20+ products
  getSampleProducts() {
    return [
      // Laptops
      {
        id: '1',
        name: 'Apple MacBook Pro 16" M3 Max',
        price: 285000,
        oldPrice: 299000,
        discount: 5,
        image: '💻',
        category: 'laptop',
        description: 'Professional laptop with M3 Max chip, 32GB RAM, stunning Retina display',
        specs: 'M3 Max, 32GB RAM, 1TB SSD, 16" Retina Display',
        inStock: true
      },
      {
        id: '2',
        name: 'ASUS Vivobook 15 X1504VA Core i3 13th Gen',
        price: 58500,
        oldPrice: 62000,
        discount: 6,
        image: '💻',
        category: 'laptop',
        description: 'Affordable laptop for everyday computing',
        specs: 'Intel Core i3 13th Gen, 8GB RAM, 512GB SSD, 15.6" FHD',
        inStock: true
      },
      {
        id: '3',
        name: 'Dell XPS 13 Plus Core i7 12th Gen',
        price: 145000,
        oldPrice: 155000,
        discount: 6,
        image: '💻',
        category: 'laptop',
        description: 'Ultra-portable premium laptop',
        specs: 'Intel Core i7, 16GB RAM, 512GB SSD, 13.4" FHD+',
        inStock: true
      },
      {
        id: '4',
        name: 'HP Pavilion Gaming 15 Ryzen 5',
        price: 72000,
        oldPrice: 78000,
        discount: 8,
        image: '💻',
        category: 'laptop',
        description: 'Gaming laptop with dedicated graphics',
        specs: 'AMD Ryzen 5, 8GB RAM, 512GB SSD, GTX 1650, 15.6" FHD',
        inStock: true
      },
      {
        id: '5',
        name: 'Lenovo ThinkPad E14 Gen 4',
        price: 95000,
        oldPrice: null,
        discount: 0,
        image: '💻',
        category: 'laptop',
        description: 'Business laptop with military-grade durability',
        specs: 'Intel Core i5 12th Gen, 16GB RAM, 512GB SSD, 14" FHD',
        inStock: true
      },

      // Desktops
      {
        id: '6',
        name: 'AMD Ryzen 7 7700 Budget Gaming Desktop PC',
        price: 57999,
        oldPrice: 60850,
        discount: 5,
        image: '🖥️',
        category: 'desktop',
        description: 'Powerful gaming desktop with AMD Ryzen 7',
        specs: 'AMD Ryzen 7 7700, 16GB RAM, 512GB SSD, RTX 3060 Ti',
        inStock: true
      },
      {
        id: '7',
        name: 'Intel Core i9 13900K Extreme Gaming PC',
        price: 185000,
        oldPrice: 195000,
        discount: 5,
        image: '🖥️',
        category: 'desktop',
        description: 'High-end gaming and content creation powerhouse',
        specs: 'Intel i9 13900K, 32GB DDR5, 1TB NVMe, RTX 4080',
        inStock: true
      },
      {
        id: '8',
        name: 'Apple Mac Mini M2 Pro',
        price: 125000,
        oldPrice: null,
        discount: 0,
        image: '🖥️',
        category: 'desktop',
        description: 'Compact desktop with M2 Pro chip',
        specs: 'M2 Pro, 16GB RAM, 512GB SSD',
        inStock: true
      },

      // Phones
      {
        id: '9',
        name: 'Samsung Galaxy S24 Ultra 5G',
        price: 145000,
        oldPrice: null,
        discount: 0,
        image: '📱',
        category: 'phone',
        description: 'Flagship smartphone with S Pen',
        specs: 'Snapdragon 8 Gen 3, 12GB RAM, 256GB, 200MP Camera',
        inStock: true
      },
      {
        id: '10',
        name: 'iPhone 15 Pro Max',
        price: 165000,
        oldPrice: 175000,
        discount: 6,
        image: '📱',
        category: 'phone',
        description: 'Apple flagship with titanium design',
        specs: 'A17 Pro, 256GB, ProMotion, Action Button',
        inStock: true
      },
      {
        id: '11',
        name: 'Google Pixel 8 Pro',
        price: 92000,
        oldPrice: 98000,
        discount: 6,
        image: '📱',
        category: 'phone',
        description: 'Pure Android experience with AI features',
        specs: 'Google Tensor G3, 12GB RAM, 128GB',
        inStock: true
      },
      {
        id: '12',
        name: 'OnePlus 12 5G',
        price: 78000,
        oldPrice: 82000,
        discount: 5,
        image: '📱',
        category: 'phone',
        description: 'Fast charging flagship killer',
        specs: 'Snapdragon 8 Gen 3, 16GB RAM, 256GB',
        inStock: true
      },
      {
        id: '13',
        name: 'Xiaomi 14 Pro',
        price: 68000,
        oldPrice: 72000,
        discount: 6,
        image: '📱',
        category: 'phone',
        description: 'Premium features at mid-range price',
        specs: 'Snapdragon 8 Gen 3, 12GB RAM, Leica Camera',
        inStock: true
      },

      // Gaming
      {
        id: '14',
        name: 'MSI GeForce RTX 5090 32G VENTUS 3X OC',
        price: 309900,
        oldPrice: null,
        discount: 0,
        image: '🎮',
        category: 'gaming',
        description: 'Top-tier graphics card for extreme gaming',
        specs: '32GB GDDR6X, DLSS 4.0, 500W TDP, PCIe 5.0',
        inStock: true
      },
      {
        id: '15',
        name: 'PlayStation 5 Slim Digital Edition',
        price: 52000,
        oldPrice: 55000,
        discount: 5,
        image: '🎮',
        category: 'gaming',
        description: 'Next-gen gaming console',
        specs: '1TB SSD, 4K Gaming, DualSense Controller',
        inStock: true
      },
      {
        id: '16',
        name: 'Xbox Series X 1TB',
        price: 54000,
        oldPrice: null,
        discount: 0,
        image: '🎮',
        category: 'gaming',
        description: 'Powerful 4K gaming console',
        specs: '1TB SSD, 4K 120fps, Game Pass Compatible',
        inStock: true
      },
      {
        id: '17',
        name: 'Razer DeathAdder V3 Pro Wireless Gaming Mouse',
        price: 12500,
        oldPrice: 14000,
        discount: 11,
        image: '🎮',
        category: 'gaming',
        description: 'Professional esports-grade mouse',
        specs: '30K DPI, 90hr Battery, HyperSpeed Wireless',
        inStock: true
      },

      // Accessories
      {
        id: '18',
        name: 'AOC AGON PRO AG276FK 27" 520Hz Gaming Monitor',
        price: 80000,
        oldPrice: 85000,
        discount: 6,
        image: '🖥️',
        category: 'accessories',
        description: 'Ultra-fast competitive gaming monitor',
        specs: '27" FHD, 520Hz, 0.5ms, G-Sync',
        inStock: true
      },
      {
        id: '19',
        name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
        price: 32000,
        oldPrice: 35000,
        discount: 9,
        image: '🎧',
        category: 'accessories',
        description: 'Industry-leading noise cancellation',
        specs: '30hr Battery, LDAC, Multipoint Connection',
        inStock: true
      },
      {
        id: '20',
        name: 'Logitech MX Master 3S Wireless Mouse',
        price: 9500,
        oldPrice: 11000,
        discount: 14,
        image: '🖱️',
        category: 'accessories',
        description: 'Premium productivity mouse',
        specs: '8K DPI, MagSpeed Wheel, Multi-Device',
        inStock: true
      },
      {
        id: '21',
        name: 'Keychron Q1 Pro Mechanical Keyboard',
        price: 18500,
        oldPrice: 21000,
        discount: 12,
        image: '⌨️',
        category: 'accessories',
        description: 'Premium wireless mechanical keyboard',
        specs: 'QMK/VIA, Hot-swappable, RGB Backlight',
        inStock: true
      },
      {
        id: '22',
        name: 'Samsung 970 EVO Plus 1TB NVMe SSD',
        price: 11500,
        oldPrice: 13000,
        discount: 12,
        image: '💾',
        category: 'accessories',
        description: 'High-speed NVMe storage',
        specs: '1TB, 3500MB/s Read, PCIe 3.0',
        inStock: true
      },
      {
        id: '23',
        name: 'Logitech C920 HD Pro Webcam',
        price: 7500,
        oldPrice: 8500,
        discount: 12,
        image: '📷',
        category: 'accessories',
        description: 'Full HD webcam for streaming',
        specs: '1080p 30fps, Stereo Audio, Auto Focus',
        inStock: true
      },
      {
        id: '24',
        name: 'TP-Link Archer AX73 AX5400 Wi-Fi 6 Router',
        price: 12000,
        oldPrice: null,
        discount: 0,
        image: '📡',
        category: 'accessories',
        description: 'Next-gen Wi-Fi 6 router',
        specs: 'AX5400, Dual-Band, 6 Antennas, OneMesh',
        inStock: true
      },
      {
        id: '25',
        name: 'Anker PowerCore 26800mAh Power Bank',
        price: 4500,
        oldPrice: 5200,
        discount: 13,
        image: '🔋',
        category: 'accessories',
        description: 'High-capacity portable charger',
        specs: '26800mAh, 3 USB Ports, Fast Charge',
        inStock: true
      }
    ];
  }

  async getProducts() {
    if (this.useFirebase && window.databaseManager) {
      try {
        const products = await window.databaseManager.getProducts();
        this.products = products;
        return products.length > 0 ? products : this.getSampleProducts();
      } catch (error) {
        console.error('Error fetching products from Firebase:', error);
        return this.getSampleProducts();
      }
    }
    return this.getSampleProducts();
  }

  getProductById(id) {
    return this.getSampleProducts().find(p => p.id === String(id));
  }

  getProductsByCategory(category) {
    return this.getSampleProducts().filter(p => p.category === category);
  }

  searchProducts(query) {
    const lowerQuery = query.toLowerCase();
    return this.getSampleProducts().filter(p => 
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery)
    );
  }

  filterProducts(filters) {
    let filtered = this.getSampleProducts();
    
    if (filters.category) {
      filtered = filtered.filter(p => p.category === filters.category);
    }
    
    if (filters.minPrice) {
      filtered = filtered.filter(p => p.price >= filters.minPrice);
    }
    
    if (filters.maxPrice) {
      filtered = filtered.filter(p => p.price <= filters.maxPrice);
    }
    
    if (filters.inStock) {
      filtered = filtered.filter(p => p.inStock);
    }
    
    return filtered;
  }

  sortProducts(products, sortBy) {
    switch(sortBy) {
      case 'price-low':
        return products.sort((a, b) => a.price - b.price);
      case 'price-high':
        return products.sort((a, b) => b.price - a.price);
      case 'name':
        return products.sort((a, b) => a.name.localeCompare(b.name));
      case 'discount':
        return products.sort((a, b) => b.discount - a.discount);
      default:
        return products;
    }
  }

  enableFirebase() {
    this.useFirebase = true;
  }
}

// Initialize product manager
const productManager = new ProductManager();

if (typeof window !== 'undefined') {
  window.productManager = productManager;
  
  if (window.databaseManager) {
    productManager.enableFirebase();
  }
}
