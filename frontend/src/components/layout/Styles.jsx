import React, { useContext } from 'react'
import casual from "../../assets/casual.png"
import formal from "../../assets/formal.png"
import women from "../../assets/women.png"
import gym from "../../assets/gym.png"
import tshirt from "../../assets/category_tshirt.avif"
import shirt from "../../assets/category_shirt.avif"
import dress from "../../assets/category_dress.avif"
import chinos from "../../assets/category_chinos.avif"
import { FaArrowRight } from "react-icons/fa";
import productContext from '../../context/ProductContext'
import { useNavigate } from 'react-router-dom'



const Styles = () => { 

    const categories = [{
        name: "T-Shirt",
        image: tshirt
    },
    {
        name: "Shirt",
        image: shirt
    }, {
        name: "Dress",
        image: dress
    },
    {
        name: "Chinos",
        image: chinos
    }
    ] 
    const {setCategories} = useContext(productContext); 
    const navigate = useNavigate(); 
    function handleClick (category){ 
        navigate("/shop")
        setCategories((prev)=>[category.name]);
    }

    return (
        <div className='max-w-[80rem] lg:mx-auto my-6 mt-8  rounded-2xl px-2 mx-4'>
            <h1 className='text-3xl font-bold text-center py-8'>BROWS BY CATEGORY</h1>
            {/* select styles */}
            <div className='max-w-[80rem] mx-auto p-6'>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    {categories.map((category, i) => (
                        <div key={i} onClick={()=>handleClick(category)} className='group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300'>
                            {/* Image Container */}
                            <div className='overflow-hidden'>
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className='w-full object-cover transition-transform duration-300 group-hover:scale-105'
                                />
                            </div>

                            {/* Category Info */}
                            <div className='bg-white p-4 border-t border-black/10'>
                                <div className='flex items-center justify-between'>
                                    <p className='text-lg font-medium text-gray-900 group-hover:text-black transition-colors'>
                                        {category.name}
                                    </p>
                                    <span className='text-black/60 group-hover:text-black transition-colors'>
                                        <FaArrowRight />
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Styles