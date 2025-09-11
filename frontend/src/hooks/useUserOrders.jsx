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
            console.log("user orders :", data.orders)
            setUerOrders(data.orders)

        }
        catch (err) {
            console.log("error in fethcing orders ", err);
        }
        setLoading(false);
    } 

    useEffect(()=>{
        fetchUserOrders();
    },[])
   

    return {loading,userOrders,fetchUserOrders}
}

export default useUserOrders