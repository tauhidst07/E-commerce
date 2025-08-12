import { useEffect, useState } from 'react';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

export default function PriceRangeSlider({minPrice,maxPrice,setMinPrice,setMaxPrice}) {
  const [value, setValue] = useState([minPrice, maxPrice]);
  useEffect(()=>{
     setMinPrice(value[0]); 
     setMaxPrice(value[1]); 
     console.log(`min ${value[0]} max ${value[1]}`)
  },[value])
  return (
    <div className=" w-[90%] my-4 ">
      <RangeSlider
        min={0}
        max={1000} 
        value={value}
        onInput={setValue} 
        className="my-range-slider" 
      />
      <div className="mt-4 text-lg font-medium">
        ${value[0]} – ${value[1]}
      </div>

    </div>
  );
}
