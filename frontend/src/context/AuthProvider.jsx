import React, { useContext, useEffect, useState } from 'react'

import authContext from './AuthContext'; 
import axios from "axios"
import { useNavigate } from 'react-router-dom';
const baseUrl = import.meta.env.VITE_BASE_URL;




const AuthProvider = ({children}) => { 
   
    const navigate = useNavigate();    
    const [token,setToken]=useState(localStorage.getItem("token"));
   
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
            console.log("")
            localStorage.setItem("user",JSON.stringify(data?.user));
            localStorage.setItem("token",data?.token);  
            setToken(data?.token);
            navigate("/");
        } 
        catch(err){ 
           alert("error while login"); 
           console.log("err in login: ",err);
        }

    }   
    
    const logout = ()=>{
        localStorage.removeItem("user"); 
        localStorage.removeItem("token"); 
        navigate("/login")
    } 

  return (
    <authContext.Provider value={{login,logout,signup,token}}> 
      {children}
    </authContext.Provider>
  )
}

export default AuthProvider