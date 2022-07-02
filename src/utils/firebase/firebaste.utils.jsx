//create an app instance of an object, what conect the app with what we have online
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getAuth,
   signInWithRedirect,
   signInWithPopup,
   GoogleAuthProvider,
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
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
//this is the instance of firebase
const firebaseConfig = {
  apiKey: "AIzaSyBM4hK8a-l6NAepqCCfshtqjmGo0gSrgwU",
  authDomain: "clapstone-24ba3.firebaseapp.com",
  projectId: "clapstone-24ba3",
  storageBucket: "clapstone-24ba3.appspot.com",
  messagingSenderId: "1031320218180",
  appId: "1:1031320218180:web:27abe49952b8d9d6faaa11"
};

//initializate app with our firebase config :) 
const firebaseApp = initializeApp(firebaseConfig);

//before use the autentication we need to create a provider
//create an provider instance
//provider is the people that will register in the app
//can be more than one, depending whta you need
const googleProvider = new GoogleAuthProvider();

//this is particular configuration google need
googleProvider.setCustomParameters({
   promt:'select_acount',
})

//is for the autentification of provider, only need one for the whole app
//verify all the providers
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,googleProvider);

//conect to db
export const db = getFirestore();

   //create an autenticate user
export const createUserDocumentFromAuth = async(
   userAuth,
   aditionalInformation = {}
   ) => {
   if(!userAuth)return;
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
         //creaite user
         await setDoc(userDocRef, {
            displayName,
            email,
            createdAt,
            ...aditionalInformation,
         });
      }catch(error){
         console.log('error creating user',error.message)
      }
   }
}

//to create an acount with the email and password
export const createAuthUserWithEmailAndPassword = async (email,password) =>{
   if(!email || !password)return;

// will give us back an auth object
   return await createUserWithEmailAndPassword (auth,email,password)
}

export const signInAuthUserWithEmailAndPassword = async (email,password) =>{
   if(!email || !password)return;

// will give us back an auth object
   return await signInWithEmailAndPassword (auth,email,password);
}

