import React, { useState } from 'react'

const SelectSize = () => {
  const [selectedSize, setSelectedSize] = useState("Large");
  
  const sizes = ["Small", "Medium", "Large", "X-Large"];
  
  return (
    <div className="flex flex-col items-start gap-4">
      <div className="[font-family:'Satoshi-Regular',Helvetica] font-normal text-[#00000099] text-sm">
        Choose Size
      </div>

      <div className="flex flex-wrap items-start gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            className={`flex items-center justify-center px-5 py-2.5 rounded-[62px] ${
              selectedSize === size ? "bg-black" : "bg-[#efefef]"
            }`}
            onClick={() => setSelectedSize(size)}
          >
            <div
              className={`[font-family:${
                selectedSize === size ? "Satoshi-Medium" : "Satoshi-Regular"
              },Helvetica] font-${
                selectedSize === size ? "medium" : "normal"
              } ${
                selectedSize === size ? "text-white" : "text-[#00000099]"
              } text-sm`}
            >
              {size}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};


export default SelectSize 