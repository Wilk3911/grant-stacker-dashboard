// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAtOttrepdrPtMw6BcCtgn2fKkBmDHL3VE",
  authDomain: "grant-stacker.firebaseapp.com",
  projectId: "grant-stacker",
  storageBucket: "grant-stacker.appspot.com",
  messagingSenderId: "673066099388",
  appId: "1:673066099388:web:f4fbe6c7c1864d9e3c26b9",
  measurementId: "G-ZEZ95J0PR4"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage };
