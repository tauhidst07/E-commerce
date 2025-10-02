import React, { useContext, useState } from 'react'
import cartContext from '../context/CartContext';
import { payment } from '../utility/payment';
import axiosInstance from '../api/apiConnector';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const useOrder = () => {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const { cartItems, cartItemPrice, shippingCharge, discount } = useContext(cartContext);
    const [shippingInfo, setShippingInfo] = useState(null);
    const [paymentMethod,setPaymentMethod]=useState("COD");  
    const navigate = useNavigate();
    function createOrder() { 
        const orderItems = cartItems.map((item) => ({ product: item._id, price: item.price, quantity: item.quantity, size: item.size })); 
        let {_id,...shippingInfoWithoutId}=shippingInfo
        const order = {
            user: user._id,
            orderItems,
            shippingInfo:shippingInfoWithoutId,
            paymentMethod,
            totalAmount: cartItemPrice(),
            shippingCharge: shippingCharge,
            discount: discount
        } 
        axiosInstance.post("/order/", order).then((res) => {  
            if (order.paymentMethod === "razorpay") { 
              payment(res.data,()=>{  
                 navigate(`/checkout/orderConfirmation/${res.data.localOrderId}`,{replace:true}); 
                 toast.success("order placed")
               },()=>{
                toast.error("Something went wrong! Try Again");
               });  
            }
            else { 
                navigate(`/checkout/orderConfirmation/${res.data.order._id}`,{replace:true})  
                toast.success("order placed"); 
            }
        })
        .catch((err) => { 
            toast.error("something went wrong! Try Again")
            console.log("error of order: ",err);
        })
    }
    return { setShippingInfo,paymentMethod,setPaymentMethod,createOrder}
}

export default useOrder