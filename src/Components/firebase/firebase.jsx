import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDXEuALm6Vr8hBzqzozO8kl6FOBnjJEm10",
  authDomain: "media-posts.firebaseapp.com",
  projectId: "media-posts",
  storageBucket: "media-posts.appspot.com",
  messagingSenderId: "947792199336",
  appId: "1:947792199336:web:a9f1dcb882455917748c9d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export {auth, db, storage}