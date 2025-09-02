
const router = require("express").Router();  
const bcrypt = require("bcrypt");  
const jwt = require("jsonwebtoken"); 
require("dotenv").config(); 
const userMiddleware = require("../middleware/usermiddleware");


const {registerSchema, loginSchema}=require("../inputTest/index");
const { User } = require("../db");
router.post("/register",async (req,res)=>{ 
    const inputdata = req.body; 
   const response = registerSchema.safeParse(inputdata); 
   if(!response.success){
    return res.status(400).json({
        message:"invalid input"
    }) 
   } 
   const isAlreadyRegistered = await User.findOne({email:inputdata.email}); 
   if(isAlreadyRegistered){
    return res.status(409).json({
      message:"email already registered"
    })
   } 
   if(inputdata.role === "admin" && inputdata.adminCode !== process.env.ADMIN_SECRET){
      return res.status(400).json({
        message:"invalid input"
      })
   }
   const hashedPassword =await  bcrypt.hash(inputdata.password,10);  

   const user = await User.create({
    ...inputdata,password:hashedPassword
   })
   res.status(200).json({
     message:"user created success", 
     user 
   }) 


})   


router.post("/login",async(req,res)=>{
  const inputdata = req.body; 
  const response = loginSchema.safeParse(inputdata); 
  if(!response.success){
    return res.status(400).json({
        message:"invalid input"
    })
  } 

  const isValidUser = await User.findOne({email:inputdata.email});  
  if(!isValidUser){
    return res.status(401).json({
        message:"user not found signup first."
    })
  } 
  const isCorrectPassword =  await bcrypt.compare(inputdata.password,isValidUser.password);   
  if(!isCorrectPassword){
    return res.status(401).json({
        message:"incorrect password"
    }) 
  } 
  const payload ={
    email:isValidUser.email, 
    role:isValidUser.role
  }   
  const user ={ 
    _id:isValidUser._id,
    name:isValidUser.firstname, 
    role:isValidUser.role, 
    email:isValidUser.email
  }

 const token =  jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'24h'}); 

  res.status(200).json({
    message:"logged in", 
    token, 
    user
  }) 

})


router.get("/user",userMiddleware,async(req,res)=>{
    const email = req.user.email; 
    const user = await User.findOne({email:email});   
    const {password,...userWithoutPassword} = user.toObject(); 
    res.status(200).json({
      user :userWithoutPassword, 
    });
    
}) 

  
module.exports = router;