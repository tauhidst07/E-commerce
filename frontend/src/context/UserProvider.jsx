import React, { useContext, useEffect, useState } from 'react'
import userContext from './UserContext'
import productContext from './ProductContext';
import axiosInstance from '../api/apiConnector';
import { checkTokenExpiry } from '../utility/checkTokenExpiray';
import authContext from './AuthContext';

const UserProvider = ({children}) => {  
     const [user,setUser]=useState(null); 
     const [loading,setLoading] = useState(false); 
     const {token}= useContext(authContext);


     async function fetchUser(){  
      setLoading(true);
         try{  
           const res = await axiosInstance.get("/auth/user"); 
           setUser(res.data.user); 
           console.log("user in context: ",res.data.user);
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
    }  
    },[token])

  return (
     <userContext.Provider value={{user,fetchUser}}> 
      {children}
    </userContext.Provider>
  )
}

export default UserProvider