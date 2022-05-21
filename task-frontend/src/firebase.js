import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBP4M5-eY8VFBxJV4UPKJQTZCHOvYwriKA",
  authDomain: "task-86437.firebaseapp.com",
  projectId: "task-86437",
  storageBucket: "task-86437.appspot.com",
  messagingSenderId: "413127860422",
  appId: "1:413127860422:web:a50d1d8fc433d9059637c7",
  measurementId: "G-9KQT800ZXR"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);