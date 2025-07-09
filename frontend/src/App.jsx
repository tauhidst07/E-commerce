import React, { lazy, Profiler, Suspense } from 'react' 
import { Route, Routes} from "react-router-dom"
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Products from './pages/Product'
import PrivateRoute from './components/PrivateRoute'  
import ProductProvider from './context/ProductProvider'
import Product from './pages/Product'
const Profile = lazy(()=>import("./pages/Profile"));

const App = () => {
  return (
     <>
   
    <Routes> 
       <Route path='/'  element={<Home/>} /> 
       <Route path='/Login' element={<Login/>} /> 
       <Route path='/Register' element={<Register/>}/> 
       <Route path='/Product/:id' element = {<Product/> } />  
       <Route path='/Profile' element={<Suspense fallback={<div>loading..</div>}><PrivateRoute> <Profile/></PrivateRoute></Suspense> } /> 
    </Routes> 
  </>
  
  )
}

export default App