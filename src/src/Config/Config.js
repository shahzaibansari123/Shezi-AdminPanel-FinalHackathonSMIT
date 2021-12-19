import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAKwBj5T3589-5f2bpYfjv4xMXHIOoI4Eg",
  authDomain: "smit-finalhackathon-ksk.firebaseapp.com",
  projectId: "smit-finalhackathon-ksk",
  storageBucket: "smit-finalhackathon-ksk.appspot.com",
  messagingSenderId: "937386576721",
  appId: "1:937386576721:web:f72c8cd827d4853aaa6170"
  };

  firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db} 