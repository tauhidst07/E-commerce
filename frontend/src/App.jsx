import React, { lazy, Profiler, Suspense } from 'react' 
import { Route, Routes} from "react-router-dom"
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Products from './pages/Product'
import PrivateRoute from './components/PrivateRoute'  
import ProductProvider from './context/ProductProvider'
import Product from './pages/Product'
import Shop from './pages/Shop'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Search from './pages/Search'
import { AddProducts } from './pages/Admin/AddProducts'
import Unauthorized from './components/Unauthorized'
import AdminRoute from './components/AdminRoute' 
import StockProducts from './pages/Admin/StockProducts'
import EditProduct from './pages/Admin/EditProduct'
import ProductDisplay from './components/product/ProductDisplay'

const Profile = lazy(()=>import("./pages/Profile"));

const App = () => {
  return (
     <>
   
    <Routes> 
       <Route path='/'  element={<Home/>} /> 
       <Route path='/Login' element={<Login/>} /> 
       <Route path='/Register' element={<Register/>}/> 
       <Route path='/Product/:id' element = {<Product/> } />   
       <Route path='/shop' element={<Shop/>}  /> 
       <Route path='/cart' element={<Cart/>} />  
       <Route path='/search' element={<Search/>} />
       <Route path='/Profile' element={<Suspense fallback={<div>loading..</div>}><PrivateRoute> <Profile/></PrivateRoute></Suspense> } />  
       <Route path='/unauthorized' element={<Unauthorized/>} /> 
       <Route path='/shop/:id' element={<ProductDetails/>} />
       {/* admin routes */} 
       <Route path='/admin' element={<AdminRoute/>}>  
         <Route path='addProduct' element={<AddProducts/>} />  
         <Route path='products' element={<StockProducts/>} /> 
         <Route path='editProduct/:id' element={<EditProduct />} />
       </Route>
    </Routes> 
  </>
  
  )
}

export default App