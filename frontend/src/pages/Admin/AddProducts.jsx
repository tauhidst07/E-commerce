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
    <div>
      <form onSubmit={handleSubmit(submitHandler)} className='flex flex-col gap-4'>
        <div>
          <input type="text" placeholder='enter product title' {...register("title", {
            required: "title is required"
          })} />
          {errors.title && <p>{errors.title.message}</p>}
        </div>
        <div>
          <input type="description" placeholder='enter description' {...register("description", {
            required: "description is required"
          })} />
          {errors.description && <p>{errors.description.message}</p>}
        </div>
        <div>
          <input type="number" placeholder='enter price' {...register("price", {
            required: "price is required"
          })} />
          {errors.price && <p>{errors.price.message}</p>}
        </div>
        <div>
          <p>Select category for product</p>
          <select  {...register("category", {
            required: "category is required"
          })}>
            <option value="">select</option>
            {
              CLOTHS_CATEGORIES.map((category, ind) => <option key={ind} value={category}>{category}</option>)
            }
          </select>
          {errors.category && <p> {errors.category.message} </p>}

        </div>
        <div>
          <p>select audience type</p>
          <select {...register("audience", {
            required: "audience type is required"
          })}>
            <option value="">select</option>
            {audience.map((aud, index) => <option key={index} value={aud} >{aud}</option>)}
          </select>
          {errors.audience && <p> {errors.audience.message}</p>}
        </div>
        <div className='flex gap-x-4'>
          <p>select available sizes: </p>
          {
            audienceType ? <div className='flex gap-x-2'>{
              sizes[audienceType].map((size, index) => <div key={index} className={`px-2 py-1  border ${selectedSize.includes(size) ? "border-black text-black " : "border-black/10 text-black/40"} `} onClick={() => toggleSize(size)}>{size}</div>)
            }</div> : <p>select audience type first</p>
          }
        </div>
        <div>
          <p>upload  images for product </p>
          <input type="file" accept='image/*' multiple onChange={onFileChnage} />
          <div className='flex gap-x-2'>
            {
              selectedImage.length > 0 &&
              selectedImage.map((file, i) => <div key={i} className='border'>
                <div onClick={() => removeImage(i)} className='cursor-pointer max-w-max'>remove</div>
                <img src={URL.createObjectURL(file)}
                  width={80}

                />

              </div>)
            }
          </div>
        </div>
        <button type='submit' className='px-3 p-2 rounded-2xl border  max-w-max cursor-pointer'> add product </button>
      </form>
    </div>
  )
}
