import React from 'react'
import { Navigate } from 'react-router-dom';
import { checkTokenExpiry } from '../utility/checkTokenExpiray';

const PrivateRoute = ({children}) => { 

    const {isValid} = checkTokenExpiry();
    if(!isValid){  
      localStorage.removeItem("token"); 
      localStorage.removeItem("user");
      alert("login first");
       return  <Navigate  to="/login" replace /> 
    } 
  return (
    children
  )
}

export default PrivateRoute