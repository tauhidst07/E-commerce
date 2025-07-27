import { useState } from 'react';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

export default function PriceRangeSlider() {
  const [value, setValue] = useState([200, 800]);

  return (
    <div className=" w-[90%] my-4 ">
      <RangeSlider
        min={0}
        max={1000} 
        value={value}
        onInput={setValue} 
        className="my-range-slider " 

      />
      <div className="mt-4 text-lg font-medium">
        ${value[0]} – ${value[1]}
      </div>

    </div>
  );
}
