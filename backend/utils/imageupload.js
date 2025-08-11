const cloudinary = require('cloudinary').v2; 
const fs = require("fs");  
require("dotenv").config(); 
const multer = require("multer");  
const path = require("path");
const supporetdFormat=["jpg","jpeg","png","avif"];

// function to check if extension is valid 

function isValidExtension (files){
   const extensions = files.map((file)=>path.extname(file).toLowerCase().slice(1)); 
   for (const ext of extensions){
    if(!supporetdFormat.includes(ext)){
        return false;
    }
   } 
   return true;
}

// multer config
const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,"uploads")
    }, 
    filename:(req,file,cb)=>{
        cb(null,Date.now()+'-'+file.originalname)
    }
})  
// multer upload
const upload = multer({storage:storage, 
    limits:{
        fileSize:5*1024*1024
    }
});  

//cloudinary config 
cloudinary.config({
  cloud_name:process.env.CLOUD_NAME, 
  api_key:process.env.API_KEY, 
  api_secret:process.env.API_SECRET
}) 

async function imageUpload(filepath){
    const result = await cloudinary.uploader.upload(filepath,{
         transformation:[ {quality:"auto:good",dpr:"auto"}], 
         allowed_formats:[...supporetdFormat]
    })  
    fs.unlinkSync(filepath);
   return result;
}
  
 
module.exports={imageUpload,upload,isValidExtension};
