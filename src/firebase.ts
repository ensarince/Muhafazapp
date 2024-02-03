// Import the functions you need from the SDKs you need
import "firebase/compat/firestore";
import 'firebase/compat/auth';
import 'firebase/storage'
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
import { getAuth, GoogleAuthProvider } from "firebase/auth";

import { initializeApp, getApp, getApps } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD6W0WZQupBzfK82x7ENlUIodRHmLZdhUw",
  authDomain: "muhafaz.firebaseapp.com",
  projectId: "muhafaz",
  storageBucket: "muhafaz.appspot.com",
  messagingSenderId: "272704967175",
  appId: "1:272704967175:web:75f9b82e34f4c4b27250a2",
  measurementId: "G-MPG9Z8WRL8"
};

// Add or Remove authentification methods here.
export const Providers = {
  google: new GoogleAuthProvider()
};

// get the apps, if there are no apps, get app
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth()
const db = getFirestore();
const storage = getStorage();


export {app, db, storage, auth};