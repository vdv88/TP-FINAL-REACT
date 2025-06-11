
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBAAlOTG0Q5kKsUcmubxtIefqPdWMCZTcA",
  authDomain: "trabajo-final-react-c127c.firebaseapp.com",
  projectId: "trabajo-final-react-c127c",
  storageBucket: "trabajo-final-react-c127c.firebasestorage.app",
  messagingSenderId: "296604611067",
  appId: "1:296604611067:web:5415815a5840d820c85b5e"
};


const app = initializeApp(firebaseConfig);

const database = getFirestore(app)

export default database