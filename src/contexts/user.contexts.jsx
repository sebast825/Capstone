import { createContext,useState,useEffect } from "react";
import { onAuthStateChangedListener,signUserOut,createUserDocumentFromAuth} from "../utils/firebase/firebaste.utils";
//as the actual value we want to acces
export const UserContext = createContext ({
   //we put null because an empty object still return true, instead null not
   currentUser: null,
   setCurrentUser: () => null,

})

//allows any of his childs components acces the useState
export const UserProvider = ({children}) => {
   const [currentUser, setCurrentUser] = useState(null);
   const value = {currentUser,setCurrentUser}


   //tiger when the state of the user changes, if log in or log out
   //instead of useContext en all places we can handle it from only one place
   useEffect(()=>{
      const unsubscribe = onAuthStateChangedListener((user) =>{
        
         if(user){
            createUserDocumentFromAuth(user);
         }
            setCurrentUser(user)
         

      })
      return unsubscribe
   })

   return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}