import React, { useEffect } from 'react'
import cartContext from './CartContext'
import { useState } from 'react'

const CartProvider = ({children}) => { 
    const [cartItems,setCartItems] = useState([]); 
    function addItem (itemToAdd){
        setCartItems((prev)=>{
            if(prev.find((item)=>item._id === itemToAdd._id)){
               const newCart = prev.map((item)=>(
                item._id === itemToAdd._id ? {...item,quantity:item.quantity+1}:{...item}
               )) 
               return newCart;
            }  
            else{
               return [...prev,itemToAdd];
            }
        }); 
        // localStorage.setItem("cartItem",JSON.stringify(cartItems));
    } 

    function removeItem (id) {
        setCartItems((prev)=>{
            return prev.filter((item)=>item._id!==id)
        }) 
        // localStorage.setItem("cartItem",JSON.stringify(cartItems));
    }  

    function isItemInCart(id){ 
       
        return cartItems.some((item)=>item._id === id);
    } 
    useEffect(()=>{
        console.log("cart items: ",cartItems);
    },[cartItems]); 

    function cartItemPrice(){
       return cartItems.length>0?cartItems.reduce((acc,item)=>acc+item.price,0):0
    }
  return (
    <cartContext.Provider value={{addItem,removeItem,cartItems,isItemInCart,cartItemPrice}}> 
        {children}
    </cartContext.Provider>
  )
}

export default CartProvider