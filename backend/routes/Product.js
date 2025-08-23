const userMiddleware = require("../middleware/usermiddleware"); 
const adminMiddleware = require("../middleware/adminMiddleware");
const { productSchema } = require("../inputTest");
const { upload, imageUpload, isValidExtension } = require("../utils/imageupload"); 
const fs = require("fs"); 
const path = require("path");
const { Product } = require("../db");

const router = require("express").Router();  


// only admin access --> add product
router.post("/add",userMiddleware,adminMiddleware,upload.array("images",3),async (req,res)=>{  
    let {title,price,description,category,audience,sizes} = req.body;    
    price=Number(price); 
    const {...inputdata}={title,price,description,category,audience,sizes};   
    const files=req.files.map((file)=>file.path);
    console.log("input: ",inputdata); 
    const response = productSchema.safeParse(inputdata);  
    console.log("response",response);
    if(!response.success){ 
        files.forEach((file)=>{
            fs.unlinkSync(file);
        })
       return res.status(400).json({
            message:"invalid input", 
            err:response.error
        })
    }     
    
    if(!isValidExtension(files)){  
        for (const file of files){
          fs.unlinkSync(file);
        }
        return res.status(400).json({
            message:"invalid format we support only : jpeg,jpg,png,avif"
        })
    }  
    const promises = files.map((file)=>imageUpload(file)); 
    const results = await Promise.all(promises);  
    const urls = results.map((res)=>res.secure_url);
    const product = await Product.create({...inputdata,images:urls}); 
    res.status(200).json({
        message:"product added ", 
        product, 
        time:product.createdAt
    })
}) 
 
// get all products
router.get("/",async(req,res)=>{
    const products = await Product.find({}); 
    res.status(200).json({
        products
    })
}) 

//get product by id '

router.get("/:id",async(req,res)=>{
    const id = req.params.id; 
    const product = await Product.findById(id);  
    res.status(200).json({
      product, 
    })
}) 
 
// edit product -> only admin

router.put("/:id",userMiddleware,adminMiddleware,upload.array("images",3),async(req,res)=>{ 
    const id = req.params.id;
    let {title,price,description,category,audience,sizes,existingImages} = req.body;    
    price=Number(price); 
    const {...inputdata}={title,price,description,category,audience,sizes};   
    const files=req.files.map((file)=>file.path);
    console.log("input: ",inputdata); 
    const response = productSchema.safeParse(inputdata);  
    console.log("response",response);
    if(!response.success){ 
        files.forEach((file)=>{
            fs.unlinkSync(file);
        })
       return res.status(400).json({
            message:"invalid input", 
            err:response.error
        })
    }   
     if(!isValidExtension(files)){  
        for (const file of files){
          fs.unlinkSync(file);
        }
        return res.status(400).json({
            message:"invalid format we support only : jpeg,jpg,png,avif"
        })
    }  
    const promises = files.map((file)=>imageUpload(file)); 
    const results = await Promise.all(promises);     
     if(!Array.isArray(existingImages)){
       existingImages=[existingImages]
    }  
    const urls = [...existingImages,...results.map((res)=>res.secure_url)]; 
    console.log("urls: ",urls); 
    const product = await Product.findByIdAndUpdate(id,{...inputdata,images:urls},{new:true});  
    console.log("product: ",product);
    res.status(200).json({
        message:"product edited ", 
        product, 
        updatedAt:product.updatedAt
    })

})

// // delte product -->only admin 

router.delete("/:id",userMiddleware,adminMiddleware,async(req,res)=>{
    const id = req.params.id;  
    try{
    await Product.findByIdAndDelete(id); 
    } 
    catch(err){
     res.status(403).json({
        message:"error in deleting product", 
        err:err.message
     })
    } 

    res.status(200).json({
        message:"product deleted successfully"
    })
    

})

module.exports=router;