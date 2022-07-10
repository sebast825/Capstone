import { createContext,useState } from "react";

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
   const value = {currentUser,setCurrentUser}
   return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}