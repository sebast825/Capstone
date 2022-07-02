//Outlet allow as add several components together
//Link works as a link :v
import { Outlet,Link } from "react-router-dom";
//replace the div  with Fragment, doesn't render the component
import { Fragment } from "react";
//let as import somthing as a component :) 
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg'
import './navigation.styles.scss';
const Navigation = () => {
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
            <Link className="nav-link" to='/auth'>
            <div>Sign In</div>
            </Link>
         </div>
         
       </div>
       <Outlet/>
     </Fragment>
   )
 }

export default Navigation;