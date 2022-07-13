//Outlet allow as add several components together
//Link works as a link :v
import { Outlet,Link } from "react-router-dom";
//replace the div  with Fragment, doesn't render the component
import { Fragment ,useContext} from "react";
//let as import somthing as a component :) 
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg'
import './navigation.styles.scss';

import { UserContext } from "../../contexts/user.contexts";
import { CartContext } from "../../contexts/cart.contexts";

import { signUserOut } from "../../utils/firebase/firebaste.utils";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropwdown.component";

const Navigation = () => {
  const { currentUser } = useContext(UserContext)
  const {isCartOpen} = useContext(CartContext)

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
                <span className="nav-link" onClick={signUserOut}>
            Sign Out
            </span>
              ) : (
                <Link className="nav-link" to='/auth'>
            <div>Sign In</div>
            </Link>
              )
            }
            <CartIcon/>
            
         </div>
         {/* if isCartOpen return true will show the CartDropDown */}
            {isCartOpen && <CartDropdown/>}
       </div>
       <Outlet/>
     </Fragment>
   )
 }

export default Navigation;