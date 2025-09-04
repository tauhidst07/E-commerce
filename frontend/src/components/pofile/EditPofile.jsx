import React, { useContext, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import PhoneInput from 'react-phone-input-2';
import userContext from '../../context/UserContext';

const EditPofile = () => {

    const { user } = useContext(userContext);

    useEffect(() => {
        if (user) {
            setValue("firstname", user.firstname);
            setValue("lastname", user.lastname);
            setValue("email", user.email);
            setValue("phone", user.phone);
        }
    }, [user])
    const { register, reset, control, setValue, handleSubmit, formState: { errors } } = useForm();
    return (
        <form onSubmit={handleSubmit} className='max-w-2xl space-y-6 p-6 bg-white rounded-lg shadow-sm border border-gray-200'>
            <h2 className='text-xl font-semibold text-gray-900 mb-4'>Edit Profile</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='space-y-2'>
                    <label className='block text-sm font-medium text-gray-700'>First Name</label>
                    <input
                        type="text"
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/50 focus:border-transparent transition-all duration-200'
                        {...register("firstname")}
                    />
                    {errors.firstname && <span className='text-red-500 text-sm'>{errors.firstname.message}</span>}
                </div>

                <div className='space-y-2'>
                    <label className='block text-sm font-medium text-gray-700'>Last Name</label>
                    <input
                        type="text"
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/50 focus:border-transparent transition-all duration-200'
                        {...register("lastname")}
                    />
                    {errors.lastname && <span className='text-red-500 text-sm'>{errors.lastname.message}</span>}
                </div>
            </div>

            <div className='space-y-2'>
                <label className='block text-sm font-medium text-gray-700'>Email</label>
                <input
                    type="email"
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/50 focus:border-transparent transition-all duration-200'
                    {...register("email")}
                />
                {errors.email && <span className='text-red-500 text-sm'>{errors.email.message}</span>}
            </div>

            <div className='space-y-2'>
                <label className='block text-sm font-medium text-gray-700'>Phone</label>
                <Controller
                    name='phone'
                    control={control}
                    rules={{ required: "Phone is required" }}
                    render={({ field }) => (
                        <div className='border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-black/50 focus-within:border-transparent transition-all duration-200'>
                            <PhoneInput
                                country={"in"}
                                placeholder='Phone number'
                                {...field}
                                onChange={(val) => field.onChange(val)}
                                inputClass='!w-full !px-4 !py-3 !border-none !outline-none'
                            />
                        </div>
                    )}
                />
            </div>

            <button
                type='submit'
                className='px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200'
            >
                Save Changes
            </button>
        </form>
    )
}

export default EditPofile