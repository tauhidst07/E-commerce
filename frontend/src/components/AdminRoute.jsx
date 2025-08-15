import React from 'react'
import { checkTokenExpiry } from '../utility/checkTokenExpiray'
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => { 

  const {isValid ,role} = checkTokenExpiry(); 

  return isValid && role ==="admin" ? <Outlet/> : <Navigate to="/unauthorized"  replace/>
}

export default AdminRoute