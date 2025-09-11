import React, { useEffect, useState } from 'react'
import axiosInstance from '../api/apiConnector';

const useAddress = () => {

    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [defaultAddress, setDefaultAddress] = useState(null);

    async function fetchAddresses() {
        setLoading(true)
        try {
            const { data } = await axiosInstance.get("/auth/user/address");
            console.log("address backedn response", data.address);
            setAddresses(data.address);
            setDefaultAddress(data.defaultAddress);
        }
        catch (err) {
            console.log("error in fetching address: ", err)
        }
        setLoading(false)
    }

    async function setDefault(address) {
        setLoading(true);
        try {
            const { data } = await axiosInstance.post("/auth/user/address/setDefault", { address: address });
            console.log("response in setting default: ", data);
        }
        catch (err) {
            console.log("err in setting default address");
        }
        fetchAddresses();
    }

    async function addAddress(data) { 
        setLoading(true);
        try {
            const res = await axiosInstance.post("/auth/user/address",data);
        }
        catch (err) {
            console.error("in adding address", err);
        }  
        fetchAddresses();
    }  

    async function editAddres(data){  
        console.log("edit address: ",data);
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
        console.log("id in delete id: ",id);
         setLoading(true); 
         try{
            const {data} = await axiosInstance.delete(`/auth/user/address/${id}`); 
            console.log("address deleted",data);
         } 
         catch(err){
            console.log("error in deleting address");
         } 
         fetchAddresses();
    }
   
    useEffect(() => {
        fetchAddresses();
    }, [])


    return { addresses, loading, fetchAddresses, defaultAddress, setDefault,addAddress,deleteAddress,editAddres};
}

export default useAddress