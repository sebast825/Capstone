import './product-card.styles.scss';
import Button from "../button/button.component";
import { CartContext } from '../../contexts/cart.contexts';
import { useContext } from 'react';

const ProductCard = ({product}) => {


   const saveData = (e) => {
      console.log(name,price,imageUrl)
   }


    const {name,price,imageUrl} = product;
   return(
      <div className='product-card-container'>
         <img src={imageUrl} alt={name} />
         <div className="footer">
            <span className="name">{name}</span>
            <span className="price">{price} </span>
         </div>
         <Button buttonType='inverted' onClick={saveData}>Add to Card</Button>
      </div>
   )
}

export default ProductCard; 