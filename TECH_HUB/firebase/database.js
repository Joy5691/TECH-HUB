// ============================================
// TECH HUB - Firestore Database Operations
// ============================================

import { db } from './firebase-config.js';
import { 
    collection, 
    doc, 
    getDoc, 
    getDocs, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    query, 
    where, 
    orderBy,
    limit,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

class DatabaseManager {
    constructor() {
        this.collections = {
            products: 'products',
            orders: 'orders',
            users: 'users',
            categories: 'categories',
            reviews: 'reviews'
        };
    }

    // ========== PRODUCTS ==========
    async getProducts() {
        try {
            const querySnapshot = await getDocs(collection(db, this.collections.products));
            return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error('Error getting products:', error);
            return [];
        }
    }

    async getProductById(productId) {
        try {
            const docRef = doc(db, this.collections.products, productId);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                return { id: docSnap.id, ...docSnap.data() };
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error getting product:', error);
            return null;
        }
    }

    async getProductsByCategory(category) {
        try {
            const q = query(
                collection(db, this.collections.products),
                where('category', '==', category)
            );
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error('Error getting products by category:', error);
            return [];
        }
    }

    async addProduct(productData) {
        try {
            const docRef = await addDoc(collection(db, this.collections.products), {
                ...productData,
                createdAt: serverTimestamp()
            });
            console.log('✅ Product added with ID:', docRef.id);
            return { success: true, id: docRef.id };
        } catch (error) {
            console.error('Error adding product:', error);
            return { success: false, error: error.message };
        }
    }

    async updateProduct(productId, updates) {
        try {
            const docRef = doc(db, this.collections.products, productId);
            await updateDoc(docRef, {
                ...updates,
                updatedAt: serverTimestamp()
            });
            console.log('✅ Product updated');
            return { success: true };
        } catch (error) {
            console.error('Error updating product:', error);
            return { success: false, error: error.message };
        }
    }

    async deleteProduct(productId) {
        try {
            await deleteDoc(doc(db, this.collections.products, productId));
            console.log('✅ Product deleted');
            return { success: true };
        } catch (error) {
            console.error('Error deleting product:', error);
            return { success: false, error: error.message };
        }
    }

    // ========== ORDERS ==========
    async createOrder(orderData) {
        try {
            const docRef = await addDoc(collection(db, this.collections.orders), {
                ...orderData,
                status: 'pending',
                createdAt: serverTimestamp()
            });
            console.log('✅ Order created with ID:', docRef.id);
            return { success: true, orderId: docRef.id };
        } catch (error) {
            console.error('Error creating order:', error);
            return { success: false, error: error.message };
        }
    }

    async getOrdersByUser(userId) {
        try {
            const q = query(
                collection(db, this.collections.orders),
                where('userId', '==', userId),
                orderBy('createdAt', 'desc')
            );
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error('Error getting orders:', error);
            return [];
        }
    }

    async updateOrderStatus(orderId, status) {
        try {
            const docRef = doc(db, this.collections.orders, orderId);
            await updateDoc(docRef, {
                status: status,
                updatedAt: serverTimestamp()
            });
            console.log('✅ Order status updated');
            return { success: true };
        } catch (error) {
            console.error('Error updating order:', error);
            return { success: false, error: error.message };
        }
    }

    // ========== USERS ==========
    async createUserProfile(userId, userData) {
        try {
            const docRef = doc(db, this.collections.users, userId);
            await updateDoc(docRef, {
                ...userData,
                createdAt: serverTimestamp()
            });
            console.log('✅ User profile created');
            return { success: true };
        } catch (error) {
            console.error('Error creating user profile:', error);
            return { success: false, error: error.message };
        }
    }

    async getUserProfile(userId) {
        try {
            const docRef = doc(db, this.collections.users, userId);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                return { id: docSnap.id, ...docSnap.data() };
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error getting user profile:', error);
            return null;
        }
    }

    // ========== REVIEWS ==========
    async addReview(reviewData) {
        try {
            const docRef = await addDoc(collection(db, this.collections.reviews), {
                ...reviewData,
                createdAt: serverTimestamp()
            });
            console.log('✅ Review added');
            return { success: true, id: docRef.id };
        } catch (error) {
            console.error('Error adding review:', error);
            return { success: false, error: error.message };
        }
    }

    async getProductReviews(productId) {
        try {
            const q = query(
                collection(db, this.collections.reviews),
                where('productId', '==', productId),
                orderBy('createdAt', 'desc')
            );
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error('Error getting reviews:', error);
            return [];
        }
    }
}

// Initialize database manager
const databaseManager = new DatabaseManager();

// Make globally accessible
window.databaseManager = databaseManager;

export default databaseManager;
