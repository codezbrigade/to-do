import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
//import {...} from "firebase/auth";
//import {...} from "firebase/database";
import { doc, getDoc, getFirestore } from "firebase/firestore";
//import {...} from "firebase/functions";
//import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCtsm4ajIMQAqlPMqiDjcHmvDwsB2qTkc8",
  authDomain: "todo-app-c0eb6.firebaseapp.com",
  databaseURL: "https://todo-app-c0eb6-default-rtdb.firebaseio.com",
  projectId: "todo-app-c0eb6",
  storageBucket: "todo-app-c0eb6.appspot.com",
  messagingSenderId: "214234768660",
  appId: "1:214234768660:web:ee91b6f12226feb6784e01",
  measurementId: "G-5SKF7109L9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getDocsFromDb = async () => {
  try {
    const docRef = doc(db, 'users', 'abcd');
    console.log((await getDoc(docRef)).data())
  } catch {
    console.log('Error in getDocs')
  }
}

console.log('excecuted')