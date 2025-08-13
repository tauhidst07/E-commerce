import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CLOTHS_CATEGORIES } from '../../constants/categories';
import { audience } from '../../constants/audience';
import { sizes } from '../../constants/sizes';

export const AddProducts = () => {
  const { register, handleSubmit, reset, formState: { errors }, watch, resetField, setValue } = useForm({
    defaultValues: { sizes: [], images: [] }
  });
  const selectedAudience = watch("audience");
  const [audienceType, setAudienceType] = useState("");

  const selectedSize = watch("sizes") || [];
  const selectedImage = watch("images") || [];

  function toggleSize(size) {
    if (selectedSize.includes(size)) {
      setValue("sizes", selectedSize.filter((s) => s !== size))
    }
    else {
      setValue("sizes", [...selectedSize, size]);
    }
  }

  useEffect(() => {
    if (selectedAudience === "Men" || selectedAudience == "Women") {
      setAudienceType("adults")
    }
    else if (selectedAudience === "Boys" || selectedAudience == "Girls") {
      setAudienceType("kids")
    }
    else {
      setAudienceType("");
    }
    setValue("sizes", [])

  }, [selectedAudience]);


  function onFileChnage(e) {
    const newFiles = e.target.files;

    let updated = [...selectedImage, ...newFiles];
    if (updated.length > 3) {
      updated = updated.slice(0, 3);
      alert("you cant upload more than three image");
    }
    setValue("images", updated);
    e.target.value = ""
  }

  function removeImage(index) {
    setValue("images", selectedImage.filter((f, i) => i !== index));
  }




  const submitHandler = (data) => {
    console.log("form: ", data);
    reset();
  }
  return (
    <div className="max-w-md md:max-w-[60%] mx-auto p-6 bg-white rounded-lg shadow-md">
   <form onSubmit={handleSubmit(submitHandler)} className='flex flex-col gap-6'>
    <div className='space-y-2'>
      <input 
        type="text" 
        placeholder='Enter product title' 
        className='w-full px-4 py-2 border border-black/20 rounded-md focus:outline-none focus:ring-1 focus:ring-black'
        {...register("title", { required: "Title is required" })} 
      />
      {errors.title && <p className='text-red-500 text-sm'>{errors.title.message}</p>}
    </div>
    <div className='space-y-2'>
      <textarea 
        type="description" 
        placeholder='Enter description' 
        className='w-full px-4 py-2 border border-black/20 rounded-md focus:outline-none focus:ring-1 focus:ring-black'
        {...register("description", { required: "Description is required" })} 
      />
      {errors.description && <p className='text-red-500 text-sm'>{errors.description.message}</p>}
    </div>
    <div className='space-y-2'>
      <input 
        type="number" 
        placeholder='Enter price' 
        className='w-full px-4 py-2 border border-black/20 rounded-md focus:outline-none focus:ring-1 focus:ring-black'
        {...register("price", { required: "Price is required" })} 
      />
      {errors.price && <p className='text-red-500 text-sm'>{errors.price.message}</p>}
    </div>
    <div className='space-y-2'>
      <p className='text-black/80'>Select category for product</p>
      <select 
        className='w-full px-4 py-2 border border-black/20 rounded-md focus:outline-none focus:ring-1 focus:ring-black'
        {...register("category", { required: "Category is required" })}
      >
        <option value="">Select</option>
        {CLOTHS_CATEGORIES.map((category, ind) => <option key={ind} value={category}>{category}</option>)}
      </select>
      {errors.category && <p className='text-red-500 text-sm'> {errors.category.message} </p>}
    </div>
    <div className='space-y-2'>
      <p className='text-black/80'>Select audience type</p>
      <select 
        className='w-full px-4 py-2 border border-black/20 rounded-md focus:outline-none focus:ring-1 focus:ring-black'
        {...register("audience", { required: "Audience type is required" })}
      >
        <option value="">Select</option>
        {audience.map((aud, index) => <option key={index} value={aud}>{aud}</option>)}
      </select>
      {errors.audience && <p className='text-red-500 text-sm'> {errors.audience.message}</p>}
    </div>
    <div className='space-y-2'>
      <p className='text-black/80'>Select available sizes:</p>
      {audienceType ? 
        <div className='flex flex-wrap gap-2'>{
          sizes[audienceType].map((size, index) => 
            <div 
              key={index} 
              className={`px-3 py-1 border rounded-md cursor-pointer transition-colors ${
                selectedSize.includes(size) 
                  ? "border-black bg-black/10 text-black" 
                  : "border-black/20 text-black/40 hover:border-black/40"
              }`} 
              onClick={() => toggleSize(size)}
            >
              {size}
            </div>
          )
        }</div> : 
        <p className='text-black/60'>Select audience type first</p>
      }
    </div>
    <div className='space-y-2'>
      <p className='text-black/80'>Upload images for product</p>
      <input 
        type="file" 
        accept='image/*' 
        multiple 
        onChange={onFileChnage} 
        className='w-full border border-black/20 rounded-md p-2'
      />
      <div className='flex flex-wrap gap-2 mt-2'>
        {selectedImage.length > 0 &&
          selectedImage.map((file, i) => 
            <div key={i} className='border border-black/20 rounded-md p-2 relative'>
              <div 
                onClick={() => removeImage(i)} 
                className='absolute -top-2 -right-2 bg-black text-white rounded-full w-5 h-5 flex items-center justify-center cursor-pointer text-xs'
              >
                ×
              </div>
              <img 
                src={URL.createObjectURL(file)}
                width={80}
                className='rounded'
              />
            </div>
          )
        }
      </div>
    </div>
    <button 
      type='submit' 
      className='px-4 py-2 bg-black text-white rounded-md hover:bg-black/90 transition-colors max-w-max'
    >
      Add Product
    </button>
  </form>
</div>
  )
}
