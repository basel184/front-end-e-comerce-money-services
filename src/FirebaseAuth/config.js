// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcFzVPNvj7hAZcmWTxBx1021iKyVeAjk8",
  authDomain: "money-services-50a17.firebaseapp.com",
  projectId: "money-services-50a17",
  storageBucket: "money-services-50a17.appspot.com",
  messagingSenderId: "126719849114",
  appId: "1:126719849114:web:28ef2e002462b99636e523",
  measurementId: "G-FLKVCK2136",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const fbProvider = new FacebookAuthProvider();
export { auth, provider, fbProvider };
