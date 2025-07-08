import React from 'react'
import { useContext } from 'react'
import {useForm} from 'react-hook-form' 
import AuthContext from '../context/AuthContext'
const Login = () => { 
  const {register,handleSubmit,reset,formState:{errors}} = useForm() 

  const {login} = useContext(AuthContext);
  const onSubmit =(data)=>{
   login(data);  
   reset();
  
  }
  return (  
    <form onSubmit={handleSubmit(onSubmit)}>
       <input type='email' 
       {...register("email",{
        required:"email is required"
       }
       )}  placeholder='enter your email' />   <br /><br />

       {errors.email && <p>{errors.email.message}</p>} 
  
       <input type='password'  
       {...register("password", {
        
        required:"password is required", 
        minLength:{
          value:6, 
          message:"password must be at least 6 characters"
        }
       }
       )} 
       placeholder='enter your password'
       />  <br /><br />
       {errors.password && <p>{errors.password.message} </p>} 

       <button type='submit'>login</button>

    </form>
  )
}

export default Login