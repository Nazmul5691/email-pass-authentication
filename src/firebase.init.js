// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBW9AGtWQVNhLj_lpjZwcSKiMJICpiNwdo",
  authDomain: "email-pass-auth-b5ffe.firebaseapp.com",
  projectId: "email-pass-auth-b5ffe",
  storageBucket: "email-pass-auth-b5ffe.firebasestorage.app",
  messagingSenderId: "625322334821",
  appId: "1:625322334821:web:725e8e2e514fa381c6848c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);