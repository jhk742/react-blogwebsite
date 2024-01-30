import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVyGOiq80HS-DZYUybfSyjXvmUTk_Ow3A",
  authDomain: "react-blog-website-d1a99.firebaseapp.com",
  projectId: "react-blog-website-d1a99",
  storageBucket: "react-blog-website-d1a99.appspot.com",
  messagingSenderId: "321468061816",
  appId: "1:321468061816:web:c01f8df6df5f98d2b1f58d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//implementing the connection
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();