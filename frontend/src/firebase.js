import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
    apiKey: "AIzaSyComysS_Ihxy_s3yCgfdPl5ZxAEGkm2qXI",
    authDomain: "homelive-3bba0.firebaseapp.com",
    projectId: "homelive-3bba0",
    storageBucket: "homelive-3bba0.appspot.com",
    messagingSenderId: "950282064835",
    appId: "1:950282064835:web:675a287266d740542e2376",
    measurementId: "G-J82GMTHDX8"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Inicializa db aquí

// Exporta auth y db
export { auth, db };
