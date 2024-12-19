



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDwuakHUe44pr-X2mWhoR08DXzWBcXjD8",
  authDomain: "email-password-auth-cc86e.firebaseapp.com",
  projectId: "email-password-auth-cc86e",
  storageBucket: "email-password-auth-cc86e.firebasestorage.app",
  messagingSenderId: "757698536307",
  appId: "1:757698536307:web:6412f6efa1188cbd991b06",
  measurementId: "G-PW9M5SHMF3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app)
export default auth;