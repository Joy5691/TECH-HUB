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
  checkAuthState();
}

// Check authentication state and update UI
function checkAuthState() {
  if (window.authManager) {
    const user = window.authManager.getCurrentUser();
    updateAuthUI(user);
  }
}

// Update UI based on auth state
function updateAuthUI(user) {
  const userIcon = document.querySelector('.nav-icon .fa-user');
  if (userIcon) {
    if (user) {
      userIcon.parentElement.title = user.displayName || user.email;
      // Could add a dropdown menu here
    } else {
      userIcon.parentElement.title = 'Login / Register';
    }
  }
}

// Update cart count in navigation
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCount = document.getElementById('cartCount');
  if (cartCount) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
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
  const query = searchInput ? searchInput.value.trim() : '';
  
  if (query) {
    // Get the correct path based on current location
    const currentPath = window.location.pathname;
    let targetPath = '';
    
    if (currentPath.includes('/pages/')) {
      if (currentPath.includes('/user/')) {
        targetPath = '../products/listing.html';
      } else if (currentPath.includes('/products/')) {
        targetPath = 'listing.html';
      } else {
        targetPath = '../products/listing.html';
      }
    } else {
      targetPath = 'pages/products/listing.html';
    }
    
    window.location.href = `${targetPath}?search=${encodeURIComponent(query)}`;
  }
}

// Add to cart with login check
function addToCart(productId, productName, productPrice) {
  if (window.cartManager) {
    window.cartManager.addItem({
      id: productId,
      name: productName,
      price: productPrice,
      image: '🛒'
    });
  } else {
    // Fallback if cart manager not loaded
    if (window.authManager && !window.authManager.isLoggedIn()) {
      alert('Please login to add items to cart');
      const currentUrl = encodeURIComponent(window.location.href);
      window.location.href = `/pages/user/login.html?redirect=${currentUrl}`;
      return;
    }
    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: productId,
        name: productName,
        price: productPrice,
        image: '🛒',
        quantity: 1
      });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert('✅ Product added to cart!');
  }
}

// Make globally accessible
window.performSearch = performSearch;
window.addToCart = addToCart;

// Load featured products on homepage
function loadFeaturedProducts() {
  const container = document.getElementById('featuredProducts');
  if (!container) return;

  const products = window.productManager ? 
    window.productManager.getSampleProducts().slice(0, 8) : 
    [];

  if (products.length === 0) return;

  container.innerHTML = products.map((product, index) => `
    <div class="card hover-lift" style="animation: fadeInUp 0.6s ease ${index * 0.1}s both;">
      ${product.discount > 0 ? `<div class="discount-badge">-${product.discount}%</div>` : ''}
      <div class="card-img" style="display: flex; align-items: center; justify-content: center; font-size: 5rem;">
        ${product.image}
      </div>
      <div class="card-body">
        <h3 class="card-title">${product.name}</h3>
        <div style="margin: 1rem 0;">
          <span class="price">৳${product.price.toLocaleString()}</span>
          ${product.oldPrice ? `<span class="price-old">৳${product.oldPrice.toLocaleString()}</span>` : ''}
        </div>
        <div style="display: flex; gap: 0.5rem;">
          <button class="btn btn-red" style="flex: 1;" onclick="addToCart('${product.id}', '${product.name}', ${product.price})">
            <i class="fas fa-cart-plus"></i> Add
          </button>
          <button class="btn btn-outline" onclick="window.location.href='pages/products/detail.html?id=${product.id}'">
            <i class="fas fa-eye"></i>
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

  const products = window.productManager ? 
    window.productManager.getSampleProducts()
      .filter(p => p.discount > 0)
      .sort((a, b) => b.discount - a.discount)
      .slice(0, 4) : 
    [];

  if (products.length === 0) return;

  container.innerHTML = products.map(product => `
    <div class="card hover-lift">
      <div class="discount-badge">-${product.discount}%</div>
      <div class="card-img" style="display: flex; align-items: center; justify-content: center; font-size: 5rem;">
        ${product.image}
      </div>
      <div class="card-body">
        <h3 class="card-title">${product.name}</h3>
        <div style="margin: 1rem 0;">
          <span class="price">৳${product.price.toLocaleString()}</span>
          <span class="price-old">৳${product.oldPrice.toLocaleString()}</span>
        </div>
        <button class="btn btn-red" style="width: 100%;" onclick="addToCart('${product.id}', '${product.name}', ${product.price})">
          <i class="fas fa-cart-plus"></i> Add to Cart
        </button>
      </div>
    </div>
  `).join('');
}
