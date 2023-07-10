// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAf5onvyrfhjlVTDA2dnhYM68-onWThB0E",
  authDomain: "kirbank-f515a.firebaseapp.com",
  projectId: "kirbank-f515a",
  storageBucket: "kirbank-f515a.appspot.com",
  messagingSenderId: "764676003269",
  appId: "1:764676003269:web:369ecafa33e678676867ac",
  measurementId: "G-MKBN67R91E"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp);