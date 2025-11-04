// ============================================
// TECH HUB - Authentication Logic
// ============================================

import { auth } from './firebase-config.js';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile,
    sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

class AuthManager {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        // Monitor auth state
        onAuthStateChanged(auth, (user) => {
            this.currentUser = user;
            this.updateUIForAuthState(user);
        });
    }

    async register(email, password, displayName) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            
            // Update profile with display name
            await updateProfile(userCredential.user, {
                displayName: displayName
            });

            console.log('✅ User registered:', userCredential.user);
            return { success: true, user: userCredential.user };
        } catch (error) {
            console.error('❌ Registration error:', error);
            return { success: false, error: this.getErrorMessage(error.code) };
        }
    }

    async login(email, password) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('✅ User logged in:', userCredential.user);
            return { success: true, user: userCredential.user };
        } catch (error) {
            console.error('❌ Login error:', error);
            return { success: false, error: this.getErrorMessage(error.code) };
        }
    }

    async logout() {
        try {
            await signOut(auth);
            console.log('✅ User logged out');
            return { success: true };
        } catch (error) {
            console.error('❌ Logout error:', error);
            return { success: false, error: error.message };
        }
    }

    async resetPassword(email) {
        try {
            await sendPasswordResetEmail(auth, email);
            console.log('✅ Password reset email sent');
            return { success: true };
        } catch (error) {
            console.error('❌ Password reset error:', error);
            return { success: false, error: this.getErrorMessage(error.code) };
        }
    }

    isLoggedIn() {
        return this.currentUser !== null;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    updateUIForAuthState(user) {
        // Update navigation based on auth state
        const userIcon = document.querySelector('.nav-icon .fa-user');
        if (userIcon && user) {
            userIcon.parentElement.title = user.displayName || user.email;
        }

        // Redirect to login if on protected page and not logged in
        const protectedPages = ['/dashboard.html', '/profile.html', '/orders.html', '/checkout.html'];
        const currentPath = window.location.pathname;
        
        if (!user && protectedPages.some(page => currentPath.includes(page))) {
            window.location.href = '/pages/user/login.html';
        }
    }

    getErrorMessage(errorCode) {
        const errorMessages = {
            'auth/email-already-in-use': 'This email is already registered',
            'auth/invalid-email': 'Invalid email address',
            'auth/operation-not-allowed': 'Operation not allowed',
            'auth/weak-password': 'Password is too weak',
            'auth/user-disabled': 'This account has been disabled',
            'auth/user-not-found': 'No account found with this email',
            'auth/wrong-password': 'Incorrect password',
            'auth/too-many-requests': 'Too many attempts. Please try again later'
        };

        return errorMessages[errorCode] || 'An error occurred. Please try again.';
    }

    // Check if user is admin
    async isAdmin() {
        if (!this.currentUser) return false;
        
        // You would check this against your database
        // For now, we'll use a simple check
        const adminEmails = ['admin@techhub.com'];
        return adminEmails.includes(this.currentUser.email);
    }
}

// Initialize auth manager
const authManager = new AuthManager();

// Make globally accessible
window.authManager = authManager;

export default authManager;
