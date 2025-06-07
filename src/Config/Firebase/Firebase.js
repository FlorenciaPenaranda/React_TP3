import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA2Yda0khYCHRVROWL0NgiSvQjDBT1pTqQ",
  authDomain: "desarrollo-en-react-js-1cfd2.firebaseapp.com",
  projectId: "desarrollo-en-react-js-1cfd2",
  storageBucket: "desarrollo-en-react-js-1cfd2.firebasestorage.app",
  messagingSenderId: "280199768223",
  appId: "1:280199768223:web:eae44fa0040cd9f6e25aaa"
};

const app = initializeApp(firebaseConfig);
const dataBase = getFirestore(app);

export default dataBase;