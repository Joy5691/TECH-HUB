// ============================================
// TECH HUB - Shopping Cart Logic
// ============================================

class ShoppingCart {
  constructor() {
    this.cart = this.loadCart();
  }

  loadCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
  }

  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.updateCartUI();
  }

  addItem(product) {
    // Check if user is logged in
    if (window.authManager && !window.authManager.isLoggedIn()) {
      const currentUrl = encodeURIComponent(window.location.href);
      alert('Please login to add items to cart');
      window.location.href = `/pages/user/login.html?redirect=${currentUrl}`;
      return false;
    }

    const existingItem = this.cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image || '🛒',
        quantity: 1
      });
    }
    
    this.saveCart();
    alert('✅ Product added to cart!');
    return true;
  }

  removeItem(productId) {
    this.cart = this.cart.filter(item => item.id !== productId);
    this.saveCart();
  }

  updateQuantity(productId, quantity) {
    const item = this.cart.find(item => item.id === productId);
    if (item) {
      if (quantity <= 0) {
        this.removeItem(productId);
      } else {
        item.quantity = quantity;
        this.saveCart();
      }
    }
  }

  getCart() {
    return this.cart;
  }

  getTotal() {
    return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getItemCount() {
    return this.cart.reduce((count, item) => count + item.quantity, 0);
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
  }

  updateCartUI() {
    // Update cart count in navigation
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
      cartCount.textContent = this.getItemCount();
    }

    // Update cart page if it exists
    const cartContainer = document.getElementById('cartItems');
    if (cartContainer) {
      this.renderCartItems();
    }
  }

  renderCartItems() {
    const cartContainer = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartSubtotal = document.getElementById('cartSubtotal');
    
    if (!cartContainer) return;

    if (this.cart.length === 0) {
      cartContainer.innerHTML = `
        <div style="text-align: center; padding: 3rem;">
          <div style="font-size: 4rem; margin-bottom: 1rem;">🛒</div>
          <h3>Your cart is empty</h3>
          <p style="color: var(--gray); margin-bottom: 2rem;">Add some products to get started!</p>
          <a href="../products/listing.html" class="btn btn-red">
            <i class="fas fa-shopping-bag"></i> Start Shopping
          </a>
        </div>
      `;
      return;
    }

    cartContainer.innerHTML = this.cart.map(item => `
      <div class="cart-item" style="display: flex; gap: 1rem; padding: 1.5rem; border-bottom: 1px solid var(--light-gray); align-items: center;">
        <div style="font-size: 3rem;">${item.image}</div>
        <div style="flex: 1;">
          <h4 style="margin-bottom: 0.5rem;">${item.name}</h4>
          <p style="color: var(--primary-red); font-weight: 600; font-size: 1.1rem;">৳${item.price.toLocaleString()}</p>
        </div>
        <div style="display: flex; gap: 0.5rem; align-items: center;">
          <button class="btn btn-outline" style="padding: 0.5rem 0.75rem;" onclick="cartManager.updateQuantity('${item.id}', ${item.quantity - 1})">
            <i class="fas fa-minus"></i>
          </button>
          <span style="min-width: 30px; text-align: center; font-weight: 600;">${item.quantity}</span>
          <button class="btn btn-outline" style="padding: 0.5rem 0.75rem;" onclick="cartManager.updateQuantity('${item.id}', ${item.quantity + 1})">
            <i class="fas fa-plus"></i>
          </button>
        </div>
        <div style="font-weight: 700; font-size: 1.2rem; min-width: 120px; text-align: right;">
          ৳${(item.price * item.quantity).toLocaleString()}
        </div>
        <button class="btn btn-outline" style="padding: 0.5rem 0.75rem; color: var(--danger);" onclick="cartManager.removeItem('${item.id}')">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `).join('');

    const total = this.getTotal();
    
    if (cartTotal) cartTotal.textContent = `৳${total.toLocaleString()}`;
    if (cartSubtotal) cartSubtotal.textContent = `৳${total.toLocaleString()}`;
  }
}

// Initialize cart manager
const cartManager = new ShoppingCart();

// Make globally accessible
window.cartManager = cartManager;

// Update cart count on page load
document.addEventListener('DOMContentLoaded', function() {
  cartManager.updateCartUI();
});
