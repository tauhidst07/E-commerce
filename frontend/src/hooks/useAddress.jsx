import React, { useEffect, useState } from 'react'
import axiosInstance from '../api/apiConnector';
import toast from 'react-hot-toast';

const useAddress = () => {

    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [defaultAddress, setDefaultAddress] = useState(null);

    async function fetchAddresses() {
        setLoading(true)
        try {
            const { data } = await axiosInstance.get("/auth/user/address");
            setAddresses(data.address); 
            setDefaultAddress(data.defaultAddress);
        }
        catch (err) {
            console.log("error in fetching address: ",err)
        }
        setLoading(false)
    }

    async function setDefault(address) {
        setLoading(true);
        try {
            const { data } = await axiosInstance.post("/auth/user/address/setDefault", { address: address }); 
            toast.success("address set to default");
        }
        catch (err) {
            toast.error("something went wrong! Try Again")
        }
        fetchAddresses();
    }

    async function addAddress(data) { 
        setLoading(true);
        try {
            const res = await axiosInstance.post("/auth/user/address",data); 
            toast.success("address added")
        }
        catch (err) {
            toast.error("something went wrong! Try Again");
        }  
        fetchAddresses();
    }  

    async function editAddres(data){   
        setLoading(true);
        try {
            const res = await axiosInstance.put("/auth/user/address",data);
        }
        catch (err) {
            console.error("in editing address", err);
        }  
        fetchAddresses();
    }

    async function deleteAddress(id){ 
         setLoading(true); 
         try{
            const {data} = await axiosInstance.delete(`/auth/user/address/${id}`);  
            toast.success("address deleted")
         } 
         catch(err){ 
             toast.error("something went wrong! Try Again");
         } 
         fetchAddresses();
    }
   
    useEffect(() => {
        fetchAddresses();
    }, [])


    return { addresses, loading, fetchAddresses, defaultAddress, setDefault,addAddress,deleteAddress,editAddres};
}

export default useAddress