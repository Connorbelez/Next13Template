// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { useCollectionData } from 'react-firebase-hooks/firestore';
import {firebase} from "firebase/app"
import "firebase/firestore"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase

const app = initializeApp({
  apiKey: "AIzaSyBqBh2KCKJzEHqYDPlOOecFeg66YR0anvU",
  authDomain: "ecomtemplate-cb.firebaseapp.com",
  projectId: "ecomtemplate-cb",
  storageBucket: "ecomtemplate-cb.appspot.com",
  messagingSenderId: "170042727609",
  appId: "1:170042727609:web:9f31a44c454f69cdf10f68",
  measurementId: "G-5P9MB06RSX"
});



export default app;