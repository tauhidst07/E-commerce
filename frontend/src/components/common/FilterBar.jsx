import React, { useContext, useState } from 'react'
import PriceRangeSlider from './PriceRangeSlider'
import audienceTypes from "../../constants/audience"
import categoriesValue from "../../constants/categories"
import productContext from '../../context/ProductContext'
import { useNavigate } from 'react-router-dom'


const FilterBar = ({ minPrice, maxPrice, setMinPrice, setMaxPrice, }) => {
  const { audience, categories, setCategories } = useContext(productContext);
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  function handleAudienceChange(e) {
    params.set("audience", e.target.value);
    navigate(`/shop?${params.toString()}`);
  }
  function handleCategory(category) {
    if (categories.includes(category)) {
      params.delete("category");
      categories.filter((prev) => prev !== category)
        .forEach((val) => params.append("category", val));
    }
    else {
      params.append("category", category);
    }
    navigate(`/shop?${params.toString()}`);

  }
  return (
    <div className='md:w-[200px] lg:w-[250px] bg-white rounded-lg divide-y'>
      <p className='font-bold p-4 py-3 text-black border-b border-black/10'>Filters</p>

      {/* audience  */}
      <div className='flex flex-col gap-3 p-4 border-r border-black/10 border-l'>
        {
          audienceTypes.map((aud, i) =>
            <label className='cursor-pointer flex items-center gap-x-3' key={i}>
              <input className='cursor-pointer w-4 h-4 accent-black' type='radio' name='audience' checked={aud === audience} value={aud} onChange={handleAudienceChange} />
              <span className='text-black/80'>{aud}</span>
            </label>
          )
        }
      </div>


      <div className='p-4 space-y-3 border-r border-black/10 border-l'>
        <span className='text-black/80 font-medium'>Price</span>
        <PriceRangeSlider minPrice={minPrice} maxPrice={maxPrice} setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} />
      </div>


      <div className='flex flex-col gap-3 p-4 border-r border-black/10 border-l border-b'>
        <span className='text-black/80 font-medium'>Categories</span>
        <div className='flex flex-col gap-2'>
          {
            categoriesValue.map((cat, i) =>
              <label key={i} className='flex gap-x-3 items-center'>
                <input type="checkbox" className='cursor-pointer w-4 h-4 accent-black' checked={categories.includes(cat)} value={cat} onChange={() => handleCategory(cat)} />
                <span className='text-black/60 cursor-pointer'>{cat}</span>
              </label>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default FilterBar