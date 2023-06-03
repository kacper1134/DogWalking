import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Initialize Firebase
const app = initializeApp({
  apiKey: "AIzaSyAb9VdURaAShpk_O2UyhTJwrEiUBKjjjSE",
  authDomain: "dogwalking-f388f.firebaseapp.com",
  projectId: "dogwalking-f388f",
  storageBucket: "dogwalking-f388f.appspot.com",
  messagingSenderId: "863538932998",
  appId: "1:863538932998:web:6e3d2c2e152f91528fc287",
  measurementId: "G-JBBK18BEZ2",
});

// Firebase storage reference
const storage = getStorage(app);
export default storage;
