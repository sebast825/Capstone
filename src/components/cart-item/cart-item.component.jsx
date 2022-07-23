import './cart-item.styles.scss'

const CartItem = (cartItem) =>{
   console.log(cartItem)
   const {name,quantity} = cartItem.cartItem;
   console.log(name)
   return(
      <div>
         <h2>{name}</h2>
         <span>{quantity}</span>
      </div>
   )
}

export default CartItem;