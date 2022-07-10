import { createContext,useState, useEffect } from "react";

import { onAuthStateChangedListener, signUserOut } from "../utils/firebase/firebaste.utils";
//as the actual value we want to acces
export const UserContext = createContext ({
   //we put null because an empty object still return true, instead null not
   currentUser: null,
   setCurrentUser: () => null,

})

//asd
//allows any of his childs components acces the useState
export const UserProvider = ({children}) => {
   const [currentUser, setCurrentUser] = useState(null);
   const value = {currentUser,setCurrentUser};

   //will manage everithing the log in log out from here instead of createContext
   useEffect(()=>{
      const unsubscribe = onAuthStateChangedListener((user)=>{
         setCurrentUser(user)
         console.log(user)
      })
      return unsubscribe;
   },[])
   return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}