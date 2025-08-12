import React, { useEffect } from 'react'
import cartContext from './CartContext'
import { useState } from 'react'

const CartProvider = ({children}) => { 
    const [cartItems,setCartItems] = useState([]); 
    function addItem (itemToAdd){
        setCartItems((prev)=>{
            if(prev.find((item)=>item._id === itemToAdd._id)){
               const newCart = prev.map((item)=>(
                item._id === itemToAdd._id ? {...item,quantity:itemToAdd.quantity+item.quantity}:{...item}
               )) 
               return newCart;
            }  
            else{
               return [...prev,itemToAdd];
            }
        }); 
    }  
    function incrementQuantity(itemToAdd){ 
          setCartItems((prev)=>{
              return prev.map((item)=>(
                item._id === itemToAdd._id ? {...item,quantity:item.quantity+1}:{...item}
              ))
          })
    } 
    function decrementQuantity(itemToAdd){
          setCartItems((prev)=>{
              return prev.map((item)=>(
                item._id === itemToAdd._id ?{...item,quantity:item.quantity>1 ? item.quantity-1: 1}:{...item}
              ))
          })
    }

    function removeItem (id) {
        setCartItems((prev)=>{
            return prev.filter((item)=>item._id!==id)
        }) 
    }  

    function isItemInCart(id){ 
       
        return cartItems.some((item)=>item._id === id);
    } 
    

    function cartItemPrice(){
       return cartItems.length > 0 ? cartItems.reduce((acc,item)=> acc + item.price,0) : 0
    }
  return (
    <cartContext.Provider value={{addItem,removeItem,cartItems,incrementQuantity,decrementQuantity,cartItemPrice}}> 
        {children}
    </cartContext.Provider>
  )
}

export default CartProvider