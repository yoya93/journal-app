import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Your web app's Firebase configuration dev
const firebaseConfig = {
  apiKey: "AIzaSyCXUD2A4_OEgJl84O0KOAo1Qk-G1Iy2NYM",
  authDomain: "journal-app-react-63b5a.firebaseapp.com",
  databaseURL: "https://journal-app-react-63b5a.firebaseio.com",
  projectId: "journal-app-react-63b5a",
  storageBucket: "journal-app-react-63b5a.appspot.com",
  messagingSenderId: "1098634625624",
  appId: "1:1098634625624:web:947edf59c7e80272e9002d",
};

// Your web app's Firebase configuration test

const firebaseConfigTesting = {
  apiKey: "AIzaSyBVQb_l2KIRJ7b5Hje_BikZQDfmmvJDJTg",
  authDomain: "test-react-fc66f.firebaseapp.com",
  databaseURL: "https://test-react-fc66f.firebaseio.com",
  projectId: "test-react-fc66f",
  storageBucket: "test-react-fc66f.appspot.com",
  messagingSenderId: "1014266472287",
  appId: "1:1014266472287:web:9674ba424a49101ec478ea",
};

if (process.env.NODE_ENV === "test") {
  // Initialize Firebase tests
  firebase.initializeApp(firebaseConfigTesting);
} else {
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider(); // es igual para github o cualkier otra forma de autenticarc

export { db, googleAuthProvider, firebase };
