const AdminModal = require('../../modal/AdminModal')
const jwt=require('jsonwebtoken')
const { query, validationResult,body } = require('express-validator')

const uploadVideo=()=>{
    try{
       
    }catch(error){
        console.log('error in uploading video')
    }
}

module.exports={uploadVideo}