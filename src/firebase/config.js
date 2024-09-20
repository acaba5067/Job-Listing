import { initializeApp } from "firebase/app";
import { getFirestore, collection, where, query, addDoc, serverTimestamp, getDocs } from "firebase/firestore";

// Your Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyDFDmvgDr6bgo8-I0TkrqqQScfbXqMeM6o",
    authDomain: "react-54212.firebaseapp.com",
    projectId: "react-54212",
    storageBucket: "react-54212.appspot.com",
    messagingSenderId: "293538396680",
    appId: "1:293538396680:web:cf007ec2b43f8501eb6fbd",
    measurementId: "G-072F2625K6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

// Export the necessary functions for use elsewhere
export { app, firestore, collection, addDoc, where, query, serverTimestamp, getDocs };
