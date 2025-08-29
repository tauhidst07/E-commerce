import axios from "axios";
import { useContext } from "react";
import AuthContext from "../context/AuthContext"; 
const baseUrl=import.meta.env.VITE_BASE_URL;

// function to check token expiration
const isTokenExpired = (token)=>{
    try {
    const payload = JSON.parse(atob(token.split('.')[1])); 
    console.log(`${payload.exp} and ${Date.now()}`);
    return payload.exp * 1000 < Date.now();
   } catch (e) { 
    // return true if invalid token
    return true; 
  }
} 
const logoutUser = ()=>{
   localStorage.removeItem("token"); 
   window.location.href="/login"
}

// add baseurl from env
const axiosInstance = axios.create({
    baseURL:baseUrl
}) 

//add token in every axios instance request
axiosInstance.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token");  
    if(!token || isTokenExpired(token)){ 
      logoutUser(); 
      alert("session expired login again yaha pa");
      return Promise.reject("session expired login again..")
    } 
    config.headers.Authorization =`Bearer ${token}` 

    return config
})  

//handling token expiry error
axiosInstance.interceptors.response.use(
  (response) => response, 
  (error) => { 
    console.log("401 handling: ",error);
    if (error.response?.status === 401 && error.response?.data?.message.includes("token")) { 
      altert("session expired login again idhr bhi")
      localStorage.removeItem("token"); // Clear invalid token
      window.location.href = "/login?expired=true"; 
    } 
    else{
      alert(error?.response?.data?.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;