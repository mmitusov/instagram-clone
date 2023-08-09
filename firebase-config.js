// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";

//For Firebase V9+ we need to follow modular aproach, so you need additionaly import SDKs that want to use
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwZlpih0AEkW_sMj8cFKzchomX2Sra2mA",
  authDomain: "instagram-clone-76b49.firebaseapp.com",
  projectId: "instagram-clone-76b49",
  storageBucket: "instagram-clone-76b49.appspot.com",
  messagingSenderId: "999273955698",
  appId: "1:999273955698:web:dcf62de54d8d8afb045deb"
};

// Initialize Firebase with SSR in mind
//!getApps().length - if app is not initialized (no length) -> initialize it
//getApp() - otherwise get the currently initialized app
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(); //Initialize DB
const storage = getStorage(); //Initialize DB

export { app, db, storage }; //Explicit export