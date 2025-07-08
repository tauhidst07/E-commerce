const userMiddleware = require("../middleware/usermiddleware"); 
const adminMiddleware = require("../middleware/adminMiddleware");
const { productSchema } = require("../inputTest");
const { upload, imageUpload } = require("../utils/imageupload"); 
const fs = require("fs"); 
const path = require("path");
const { Product } = require("../db");

const router = require("express").Router();  
const supporetdFormat=["jpg","jpeg","png"];

// only admin access --> add product
router.post("/add",userMiddleware,adminMiddleware,upload.single("image"),async (req,res)=>{ 
    let {name,price,description,category} = req.body;   
    price=Number(price); 
    const {...inputdata}={name,price,description,category};  
    const localPath=req.file.path;
    console.log("input: ",inputdata); 
    const response = productSchema.safeParse(inputdata); 
    if(!response.success){ 
        fs.unlinkSync(localPath);
       return res.status(400).json({
            message:"invalid input", 
            err:response.error
        })
    }     
    const ext = path.extname(localPath).toLowerCase().slice(1);
    if(!supporetdFormat.includes(ext)){ 
        fs.unlinkSync(localPath);
        return res.status(400).json({
            message:"invalid format we support only : jpeg,jpg,png"
        })
    } 
    const result = await imageUpload(localPath);  

    const product = await Product.create({...inputdata,image:result.secure_url}); 
    res.status(200).json({
        message:"product added ", 
        product
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
      product
    })
})

module.exports=router;