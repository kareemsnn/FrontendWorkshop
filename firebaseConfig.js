// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

// Your web app's Firebase configuration
// This is for learning purposes, don't keep your firebase config in the code. Hide it in a .env file.
const firebaseConfig = {
  apiKey: "AIzaSyDHXhC491igYXagTVKcRm6--vkzNdzWN-k",
  authDomain: "workshop-eafa6.firebaseapp.com",
  projectId: "workshop-eafa6",
  storageBucket: "workshop-eafa6.appspot.com",
  messagingSenderId: "799104353818",
  appId: "1:799104353818:web:efb7805203dd599a2733a3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export { firestore };