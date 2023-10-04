import firebase from "firebase";
import "firebase/auth"
import "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyD8_-4yqusuR4DgU2RcSEW0GWeKufa8bxU",
  authDomain: "linkedin-clone-d726f.firebaseapp.com",
  projectId: "linkedin-clone-d726f",
  storageBucket: "linkedin-clone-d726f.appspot.com",
  messagingSenderId: "618673211490",
  appId: "1:618673211490:web:61759e1817a7077158293b"
  };
  
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  const storage = firebase.storage();

export { auth, provider, storage };
export default db;