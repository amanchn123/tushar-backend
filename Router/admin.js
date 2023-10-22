const express=require('express')
const router=express.Router()
const {Login,getAllPost, DeletePost}=require('../controller/Admin/Auth')
const { query, validationResult,body } = require('express-validator')
const { getPost } = require('../controller/Admin/Auth')
const {updatePost}=require('../controller/Admin/Auth') 
const multer=require('multer')
const path = require('path'); // Import the path module
const  {uploadVideo} =require('../controller/Admin/post')
const Verifiy = require('../verify')

const isValidFileType = (file) => {
  // Define an array of allowed MIME types
  const allowedMimeTypes = [
    'image/jpeg', 'image/png', 'image/gif', 'application/pdf',
    'video/mp4', 'video/avi', 'video/quicktime', 'video/webm',
  ];

  // Get the MIME type of the uploaded file
  const fileMimeType = file.mimetype;

  // Get the file extension from the original filename
  const fileExtension = file.originalname.split('.').pop().toLowerCase();

  // Check if the MIME type and file extension are allowed
  if (allowedMimeTypes.includes(fileMimeType) && ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'mp4', 'avi', 'mov', 'webm'].includes(fileExtension)) {
    return true;
  }

  return false;
};

const storage = multer.diskStorage({
    destination: (req,file, cb) => {

      cb(null, 'images'); // Define the folder where images will be stored
    },
    filename: (req, file, cb) => {
      
      const ext = path.extname(file.originalname);
      cb(null,file.originalname); // Use a unique filename to avoid overwriting
      // storeFileInformation("fileInfo");
    },
  });
  
const upload = multer({ storage, fileFilter: (req, file, cb) => {
  if (isValidFileType(file)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Invalid file type or extension.'), false);
  }
}, })

router.post('/adminLogin',body("Email").trim().isEmail(),body("Password").notEmpty(),Login)
router.get('/admingetpost',Verifiy,getAllPost)
router.get('/getpost',getPost)
router.post('/deletepost',Verifiy,DeletePost)
router.get('/uploadVideos',upload.single("videos"),uploadVideo)
router.post('/updatepost',upload.fields([{name:"images"},{name:"updatedimage"},{name:"banner"}]),Verifiy,updatePost)

module.exports=router;