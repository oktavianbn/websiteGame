// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9nmMyaMlWELvE1ThAFHC43WJsiqDSQsQ",
  authDomain: "databasegame-f7154.firebaseapp.com",
  databaseURL: "https://databasegame-f7154-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "databasegame-f7154",
  storageBucket: "databasegame-f7154.firebasestorage.app",
  messagingSenderId: "339050231555",
  appId: "1:339050231555:web:c23a8c39f66034ec815b36"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export {db};