const express=require('express')
const router=express.Router()
const {enewsCreate,getEnews}=require('../controller/Admin/E-news')
const { query, validationResult,body } = require('express-validator')
const multer=require('multer')
const path = require('path'); // Import the path module
const Verifiy = require('../verify')


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

router.post("/new-enews",upload.array("image"),Verifiy,enewsCreate)
router.get("/getenews",getEnews)
module.exports=router;