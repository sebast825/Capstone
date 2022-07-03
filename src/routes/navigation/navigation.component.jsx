//Outlet allow as add several components together
//Link works as a link :v
import { Outlet,Link } from "react-router-dom";
//replace the div  with Fragment, doesn't render the component
import { Fragment ,useContext} from "react";
//let as import somthing as a component :) 
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg'
import './navigation.styles.scss';

import { UserContext } from "../../contexts/user.contexts";
import { signUserOut } from "../../utils/firebase/firebaste.utils";

const Navigation = () => {
  const { currentUser,setCurrentUser } = useContext(UserContext)
  console.log(currentUser)

  const signUserHandler = async () => {
    //firebase method to sign out
    await signUserOut();
    //this is to update the page
    setCurrentUser(null);
  }
   return (
     <Fragment>
       <div className="navigation">
         <Link className="logo-container" to="/">
            <CrwnLogo/>
         </Link>
         <div className="nav-links-container">
            <Link className="nav-link" to='/shop'>
            <div>SHOP</div>
            </Link>
            {
              //if currentUser exist chose one
              currentUser ? (
                <span className="nav-link" onClick={signUserHandler}>
            Sign Out
            </span>
              ) : (
                <Link className="nav-link" to='/auth'>
            <div>Sign In</div>
            </Link>
              )
            }
            
         </div>
         
       </div>
       <Outlet/>
     </Fragment>
   )
 }

export default Navigation;