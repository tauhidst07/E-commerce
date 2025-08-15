import React from 'react'
import { Navigate } from 'react-router-dom';
import { checkTokenExpiry } from '../utility/checkTokenExpiray';

const PrivateRoute = ({children}) => { 

    const {isValid} = checkTokenExpiry();
    if(!isValid){ 
      alert("login first");
       return  <Navigate  to="/login" /> 
    } 
  return (
    children
  )
}

export default PrivateRoute