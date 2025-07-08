import React from 'react'
import { useContext } from 'react';
import { useForm } from 'react-hook-form'
import AuthContext from '../context/AuthContext';

const Register = () => {
  const { register, handleSubmit,reset, formState: { errors } } = useForm(); 
  const {signup} = useContext(AuthContext);
  const onSubmit = async (data) => {
       signup(data); 
       reset();
  }   


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text"
        {...register("firstname", {
          required: "first name is required"
        }
        )}
        placeholder='enter your firstname'
      />
      {errors.firstname && <p> {errors.firstname.message}</p>} <br /><br />

      <input type="text"
        {...register("lastname", {
        })} 

        placeholder='enter your lastname'
      />  <br /><br />
      <input type='email'
        {...register("email", {
          required: "email is required"
        })} 

      placeholder='enter your email'
      />
      {errors.email && <p> {errors.email.message}</p>}  <br /><br />

      <input type='password'
        {...register("password",
          {
            required: "password is required",
            minLength: {
              value: 6,
              message: "password must be at least 6 character"
            }
          }
        )} 
        placeholder='enter your password'
      /> 
      { errors.password && <p>{errors.password.message} </p>} <br /><br />

      <button type='submit'>register</button>

    </form>
  )
}

export default Register