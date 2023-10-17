const express=require('express')
const router=express.Router()
const {newPost,getPost, postDetails}=require('../controller/post/createPost')
const { query, validationResult,body } = require('express-validator')
const verify =require('../verify')
const multer=require('multer')
const path = require('path'); // Import the path module


const storage = multer.diskStorage({
    destination: (req,file, cb) => {

      cb(null, 'images'); // Define the folder where images will be stored
    },
    filename: (req, file, cb) => {
      
      const ext = path.extname(file.originalname);
      cb(null, Date.now() + ext); // Use a unique filename to avoid overwriting
      // storeFileInformation("fileInfo");
    },
  });
  
const upload = multer({ storage })

router.post('/createNewPost',upload.fields([{name:"images"},{name:"banner"}]),verify,newPost)
router.post('/getPost',getPost)
router.post('/getpostdetails',body('slug').notEmpty(),postDetails)
module.exports=router;