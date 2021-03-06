import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss'

import { CartContext } from '../../contexts/cart.contexts';
import { useContext } from 'react';

const CartIcon = () =>{


   const {isCartOpen,setIsCartOpen} = useContext(CartContext);
   //return the oposit actual value - true/false
   const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen)
   return(
      <div className='cart-icon-container'onClick={toggleIsCartOpen}>
         <ShoppingIcon className='shopping-icon'/>
         <span className='item-count'>o</span>
      </div>
   )
}
export default CartIcon;