import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth   , createUserWithEmailAndPassword , signInWithEmailAndPassword , onAuthStateChanged , signOut } from "firebase/auth";
import {getFirestore, collection , increment, deleteField, addDoc ,doc , updateDoc ,setDoc  , getDoc , getDocs ,deleteDoc ,onSnapshot , Timestamp} from "firebase/firestore";
import { getStorage, ref, uploadBytes ,getDownloadURL } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCeaU93hdkCKEZG9ZhhrvV1k2u-caj_CtM",
  authDomain: "seylanihackathone2021.firebaseapp.com",
  databaseURL: "https://seylanihackathone2021-default-rtdb.firebaseio.com",
  projectId: "seylanihackathone2021",
  storageBucket: "seylanihackathone2021.appspot.com",
  messagingSenderId: "98305346182",
  appId: "1:98305346182:web:65ad64fef0e6f26f735f07",
  measurementId: "G-9N9BY6EFLX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  collection,
  addDoc,
  db,
  doc,
  setDoc,
  getDoc,
  getDocs,
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteDoc,
  Timestamp,
  onSnapshot,
  updateDoc,
  increment,
  deleteField
}