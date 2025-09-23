import React, { useEffect, useState } from 'react'
import axiosInstance from '../api/apiConnector';


const useUserOrders = () => {
    const [user, setUser] = useState(null);
    const [userOrders, setUerOrders] = useState([]);
    const [loading, setLoading] = useState(false);


    async function fetchUserOrders() {
        setLoading(true);
        try {
            const { data } = await axiosInstance.get("/auth/user/orders");
            setUerOrders(data.orders)

        }
        catch (err) {
            console.log("error in fethcing orders ", err);
        }
        setLoading(false);
    }  

    async function cancelOrder(id) { 
        setLoading(true); 
        try{
            const res = await axiosInstance.put(`/order/cancelOrder/${id}`); 
        } 
        catch(err){
            console.error("error in order cancel",err)
        } 
        fetchUserOrders();
        
    }

    useEffect(()=>{
        fetchUserOrders();
    },[])
   

    return {loading,userOrders,fetchUserOrders,cancelOrder}
}

export default useUserOrders