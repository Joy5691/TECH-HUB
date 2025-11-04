// ============================================
// TECH HUB - Main JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 TECH HUB Initialized');
    initializeApp();
});

function initializeApp() {
    updateCartCount();
    updateCompareCount();
    loadFeaturedProducts();
    loadHotDeals();
    initializeScrollAnimations();
    initializeSearch();
}

// Update cart count in navigation
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// Update compare count in navigation
function updateCompareCount() {
    const compareList = JSON.parse(localStorage.getItem('compareList')) || [];
    const compareCount = document.getElementById('compareCount');
    if (compareCount) {
        compareCount.textContent = compareList.length;
    }
}

// Initialize scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card, .section-header').forEach(el => {
        if (!el.classList.contains('animate-scale-in')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        }
    });
}

// Initialize search functionality
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

// Perform search
function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim();
    
    if (query) {
        window.location.href = `pages/products/listing.html?search=${encodeURIComponent(query)}`;
    }
}

// Load featured products
function loadFeaturedProducts() {
    const container = document.getElementById('featuredProducts');
    if (!container) return;

    // Sample products (replace with Firebase data later)
    const products = [
        {
            id: 1,
            name: 'AMD Ryzen 7 7700 Budget Gaming Desktop PC',
            price: 57999,
            oldPrice: 60850,
            discount: 5,
            image: '💻',
            category: 'desktop'
        },
        {
            id: 2,
            name: 'MSI GeForce RTX 5090 32G VENTUS 3X OC Graphics Card',
            price: 309900,
            oldPrice: null,
            discount: 0,
            image: '🎮',
            category: 'gaming'
        },
        {
            id: 3,
            name: 'AOC AGON PRO AG276FK 27" 520Hz Gaming Monitor',
            price: 80000,
            oldPrice: 85000,
            discount: 6,
            image: '🖥️',
            category: 'accessories'
        },
        {
            id: 4,
            name: 'Gree 1.5 Ton Inverter Air Conditioner',
            price: 63990,
            oldPrice: 79390,
            discount: 19,
            image: '❄️',
            category: 'appliance'
        },
        {
            id: 5,
            name: 'ASUS Vivobook 15 X1504VA Core i3 13th Gen Laptop',
            price: 58500,
            oldPrice: 62000,
            discount: 6,
            image: '💻',
            category: 'laptop'
        },
        {
            id: 6,
            name: 'Samsung Galaxy S24 Ultra 5G Smartphone',
            price: 145000,
            oldPrice: null,
            discount: 0,
            image: '📱',
            category: 'phone'
        },
        {
            id: 7,
            name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
            price: 32000,
            oldPrice: 35000,
            discount: 9,
            image: '🎧',
            category: 'accessories'
        },
        {
            id: 8,
            name: 'Logitech MX Master 3S Wireless Mouse',
            price: 9500,
            oldPrice: 11000,
            discount: 14,
            image: '🖱️',
            category: 'accessories'
        }
    ];

    container.innerHTML = products.map((product, index) => `
        <div class="card hover-lift animate-fade-in-up stagger-${(index % 6) + 1}" style="position: relative;">
            ${product.discount > 0 ? `<div class="discount-badge">-${product.discount}%</div>` : ''}
            <div class="card-img" style="display: flex; align-items: center; justify-content: center; font-size: 5rem;">
                ${product.image}
            </div>
            <div class="card-body">
                <h3 class="card-title">${product.name}</h3>
                <div style="margin: 1rem 0;">
                    <span class="price">${product.price.toLocaleString()}৳</span>
                    ${product.oldPrice ? `<span class="price-old">${product.oldPrice.toLocaleString()}৳</span>` : ''}
                </div>
                <div style="display: flex; gap: 0.5rem;">
                    <button class="btn btn-red" style="flex: 1;" onclick="addToCart(${product.id}, '${product.name}', ${product.price})">
                        <i class="fas fa-cart-plus"></i> Add to Cart
                    </button>
                    <button class="btn btn-outline" onclick="addToCompare(${product.id})" title="Compare">
                        <i class="fas fa-exchange-alt"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Load hot deals
function loadHotDeals() {
    const container = document.getElementById('hotDeals');
    if (!container) return;

    const deals = [
        { id: 101, name: 'Starlink Mini Kit', price: 23850, oldPrice: 26500, discount: 10, image: '📡' },
        { id: 102, name: 'Starlink Standard Kit', price: 44550, oldPrice: 49500, discount: 10, image: '📡' },
        { id: 103, name: 'SanDisk 6TB External Hard Drive', price: 56000, oldPrice: 60000, discount: 7, image: '💾' },
        { id: 104, name: 'AMD Ryzen 5 3400G Desktop PC', price: 25200, oldPrice: 26050, discount: 3, image: '💻' }
    ];

    container.innerHTML = deals.map(deal => `
        <div class="card hover-lift animate-glow">
            <div class="discount-badge">🔥 -${deal.discount}%</div>
            <div class="card-img" style="display: flex; align-items: center; justify-content: center; font-size: 5rem;">
                ${deal.image}
            </div>
            <div class="card-body">
                <h3 class="card-title">${deal.name}</h3>
                <div style="margin: 1rem 0;">
                    <span class="price">${deal.price.toLocaleString()}৳</span>
                    <span class="price-old">${deal.oldPrice.toLocaleString()}৳</span>
                </div>
                <button class="btn btn-red" style="width: 100%;" onclick="addToCart(${deal.id}, '${deal.name}', ${deal.price})">
                    <i class="fas fa-shopping-bag"></i> Buy Now
                </button>
            </div>
        </div>
    `).join('');
}

// Add to cart function
function addToCart(productId, productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if product already exists
    const existingProduct = cart.find(item => item.id === productId);
    
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification('✅ Product added to cart!', 'success');
}

// Add to compare function
function addToCompare(productId) {
    let compareList = JSON.parse(localStorage.getItem('compareList')) || [];
    
    if (compareList.includes(productId)) {
        showNotification('⚠️ Product already in compare list!', 'warning');
        return;
    }
    
    if (compareList.length >= 4) {
        showNotification('⚠️ You can compare maximum 4 products!', 'warning');
        return;
    }
    
    compareList.push(productId);
    localStorage.setItem('compareList', JSON.stringify(compareList));
    updateCompareCount();
    showNotification('✅ Product added to compare list!', 'success');
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    const bgColor = type === 'success' ? 'var(--success)' : type === 'warning' ? 'var(--warning)' : 'var(--primary-red)';
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 1rem 2rem;
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        z-index: 9999;
        animation: slideInRight 0.3s ease;
        font-weight: 500;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Newsletter subscription
function subscribeNewsletter(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    
    // Here you would typically send this to your backend/Firebase
    console.log('Newsletter subscription:', email);
    
    showNotification('🎉 Thank you for subscribing!', 'success');
    event.target.reset();
}

// Make functions globally accessible
window.addToCart = addToCart;
window.addToCompare = addToCompare;
window.performSearch = performSearch;
window.subscribeNewsletter = subscribeNewsletter;
