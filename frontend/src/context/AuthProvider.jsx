import React, { useContext, useEffect, useState } from 'react'

import authContext from './AuthContext'; 
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const baseUrl = import.meta.env.VITE_BASE_URL;




const AuthProvider = ({children}) => { 
   
    const navigate = useNavigate();    
    const [token,setToken]=useState(localStorage.getItem("token"));
   
    const signup = async (credentials)=>{
        try{
         const {data} = await axios.post(`${baseUrl}/auth/register`,credentials); 
          toast.success(data?.message); 
          navigate("/login");
        } 
        catch(err){
           toast.error(err.response.data.message);
        }
    }
    const login = async (credentials)=>{  
        try{
            const {data} = await axios.post(`${baseUrl}/auth/login`,credentials);    
            localStorage.setItem("user",JSON.stringify(data?.user));
            localStorage.setItem("token",data?.token);  
            setToken(data?.token);  
            console.log("data: ",data);
            if(data?.user.role =="admin"){
              navigate("/admin")
            } 
            else{
              navigate("/"); 
            }
            toast.success("Logged in")
        } 
        catch(err){  
          console.log("login err: ",err.response);
          toast.error(err.response.data.message);
        }

    }   
    
    const logout = ()=>{
        localStorage.removeItem("user"); 
        localStorage.removeItem("token");  
        toast.error("Logged out")
        navigate("/login")
    } 

  return (
    <authContext.Provider value={{login,logout,signup,token}}> 
      {children}
    </authContext.Provider>
  )
}

export default AuthProvider