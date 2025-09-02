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
import Checkout from './pages/Checkout'
import UserOrders from './components/pofile/Orders'
import ProfileInfo from './components/pofile/profileInfo'
import AccountLayout from './components/pofile/AccountLayout'
import Address from './components/pofile/Address' 
import AdminOrders from "./pages/Admin/Orders"

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
       <Route path='/unauthorized' element={<Unauthorized/>} /> 
       <Route path='/shop/:id' element={<ProductDetails/>} /> 
       <Route path='/checkout' element={<Checkout/>} /> 
       
       <Route path='/account' element={<PrivateRoute><AccountLayout/></PrivateRoute>}> 
         <Route path='profile' element={<ProfileInfo/>} /> 
         <Route path='address' element={<Address/>} /> 
         <Route path='orders' element={<UserOrders/>} />
       </Route>

       {/* admin routes */} 
       <Route path='/admin' element={<AdminRoute/>}>  
         <Route path='addProduct' element={<AddProducts/>} />  
         <Route path='products' element={<StockProducts/>} /> 
         <Route path='editProduct/:id' element={<EditProduct />} />  
         <Route path='orders' element={<AdminOrders/>} />
       </Route>
    </Routes> 
  </>
  
  )
}

export default App