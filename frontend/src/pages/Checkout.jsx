import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import indianStatesAndUTs from "../constants/indianState";
const Checkout = () => {
    const { register, reset,control, handleSubmit, formState: { errors } } = useForm({
        defaultValues:{state:"Bihar"}
});

    function submitHandler(data) {
      console.log("address: ",data); 
      reset();
    }
    return (
        <div className='max-w-[80rem] mx-auto h-screen flex justify-center  items-center'>
            <form onSubmit={handleSubmit(submitHandler)} className='flex flex-col space-y-4 w-[500px] mx-auto'>
                <div className='flex justify-between '>
                    <div className='space-y-2'>
                        <input type="text" placeholder='First name' {...register("firstname",{required:"Enter First name",})} />
                        {errors.firstname && <span>{errors.firstname.message}</span>}
                    </div>
                    <div className='space-y-2'>
                        <input type="text" placeholder='Last name' {...register("lastname",{required:"Enter Last name"})} />
                        {errors.lastname && <span>{errors.lastname.message}</span>}
                    </div>
                </div>
                <div>
                    <div>
                        <input type="text" placeholder='Address' {...register("address",{required:"Enter address"})} />
                        {errors.address && <span>{errors.address.message} </span>}
                    </div>
                </div>
                <div>
                    <input type="text" placeholder='Apartment,suite etc.' {...register("aprtment")} />
                </div>
                <div className='flex justify-between'>
                    <div>
                        <input type="text" placeholder='City' {...register("city",{required:"Enter City"})} />
                        {errors.city && <span>{errors.city.message}</span>}
                    </div>
                    <div>
                        <select {...register("state")} className='w-[200px]'> 
                            { 
                            indianStatesAndUTs.map((state,i)=><option key={i} value={state}>{state}</option>)
                            }
                        </select>
                       
                    </div>
                    <div>
                        <input type="text" placeholder='PIN code' {...register("pin",{required:"Enter PIN code"})} />
                        {errors.pin && <span>{errors.pin.message}</span>}
                    </div>
                </div>
                <div>
                    <Controller  
                    name='phone'
                    control={control} 
                    rules={{required:"phone is required"}}  
                    render={({field})=>( 

                        <PhoneInput  
                        country={"in"} 
                        placeholder='Phone'  
                        {...field} 
                        onChange={(val)=>field.onChange(val)}
                        />
                    )}
                    
                    />

                   {errors.phone && <span>{errors.phone.message}</span>}

                </div> 

                <button type='submit' className='py-2 px-4 bg-black text-white'>Continue</button>
            </form>
        </div>
    )
}

export default Checkout