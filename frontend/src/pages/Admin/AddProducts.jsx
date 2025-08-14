import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CLOTHS_CATEGORIES } from '../../constants/categories';
import { audience } from '../../constants/audience';
import { sizes } from '../../constants/sizes';
import { LiaFileUploadSolid } from "react-icons/lia";
import axiosInstance from '../../api/apiConnector';
import productContext from '../../context/ProductContext';
export const AddProducts = () => {
  const { register, handleSubmit, reset, formState: { errors }, watch, resetField, setValue } = useForm({
    defaultValues: { sizes: [], images: [] }
  });
  const selectedAudience = watch("audience");
  const [audienceType, setAudienceType] = useState("");
  const selectedSize = watch("sizes") || [];
  const selectedImage = watch("images") || []; 
  const {loading,setLoading} = useContext(productContext);

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
    const { images,sizes, ...finalData } = data;
    const formData = new FormData();
    for (const key in finalData) {
      formData.append(key, finalData[key]);
    }  
    sizes.forEach((size)=>{
      formData.append("sizes",size);
    })
    images.forEach(file => {
      formData.append("images", file);
    }); 
    setLoading(true);
    axiosInstance.post("/products/add",formData).then((res)=>{
      alert(res.data.message);
    })
    .catch((err)=>{
      console.log("add product err: ",err);
    }).finally(()=>{
      setLoading(false)
    })

    reset();
  }
  return (
    <div className="max-w-[80rem] mx-auto relative">   
    <h1>Add Product</h1>
    {
      loading && <div className='absolute inset-0 h-screen z-50 bg-white/60 flex items-center justify-center '>  
           <div className='loader'></div>
          </div>
    }
    
      <form onSubmit={handleSubmit(submitHandler)} className='max-w-md  mx-auto p-6 bg-white rounded-lg shadow-md flex flex-col gap-6'>
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
            <option value="">Not Selected</option>
            {CLOTHS_CATEGORIES.map((category, ind) => <option key={ind} value={category}>{category}</option>)}
          </select>
          {errors.category && <p className='text-red-500 text-sm'> {errors.category.message} </p>}
        </div>
        <div className='space-y-2'>
          <p className='text-black/80'>Select Audience</p>
          <select
            className='w-full px-4 py-2 border border-black/20 rounded-md focus:outline-none focus:ring-1 focus:ring-black'
            {...register("audience", { required: "Audience type is required" })}
          >
            <option value="">Not Selected</option>
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
                  className={`px-3 py-1 border rounded-md cursor-pointer transition-colors ${selectedSize.includes(size)
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
        <div className='space-y-3'>
          <p className='text-black/80'>Upload images for product</p>
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-black/20 border-dashed rounded-lg cursor-pointer hover:bg-black/5 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
             <LiaFileUploadSolid size={30} className='text-black/60'/>
              <p className="mb-2 text-sm text-black/60"><span className="font-semibold">Click to upload</span></p>
              <p className="text-xs text-black/40">PNG, JPG, GIF (MAX. 5MB)</p>
            </div>
            <input
              type="file"
              accept='image/*'
              multiple
              onChange={onFileChnage}
              className="hidden"
            />
          </label>

          {/* Image previews */}
          <div className='grid grid-cols-4 gap-3 mt-3'>
            {selectedImage.length > 0 &&
              selectedImage.map((file, i) =>
                <div key={i} className='relative aspect-square'>
                  <div
                    onClick={() => removeImage(i)}
                    className='absolute -top-2 -right-2 bg-black text-white rounded-full w-5 h-5 flex items-center justify-center cursor-pointer text-xs hover:bg-black/80 transition-colors'
                  >
                    ×
                  </div>
                  <img
                    src={URL.createObjectURL(file)}
                    className='w-full h-full object-cover rounded border border-black/10'
                  />
                </div>
              )
            }
          </div>
        </div>
        <button
          type='submit'
          className='px-4 py-2 bg-black text-white rounded-md hover:bg-black/90 transition-colors max-w-max mx-auto cursor-pointer' 
        >
          Add Product
        </button> 
       
      </form>
    </div>
  )
}
