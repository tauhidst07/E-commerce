import axios from "axios";
import toast from "react-hot-toast";
const baseUrl=import.meta.env.VITE_BASE_URL;

// function to check token expiration
const isTokenExpired = (token)=>{
    try {
    const payload = JSON.parse(atob(token.split('.')[1])); 
    return payload.exp * 1000 < Date.now();
   } catch (e) { 
    // return true if invalid token
    return true; 
  }
} 

// add baseurl from env
const axiosInstance = axios.create({
    baseURL:baseUrl
}) 

//add token in every axios instance request
axiosInstance.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token");  
    if(!token || isTokenExpired(token)){  
      console.log("triggered in use request")
      localStorage.removeItem("token");  
      localStorage.removeItem("user");
      toast.error("session expired login again"); 
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
      toast.error("session expired login again")
      localStorage.removeItem("token"); 
      localStorage.removeItem("user") // Clear invalid token
      window.location.href = "/login?expired=true"; 
    } 
    else{ 
      console.log("err in response: ",error);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;