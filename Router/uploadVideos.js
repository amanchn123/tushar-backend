const express=require('express')
const router=express.Router()
const { query, validationResult,body } = require('express-validator')
const verify =require('../verify')
const multer=require('multer')
const path = require('path'); // Import the path module
const {uploadVideocon, getVideos} =require('../controller/Admin/uploadVideo')
const Verifiy = require('../verify')

const isValidFileType = (file) => {
    // Define an array of allowed MIME types
    const allowedMimeTypes = [
      'video/mp4', 'video/avi', 'video/quicktime', 'video/webm',
    ];
  
    // Get the MIME type of the uploaded file
    const fileMimeType = file.mimetype;
  
    // Get the file extension from the original filename
    const fileExtension = file.originalname.split('.').pop().toLowerCase();
  
    // Check if the MIME type and file extension are allowed
    if (allowedMimeTypes.includes(fileMimeType) && [ 'mp4', 'avi', 'mov', 'webm'].includes(fileExtension)) {
      return true;
    }
  
    return false;
  };
  
  const storage = multer.diskStorage({
      destination: (req,file, cb) => {
  
        cb(null, 'videos'); // Define the folder where images will be stored
      },
      filename: (req, file, cb) => {
        
        const ext = path.extname(file.originalname);
        cb(null,Date.now() + ext); // Use a unique filename to avoid overwriting
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

router.post('/uploadVideos',upload.single("shortvideo"),Verifiy,uploadVideocon)
router.get('/getVideos',getVideos)
module.exports=router;