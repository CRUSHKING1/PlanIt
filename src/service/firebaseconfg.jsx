// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import{getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:import.meta.env.VITE_GOOGLE_FIREBASE_API,
  authDomain: "planit-7f065.firebaseapp.com",
  projectId: "planit-7f065",
  storageBucket: "planit-7f065.firebasestorage.app",
  messagingSenderId: "411049666508",
  appId: "1:411049666508:web:9a597028e8830e19959f69",
  measurementId: "G-GGS7WZDWZZ"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const db=getFirestore(app)
// const analytics = getAnalytics(app);