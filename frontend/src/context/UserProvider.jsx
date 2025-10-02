import React, { useContext, useEffect, useState } from 'react'
import userContext from './UserContext'
import productContext from './ProductContext';
import axiosInstance from '../api/apiConnector';
import { checkTokenExpiry } from '../utility/checkTokenExpiray';
import authContext from './AuthContext';
import axios from 'axios'; 
import toast from 'react-hot-toast';
const baseUrl=import.meta.env.VITE_BASE_URL;

const UserProvider = ({children}) => {  
     const [user,setUser]=useState(null); 
     const [loading,setLoading] = useState(false); 
     const {token}= useContext(authContext);


    async function fetchUser(){  
      setLoading(true);
         try{  
           const res = await axios.get(`${baseUrl}/auth/user`,{
            headers:{
              Authorization:`Bearer ${token}`
            }
           });  
           setUser(res.data.user); 
         } 
         catch(err){
          toast.error("something went wrong in fethcing user info"); 
          console.log(err);
         } 
         setLoading(false); 
    }
     
    useEffect(()=>{   
    if(checkTokenExpiry().isValid){
        fetchUser();  
    }  
    },[token])

  return (
     <userContext.Provider value={{user,fetchUser}}> 
      {children}
    </userContext.Provider>
  )
}

export default UserProvider