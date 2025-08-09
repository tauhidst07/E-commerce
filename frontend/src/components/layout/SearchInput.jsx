import React, { useContext, useState } from 'react' 
import searchIcon from '../../assets/search_icon.png'
import productContext from '../../context/ProductContext';

const SearchInput = () => { 
    const [input,setInput] = useState("");  
    const {search,setSearch} = useContext(productContext);
    const submitHandler = (e)=>{
       e.preventDefault(); 
       setSearch(input.trim().toLowerCase()); 
       setInput("");
    } 
  return ( 
    <form onSubmit={submitHandler} className='relative'> 
       <img src={searchIcon} alt="" className='absolute left-2 top-2' />
       <input type="text" value={input} onChange={(e)=>setInput(e.target.value)}  placeholder='Search for products...' className='w-full  lg:max-w-[540px] pl-12 py-2 rounded-[3rem] bg-[#f0f0f0] placeholder:text-[#00000066] ' />
    </form>
  )
}

export default SearchInput