// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getAuth,
   signInWithRedirect,
   signInWithPopup,
   GoogleAuthProvider
} from 'firebase/auth';
//to conect data base
import {
   getFirestore,
   doc,
   getDoc,
   setDoc,
   Firestore
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBM4hK8a-l6NAepqCCfshtqjmGo0gSrgwU",
  authDomain: "clapstone-24ba3.firebaseapp.com",
  projectId: "clapstone-24ba3",
  storageBucket: "clapstone-24ba3.appspot.com",
  messagingSenderId: "1031320218180",
  appId: "1:1031320218180:web:27abe49952b8d9d6faaa11"
};

const firebaseApp = initializeApp(firebaseConfig);

//can be more than one, depending whta you need
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
   promt:'select_acount',
})

//is for the autentification of provider, only need one for the whole app
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,provider);

//conect to db
export const db = getFirestore();

export const createUserDocumentFromAuth = async(userAuth) => {
   //userAuth provides info from the user acount
   const userDocRef = doc(db, 'users', userAuth.uid)
   console.log(userDocRef)

   const userSnaptshot = await getDoc(userDocRef);
   //check if user exites in data base
   console.log(userSnaptshot.exists())

   //if user doesn't exist, create it

   if(!userSnaptshot.exists()){
      const {displayName, email} = userAuth;
      const createdAt = new Date();  
      try{
         await setDoc(userDocRef, {
            displayName,
            email,
            createdAt,
         });
      }catch(error){
         console.log('error creating user',error.message)
      }
   }
}
