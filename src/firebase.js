// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyC1ccOhtLaQemW7L6Ykg7JPz7d7UY2l7Vg",
  authDomain: "abhaykumar-8e57f.firebaseapp.com",
  projectId: "abhaykumar-8e57f",
  storageBucket: "abhaykumar-8e57f.firebasestorage.app",
  messagingSenderId: "479142038714",
  appId: "1:479142038714:web:2f953f1cf02bd0aafdc683",
  measurementId: "G-5X28SM0FTZ",
  databaseURL:"https://abhaykumar-8e57f-default-rtdb.firebaseio.com"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
//export const app=initializeApp(firebaseConfig);