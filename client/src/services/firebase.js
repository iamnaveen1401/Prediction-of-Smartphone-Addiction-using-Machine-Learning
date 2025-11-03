import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD6fSaT_pljyr5PAAa5MuAYgBAK2nhdxBc",
    authDomain: "mobileaddictionpredictor.firebaseapp.com",
    projectId: "mobileaddictionpredictor",
    storageBucket: "mobileaddictionpredictor.appspot.com",
    messagingSenderId: "610944625339",
    appId: "1:610944625339:web:7aad5261260d6f126cd79e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

export { auth, db, functions };
