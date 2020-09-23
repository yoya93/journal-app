import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXUD2A4_OEgJl84O0KOAo1Qk-G1Iy2NYM",
  authDomain: "journal-app-react-63b5a.firebaseapp.com",
  databaseURL: "https://journal-app-react-63b5a.firebaseio.com",
  projectId: "journal-app-react-63b5a",
  storageBucket: "journal-app-react-63b5a.appspot.com",
  messagingSenderId: "1098634625624",
  appId: "1:1098634625624:web:947edf59c7e80272e9002d",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider(); // es igual para github o cualkier otra forma de autenticarc

export { db, googleAuthProvider, firebase };
