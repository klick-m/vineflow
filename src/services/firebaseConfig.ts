
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Config retrieved via Firebase MCP
const firebaseConfig = {
    apiKey: "AIzaSyBAtu-Uroy0PxOKntrnHNhESnjNJr2UUsw",
    authDomain: "vineflow-app-2025.firebaseapp.com",
    projectId: "vineflow-app-2025",
    storageBucket: "vineflow-app-2025.firebasestorage.app",
    messagingSenderId: "670333113476",
    appId: "1:670333113476:web:448b5fb1ff4b556c921ed1"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
