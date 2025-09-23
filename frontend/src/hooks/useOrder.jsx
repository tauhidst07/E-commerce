import React, { useContext, useState } from 'react'
import cartContext from '../context/CartContext';
import { payment } from '../utility/payment';
import axiosInstance from '../api/apiConnector';

const useOrder = () => {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const { cartItems, cartItemPrice, shippingCharge, discount } = useContext(cartContext);
    const [shippingInfo, setShippingInfo] = useState(null);
    const [paymentMethod,setPaymentMethod]=useState("COD"); 
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

                payment(res.data);
            }
            else {
                alert("order placed");
            }
        })
        .catch((err) => {
            console.log("error of order: ", err.data);
        })
    }
    return { setShippingInfo,paymentMethod,setPaymentMethod,createOrder}
}

export default useOrder