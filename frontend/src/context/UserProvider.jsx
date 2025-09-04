import React, { useContext, useEffect, useState } from 'react'
import userContext from './UserContext'
import productContext from './ProductContext';
import axiosInstance from '../api/apiConnector';
import { checkTokenExpiry } from '../utility/checkTokenExpiray';

const UserProvider = ({children}) => {  
     const [user,setUser]=useState(null); 
     const [userOrders,setUerOrders]=useState([]);   
     const {loading,setLoading} = useContext(productContext); 

     
     async function fetchUserOrders() { 
         setLoading(true);
          try{
             const {data} = await axiosInstance.get("/auth/user/orders");  
             setUerOrders(data.orders)
    
          } 
          catch(err){
           console.log("error in fethcing orders ",err);
          } 
          setLoading(false);
     }


     async function fetchUser(){  
      setLoading(true);
         try{  
           const res = await axiosInstance.get("/auth/user"); 
           setUser(res.data.user);
         } 
         catch(err){
          alert("something went wrong in fethcing user info"); 
          console.log(err);
         } 
         setLoading(false);
    }
     
    useEffect(()=>{   
    if(checkTokenExpiry().isValid){
        fetchUser();  
        fetchUserOrders();
    }  
    },[localStorage.getItem("token")])

  return (
     <userContext.Provider value={{user,fetchUser,fetchUserOrders,userOrders}}> 
      {children}
    </userContext.Provider>
  )
}

export default UserProvider