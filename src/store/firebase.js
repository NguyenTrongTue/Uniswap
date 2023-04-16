import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBhUc0joPVxxIu-6TyoQJ31NEelwp3o_m4",
  authDomain: "video-3447e.firebaseapp.com",
  projectId: "video-3447e",
  storageBucket: "video-3447e.appspot.com",
  messagingSenderId: "313000517436",
  appId: "1:313000517436:web:3c0d32240b343667830839",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
