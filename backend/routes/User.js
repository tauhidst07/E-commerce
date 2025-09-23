
const router = require("express").Router();  
const bcrypt = require("bcrypt");  
const jwt = require("jsonwebtoken"); 
require("dotenv").config(); 
const userMiddleware = require("../middleware/usermiddleware");


const {registerSchema, loginSchema, addressSchema}=require("../inputTest/index");
const { User, Order } = require("../db");
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
  
  const user ={ 
    _id:isValidUser._id,
    name:isValidUser.firstname, 
    role:isValidUser.role, 
    email:isValidUser.email
  }

 const token =  jwt.sign(user,process.env.JWT_SECRET,{expiresIn:'24h'}); 

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

router.get("/user/orders",userMiddleware,async(req,res)=>{
    const id = req.user._id; 
    const orders = await Order.find({user:id}).populate("orderItems.product","title images"); 
    res.status(200).json({
      message:"order fetched",
      orders
    }) 
}) 
router.get("/user/address",userMiddleware,async(req,res)=>{
   const id = req.user._id;  
   const user = await User.findById(id);  
   res.status(200).json({
    address:user.addresses, 
    defaultAddress:user.defaultAddress
   })

})
router.post("/user/address",userMiddleware, async(req,res)=>{
    const id = req.user._id;  
    const address= req.body;  
    const response = addressSchema.safeParse(address); 
    if(!response.success){
      return res.status(403).json({
        message:"invalid input"
      })
    }  
      let user = await User.findByIdAndUpdate(id,
        {$push:{addresses:address}}, 
        {new:true}
      );
      if(!user.defaultAddress){
        user = await User.findByIdAndUpdate(id,{defaultAddress:user.addresses[user.addresses.length-1]},{new:true});
      }

    res.status(200).json({
      message:"address added", 
      user
    })
}) 

router.put("/user/address",userMiddleware,async(req,res)=>{
      const id = req.user._id; 
      const addressId = req.body.id;    
  
      const user = await User.findById(id);  
      if(user.defaultAddress && user.defaultAddress._id==addressId){
        await User.updateOne({_id:id},{
          $set:{
            defaultAddress:req.body
          }
        }); 

       return res.status(200).json({
          message:"updated"
        })
      } 
      try{
        const user = await User.updateOne({_id:id,"addresses._id":addressId},{
          $set:{
             "addresses.$":req.body
          }
        }) 
      } 
      catch(err){
        console.log("err in updating address"); 
        res.status(403).json({ 
          message:"error in updating address",
          err:err.message
        })
      }
      res.status(200).json({
        messagee:"updated"
      })
}) 

router.delete("/user/address/:addressId",userMiddleware,async(req,res)=>{
     const id = req.user._id;  
     const {addressId}= req.params;  
     console.log("address id: ",addressId); 
     let user = await User.findById(id); 
     if(user.defaultAddress && user.defaultAddress._id == addressId){
         await User.updateOne({_id:id},{
          $set:{
            defaultAddress:null
          }
        },{new:true})
     }
     await User.updateOne({_id:id},{
        $pull:{
           addresses:{_id:addressId}
        }
     },{new:true});  
     res.status(200).json({
      success:true, 
      message:'address deleted'
     })
})

router.post("/user/address/setDefault",userMiddleware,async(req,res)=>{
  const address = req.body.address;   
  const id = req.user._id;  

  const user = await User.findByIdAndUpdate(id,{defaultAddress:address})  

  res.status(200).json({
    success:true
  })

})

  
module.exports = router;