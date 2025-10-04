import React, { useEffect } from 'react'
import cartContext from './CartContext'
import { useState } from 'react'
import toast from 'react-hot-toast';

const CartProvider = ({children}) => { 
    const [cartItems,setCartItems] = useState([]);  
    const [shippingCharge,setShippingCharge]=useState(0); 
    const [discount,setDiscount]=useState(0);
    function addToCart (itemToAdd){
        setCartItems((prev)=>{ 
            if(prev.find((item)=>item._id === itemToAdd._id && item.size === itemToAdd.size)){
               const newCart = prev.map((item)=>(
                item._id === itemToAdd._id && item.size === itemToAdd.size ? {...item,quantity:itemToAdd.quantity+item.quantity}:{...item}
               )) 
               return newCart;
            }  
            else{
               return [...prev,itemToAdd];
            }
        });  
        toast.success("product added to Cart")
    }  
    function incrementQuantity(itemToAdd){ 
          setCartItems((prev)=>{
              return prev.map((item)=>(
                item._id === itemToAdd._id && item.size == itemToAdd.size ? {...item,quantity:item.quantity+1}:{...item}
              ))
          })
    } 
    function decrementQuantity(itemToAdd){
          setCartItems((prev)=>{
              return prev.map((item)=>(
                item._id === itemToAdd._id && item.size == itemToAdd.size  ?{...item,quantity:item.quantity>1 ? item.quantity-1: 1}:{...item}
              ))
          })
    }

    function removeItem (product) {
        setCartItems((prev)=>{
            return prev.filter((item)=>{
                if(item._id==product._id && item.size == product.size) return false; 
                return true
            })
        }); 
        toast.error("product removed from Cart")
    }     

    useEffect(()=>{
         setCartItems(JSON.parse(localStorage.getItem("cartItems"))||[]);
    },[])
    useEffect(()=>{
       localStorage.setItem("cartItems",JSON.stringify(cartItems));
    },[cartItems]);


    useEffect(()=>{  
        const currentCartPrice=cartItemPrice();
        // shipping charge
        if(currentCartPrice>0 && currentCartPrice<=999){
            setShippingCharge(49);
        } 
        else{
            setShippingCharge(0)
        }  

        //discount 
        if(currentCartPrice>0){
            let discount= Math.floor((currentCartPrice*20)/100);  
            setDiscount(discount); 
        } 
        else{
            setDiscount(0);
        }
    },[cartItemPrice()])


    function cartItemPrice(){
       return cartItems?.length > 0 ? cartItems.reduce((acc,item)=> acc + (item.price*item.quantity),0) : 0
    }
  return (
    <cartContext.Provider value={{addToCart,removeItem,cartItems,incrementQuantity,decrementQuantity,cartItemPrice,shippingCharge,discount}}> 
        {children}
    </cartContext.Provider>
  )
}

export default CartProvider