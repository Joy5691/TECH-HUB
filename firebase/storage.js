// ============================================
// TECH HUB - Firebase Storage Operations
// ============================================

import { storage } from './firebase-config.js';
import { 
    ref, 
    uploadBytes, 
    getDownloadURL, 
    deleteObject,
    listAll
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

class StorageManager {
    constructor() {
        this.folders = {
            products: 'products',
            users: 'users',
            categories: 'categories'
        };
    }

    async uploadProductImage(file, productId) {
        try {
            const timestamp = Date.now();
            const fileName = `${productId}_${timestamp}_${file.name}`;
            const storageRef = ref(storage, `${this.folders.products}/${fileName}`);
            
            const snapshot = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);
            
            console.log('✅ Image uploaded successfully');
            return { success: true, url: downloadURL };
        } catch (error) {
            console.error('Error uploading image:', error);
            return { success: false, error: error.message };
        }
    }

    async uploadUserAvatar(file, userId) {
        try {
            const fileName = `${userId}_avatar.jpg`;
            const storageRef = ref(storage, `${this.folders.users}/${fileName}`);
            
            const snapshot = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);
            
            console.log('✅ Avatar uploaded successfully');
            return { success: true, url: downloadURL };
        } catch (error) {
            console.error('Error uploading avatar:', error);
            return { success: false, error: error.message };
        }
    }

    async deleteFile(filePath) {
        try {
            const fileRef = ref(storage, filePath);
            await deleteObject(fileRef);
            console.log('✅ File deleted successfully');
            return { success: true };
        } catch (error) {
            console.error('Error deleting file:', error);
            return { success: false, error: error.message };
        }
    }

    async getProductImages(productId) {
        try {
            const listRef = ref(storage, this.folders.products);
            const res = await listAll(listRef);
            
            const urls = await Promise.all(
                res.items
                    .filter(item => item.name.startsWith(productId))
                    .map(item => getDownloadURL(item))
            );
            
            return urls;
        } catch (error) {
            console.error('Error getting product images:', error);
            return [];
        }
    }

    validateImageFile(file) {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (!validTypes.includes(file.type)) {
            return { valid: false, error: 'Invalid file type. Please upload an image.' };
        }

        if (file.size > maxSize) {
            return { valid: false, error: 'File size too large. Maximum 5MB allowed.' };
        }

        return { valid: true };
    }
}

// Initialize storage manager
const storageManager = new StorageManager();

// Make globally accessible
window.storageManager = storageManager;

export default storageManager;
