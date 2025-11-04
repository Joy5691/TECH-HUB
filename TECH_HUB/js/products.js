// ============================================
// TECH HUB - Product Operations
// ============================================

class ProductManager {
    constructor() {
        this.products = [];
        this.categories = ['laptop', 'desktop', 'phone', 'gaming', 'accessories'];
    }

    // Sample product data (replace with Firebase later)
    getSampleProducts() {
        return [
            {
                id: 1,
                name: 'AMD Ryzen 7 7700 Budget Gaming Desktop PC',
                price: 57999,
                oldPrice: 60850,
                discount: 5,
                image: '💻',
                category: 'desktop',
                description: 'Powerful gaming desktop with AMD Ryzen 7 processor',
                specs: ['AMD Ryzen 7 7700', '16GB RAM', '512GB SSD', 'RTX 3060 Ti'],
                inStock: true
            },
            {
                id: 2,
                name: 'MSI GeForce RTX 5090 32G VENTUS 3X OC Graphics Card',
                price: 309900,
                oldPrice: null,
                discount: 0,
                image: '🎮',
                category: 'gaming',
                description: 'Top-tier graphics card for extreme gaming performance',
                specs: ['32GB GDDR6X', 'DLSS 4.0', '500W TDP', 'PCIe 5.0'],
                inStock: true
            },
            // Add more products...
        ];
    }

    getProductById(id) {
        return this.getSampleProducts().find(p => p.id === parseInt(id));
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
}

// Initialize product manager
const productManager = new ProductManager();

// Make globally accessible
window.productManager = productManager;
