import React, { lazy, Profiler, Suspense } from 'react'
import { Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import PrivateRoute from './components/PrivateRoute'
import ProductProvider from './context/ProductProvider'
import Shop from './pages/Shop'
import ProductDetails from './pages/ProductDetails'
import Search from './pages/Search'
import { AddProducts } from './pages/Admin/AddProducts'
import Unauthorized from './components/Unauthorized'
import AdminRoute from './components/AdminRoute'
import StockProducts from './pages/Admin/StockProducts'
import EditProduct from './pages/Admin/EditProduct'
import ProductDisplay from './components/product/ProductDisplay'
import UserOrders from './components/pofile/Orders'
import ProfileInfo from './components/pofile/ProfileInfo'
import AccountLayout from './components/pofile/AccountLayout'
import Address from './components/pofile/Address'
import AdminOrders from "./pages/Admin/Orders"
import EditPofile from './components/pofile/EditPofile'
import OrderDetails from './components/pofile/OrderDetails'
import AdminLayout from './components/admin/AdminLayout'
import MobileAccountHome from './components/pofile/MobileAccountHome'
import CheckoutLayout from './components/checkout/checkoutLayout'
import Cart from './components/cart/Cart'
import CheckoutAddress from './components/checkout/CheckoutAddress'
import Payment from './components/checkout/Payment'
import Dashboard from './pages/Admin/Dashboard' 
import AdminOrderDetails from './pages/Admin/OrderDetails' 
import toast, { Toaster } from 'react-hot-toast';
import OrderConfirmation from './components/checkout/OrderConfirmation'
import NoRouteMatch from './components/NoRouteMatch'

const App = () => {
  return (
    <>
      <Routes> 
        <Route path='*' element={<NoRouteMatch/>} />
        <Route path='/' element={<Home />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/search' element={<Search />} />
        <Route path='/unauthorized' element={<Unauthorized />} />
        <Route path='/shop/:id' element={<ProductDetails />} /> 
        <Route path='/account' element={<PrivateRoute><AccountLayout /></PrivateRoute>}>
          <Route index element={<MobileAccountHome />} />
          <Route path='profile' element={<ProfileInfo />} />
          <Route path='address' element={<Address />} />
          <Route path='orders' element={<UserOrders />} />
          <Route path='edit-profile' element={<EditPofile />} />
          <Route path='orders/orderDetails' element={<OrderDetails />} />
        </Route>
        <Route path='/checkout' element={<CheckoutLayout />}>
          <Route path='cart' element={<Cart />} />
          <Route path='address' element={<PrivateRoute><CheckoutAddress /></PrivateRoute>} />
          <Route path='payment' element={<PrivateRoute><Payment /></PrivateRoute> } /> 
          <Route path='orderConfirmation/:id' element={<PrivateRoute><OrderConfirmation/></PrivateRoute>} />
        </Route>
        {/* admin routes */}
        <Route path="/admin" element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="addProduct" element={<AddProducts />} />
            <Route path="products" element={<StockProducts />} />
            <Route path="editProduct/:id" element={<EditProduct />} /> 
            <Route path="orders/:id" element={<AdminOrderDetails/>} />
          </Route>
        </Route>

      </Routes> 
      <Toaster position='top-right' />
    </>

  )
}

export default App