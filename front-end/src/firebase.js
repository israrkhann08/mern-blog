// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-bfef5.firebaseapp.com",
  projectId: "mern-blog-bfef5",
  storageBucket: "mern-blog-bfef5.appspot.com",
  messagingSenderId: "386814247914",
  appId: "1:386814247914:web:6d792fc83ddef3dbc86893"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);