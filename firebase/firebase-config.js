// ============================================
// TECH HUB - Firebase Configuration
// ============================================

// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

// Your Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdjvP3rdz60el3RPvI2AP5H2LQgnIEwMY",
  authDomain: "tech-hub-8088a.firebaseapp.com",
  projectId: "tech-hub-8088a",
  storageBucket: "tech-hub-8088a.firebasestorage.app",
  messagingSenderId: "792429684960",
  appId: "1:792429684960:web:e9a5681688f14352c78885",
  measurementId: "G-GEDXV1C21F"
};

// Initialize Firebase
let app, auth, db, storage;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
  
  console.log('✅ Firebase initialized successfully');
  console.log('Auth instance:', auth);
  console.log('DB instance:', db);
} catch (error) {
  console.error('❌ Firebase initialization error:', error);
  alert('Firebase initialization failed. Please check console for details.');
}

// Export Firebase services
export { auth, db, storage, app };

// For non-module scripts (fallback)
if (typeof window !== 'undefined') {
  window.firebaseApp = app;
  window.firebaseAuth = auth;
  window.firebaseDB = db;
  window.firebaseStorage = storage;
  console.log('✅ Firebase exposed to window object');
}
