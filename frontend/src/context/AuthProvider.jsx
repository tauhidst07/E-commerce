import React from 'react'
import { useState } from 'react'  
import AuthContext from './AuthContext'; 
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/apiConnector'; 
const baseUrl = import.meta.env.VITE_BASE_URL;




const AuthProvider = ({children}) => { 
    const [user,setUser] = useState(null); 
    const navigate = useNavigate();  
    
   
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
            setUser(data?.user); 
            localStorage.setItem("token",data?.token);  
            navigate("/");
            
        } 
        catch(err){ 
           alert(err.response.data.message);
        }

    }  
    const logout = ()=>{
        setUser(null); 
        localStorage.removeItem("token"); 
        navigate("/login")
    } 



    

  return (
    <AuthContext.Provider value={{user,login,logout,signup}}> 
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider