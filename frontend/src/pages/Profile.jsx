import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext';
import axiosInstance from '../api/apiConnector';

const Profile = () => { 
    const [profile,setProfile] = useState();  
    const {logout} = useContext(AuthContext); 
    const [loading,setLoading] = useState(false);

    useEffect(()=>{ 
      setLoading(true)
      axiosInstance.get("/auth/profile").then((response)=>{
        setProfile(response.data.user);  
        console.log("response: ",response);
      }).catch((err)=>{   
        console.log("err found in profile request: ",err);
        if(err.response) {
          alert(err.response.data.message)
        } 
        console.log(err); 
        setLoading(false);
      })  
      setLoading(false);
      
    },[]) 

    if(loading){
      return <div>spinner ...</div>
    }
    return (
    <div> 
       {
        profile && <div>  
            <p>name: {profile.firstname} {profile.lastname}</p> 
            <p>email: {profile.email}</p>
        </div>
       } 
       <button onClick={logout}>logout</button>
    </div>
  )
}

export default Profile