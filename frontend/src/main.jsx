import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthProvider from './context/AuthProvider.jsx'
import { BrowserRouter } from 'react-router-dom'
import ProductProvider from './context/ProductProvider.jsx'
import CartProvider from './context/CartProvider.jsx'
import OrderProvider from './context/OrderProvider.jsx'
import UserProvider from './context/UserProvider.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <OrderProvider> 
            <UserProvider>
               <App /> 
            </UserProvider>
          </OrderProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  </BrowserRouter>

)
