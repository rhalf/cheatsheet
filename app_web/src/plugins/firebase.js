import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2E5utAsbUtbplM14QHe0DhWiWuLMc2qw",
  authDomain: "cheatsheet-4606e.firebaseapp.com",
  projectId: "cheatsheet-4606e",
  storageBucket: "cheatsheet-4606e.appspot.com",
  messagingSenderId: "677172569508",
  appId: "1:677172569508:web:b611d9b1c1c99797670d31",
  measurementId: "G-P4LMHE5K4F"
};

firebase.initializeApp(firebaseConfig);

export default firebase



