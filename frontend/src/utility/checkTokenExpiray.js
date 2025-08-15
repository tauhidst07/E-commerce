
import {jwtDecode} from "jwt-decode"; 
 

export function checkTokenExpiry (){ 
    
const token = localStorage.getItem("token");  

if(!token) return {isValid:false}; 

try{
  const {exp,role} = jwtDecode(token);   
  let isExpired = Date.now()>=exp*1000; 
  return {isValid:!isExpired,role};
}
catch(err){
    return {isValid:false};
}
}
