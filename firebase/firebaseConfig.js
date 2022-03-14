import * as firebase from "firebase/app";
import "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZv1gmLCgpjYYpItsVk_L9jAi7vyP7D-s",
  authDomain: "fe-calories-tracker.firebaseapp.com",
  projectId: "fe-calories-tracker",
  storageBucket: "fe-calories-tracker.appspot.com",
  messagingSenderId: "704328056171",
  appId: "1:704328056171:web:ddf116bc60765b2231a02e",
  measurementId: "G-T917EE8Y0F",
};

// Initialize Firebase
export default !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

// export const appFirebase = firebase.initializeApp(firebaseConfig);
// if (typeof window !== "undefined" && !firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

// export const firebase
