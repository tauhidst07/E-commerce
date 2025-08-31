import React, { useContext, useState } from 'react'
import searchIcon from '../../assets/search_icon.png'
import productContext from '../../context/ProductContext';
import { useNavigate } from 'react-router-dom';
import { IoMdSearch } from "react-icons/io"; 
import { MdOutlineCancel } from "react-icons/md";

const SearchInput = () => {
  const [input, setInput] = useState("");
  const { search, setSearch } = useContext(productContext);
  const params = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    setSearch(input.trim().toLowerCase());
    params.set("search", input)
    navigate(`/shop?${params.toString()}`)
    setInput("");
  }
  return (
    <form onSubmit={submitHandler} className='relative'>
      <IoMdSearch className=' hidden lg:block absolute left-4 top-1/2 transform -translate-y-1/2 text-xl text-gray-500' />

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='Search for products...'
        className='w-full lg:max-w-[540px] pl-4 lg:pl-12 pr-4 py-3 rounded-full border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-black/80 focus:border-transparent placeholder:text-gray-500 transition-all duration-150'
      />  
      { input.length>0 && <MdOutlineCancel className='lg:hidden absolute right-16 top-1/2 transform -translate-y-1/2 text-[24px] text-black/80 ' onClick={()=>setInput("")}/>}
      <IoMdSearch className='lg:hidden absolute right-4 top-1/2 transform -translate-y-1/2 text-3xl text-black ' /> 
    </form>
  )
}

export default SearchInput