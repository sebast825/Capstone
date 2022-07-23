import { createContext, useState} from "react"
import PRODUCTS from '../shop-data.json'

//after doing several test hhehe, if we put createContext(null) works anyways
export const ProductsContext = createContext ({
  //how is a json save it in an array
   products:[],
})

export const ProductsProvider = ({children}) =>{
   const [products,setProducts] = useState(PRODUCTS);
   const value = {products};
   return (<ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>)
}