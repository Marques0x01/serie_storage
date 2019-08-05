import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyD1eJvma2TDvAfpcuHd1PDMTQ8oTaJD8qQ",
  authDomain: "work-backend.firebaseapp.com",
  databaseURL: "https://work-backend.firebaseio.com",
  projectId: "work-backend",
  storageBucket: "work-backend.appspot.com",
  messagingSenderId: "1018372052589",
  appId: "1:1018372052589:web:e5c5cc7f12f738e0"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

const usersCollection = db.collection('users')

export {
  db,
  auth,
  currentUser,
  usersCollection
}