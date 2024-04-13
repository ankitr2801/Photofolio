// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhYDJS0TkEM5IUw3l9e37BdAElgZRY0CY",
  authDomain: "photofolio-50568.firebaseapp.com",
  projectId: "photofolio-50568",
  storageBucket: "photofolio-50568.appspot.com",
  messagingSenderId: "805679546168",
  appId: "1:805679546168:web:7fc6dc7becdddd2e918bcd",
  measurementId: "G-1V4SBJJT9P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);