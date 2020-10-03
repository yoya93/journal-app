import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Your web app's Firebase configuration dev
const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DATABASEURL,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
};

// // Your web app's Firebase configuration test

// const firebaseConfigTesting = {
//   apiKey: "AIzaSyBVQb_l2KIRJ7b5Hje_BikZQDfmmvJDJTg",
//   authDomain: "test-react-fc66f.firebaseapp.com",
//   databaseURL: "https://test-react-fc66f.firebaseio.com",
//   projectId: "test-react-fc66f",
//   storageBucket: "test-react-fc66f.appspot.com",
//   messagingSenderId: "1014266472287",
//   appId: "1:1014266472287:web:9674ba424a49101ec478ea",
// };

// if (process.env.NODE_ENV === "test") {
//   // Initialize Firebase tests
//   firebase.initializeApp(firebaseConfigTesting);
// } else {
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
// }

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider(); // es igual para github o cualkier otra forma de autenticarc

export { db, googleAuthProvider, firebase };
