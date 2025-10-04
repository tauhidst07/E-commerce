import React from 'react'
import { Navigate } from 'react-router-dom';
import { checkTokenExpiry } from '../utility/checkTokenExpiray';
import toast from 'react-hot-toast';

const PrivateRoute = ({children}) => { 

    const {isValid} = checkTokenExpiry();
    if(!isValid){  
      localStorage.removeItem("token"); 
      localStorage.removeItem("user");
      toast.success("login first");
       return  <Navigate  to="/login" replace /> 
    } 
  return (
    children
  )
}

export default PrivateRoute