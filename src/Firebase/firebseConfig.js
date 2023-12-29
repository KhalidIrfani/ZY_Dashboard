import { initializeApp } from "firebase/app"; 
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDACGo_KpR-Nfr7teJuOE192P-xgF3v1uY",
    authDomain: "csv-student-data.firebaseapp.com",
    databaseURL: "https://csv-student-data-default-rtdb.firebaseio.com",
    projectId: "csv-student-data",
    storageBucket: "csv-student-data.appspot.com",
    messagingSenderId: "498321504532",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()