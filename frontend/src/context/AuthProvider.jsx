import React, { useContext, useEffect } from 'react'
import { useState } from 'react'  
import authContext from './AuthContext'; 
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/apiConnector'; 
import productContext from './ProductContext';
const baseUrl = import.meta.env.VITE_BASE_URL;




const AuthProvider = ({children}) => { 
   
    const navigate = useNavigate();   
   
    const [user,setUser]=useState(null);  

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
       
       fetchUser();
    },[])

  
   
    const signup = async (credentials)=>{
        try{
         const {data} = await axios.post(`${baseUrl}/auth/register`,credentials); 
          alert(data?.message); 
          navigate("/login");
        } 
        catch(err){
           alert(err.response.data.message);
        }
    }
    const login = async (credentials)=>{  
        try{
            const {data} = await axios.post(`${baseUrl}/auth/login`,credentials);    
            
            localStorage.setItem("user",JSON.stringify(data?.user));
            localStorage.setItem("token",data?.token);   
            navigate("/");
            fetchUser();
        } 
        catch(err){ 
           alert(err.response.data.message);
        }

    }   
    
    const logout = ()=>{
        localStorage.removeItem("user"); 
        localStorage.removeItem("token"); 
        navigate("/login")
    } 

  return (
    <authContext.Provider value={{login,logout,signup,user,fetchUser}}> 
      {children}
    </authContext.Provider>
  )
}

export default AuthProvider