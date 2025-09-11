import React, { useContext, useEffect, useState } from 'react'
import userContext from './UserContext'
import productContext from './ProductContext';
import axiosInstance from '../api/apiConnector';
import { checkTokenExpiry } from '../utility/checkTokenExpiray';

const UserProvider = ({children}) => {  
     const [user,setUser]=useState(null); 
     const [loading,setLoading] = useState(false);


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
    },[])

  return (
     <userContext.Provider value={{user,fetchUser}}> 
      {children}
    </userContext.Provider>
  )
}

export default UserProvider