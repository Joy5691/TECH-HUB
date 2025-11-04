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
                <div style="text-align: center; padding: 3rem; grid-column: 1/-1;">
                    <i class="fas fa-shopping-cart" style="font-size: 5rem; color: var(--gray); margin-bottom: 1rem;"></i>
                    <h2>Your cart is empty</h2>
                    <p style="color: var(--gray); margin: 1rem 0;">Add some products to get started!</p>
                    <a href="../products/listing.html" class="btn btn-red">Start Shopping</a>
                </div>
            `;
            if (cartTotal) cartTotal.textContent = '0';
            if (cartSubtotal) cartSubtotal.textContent = '0';
            return;
        }

        cartContainer.innerHTML = this.cart.map(item => `
            <div class="card" style="display: flex; align-items: center; padding: 1rem; gap: 1rem;">
                <div style="font-size: 3rem; width: 80px; text-align: center;">
                    ${item.image}
                </div>
                <div style="flex: 1;">
                    <h3>${item.name}</h3>
                    <p style="color: var(--primary-red); font-weight: 600; font-size: 1.2rem;">${item.price.toLocaleString()}৳</p>
                </div>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <button class="btn btn-outline" style="padding: 0.5rem 0.75rem;" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span style="min-width: 30px; text-align: center; font-weight: 600;">${item.quantity}</span>
                    <button class="btn btn-outline" style="padding: 0.5rem 0.75rem;" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <div style="font-weight: 700; font-size: 1.2rem; min-width: 100px; text-align: right;">
                    ${(item.price * item.quantity).toLocaleString()}৳
                </div>
                <button class="btn btn-outline" style="color: var(--danger); border-color: var(--danger);" onclick="cart.removeItem(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');

        const total = this.getTotal();
        if (cartTotal) cartTotal.textContent = total.toLocaleString();
        if (cartSubtotal) cartSubtotal.textContent = total.toLocaleString();
    }
}

// Initialize cart
const cart = new ShoppingCart();

// Make cart globally accessible
window.cart = cart;
