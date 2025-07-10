import React, { useContext } from 'react'
import cartContext from '../context/CartContext'
import Navbar from '../components/layout/Navbar';
import HeroSection from '../components/layout/HeroSection';
import Feature from '../components/layout/Feature';
import Footer from '../components/layout/Footer';
import Styles from '../components/Layout/Styles';

const Home = () => { 
  const {cartItems,cartItemPrice} = useContext(cartContext); 

  return ( 
    <div className='bg-white w-full'>  
     <Navbar/>  
     <HeroSection/> 
     <Feature heading={"NEW ARRIVAL"}/>   
     <Feature heading={"TOP SELLING"} />
     <Styles/>
     <Footer/>

    </div>
  )
}

export default Home