import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-Qh-1k5ALrHC3F6wasSlhy3R88oqTU-Q",
  authDomain: "yocket-task.firebaseapp.com",
  projectId: "yocket-task",
  storageBucket: "yocket-task.appspot.com",
  messagingSenderId: "736803569168",
  appId: "1:736803569168:web:c2e068e5bd468860145495",
  measurementId: "G-LJCVRKYR4V",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

export { auth, db };
