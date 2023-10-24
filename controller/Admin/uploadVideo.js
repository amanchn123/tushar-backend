const AdminModal = require('../../modal/AdminModal')
const jwt=require('jsonwebtoken')
const { query, validationResult,body } = require('express-validator')
const videoModal=require('../../modal/videoModal')

const uploadVideocon=async(req,resp)=>{

  try{
    const uploadedVideos = req.file
    const result =await new videoModal({name:uploadedVideos.filename}).save()

    if(result){
      resp.send(result)
    }
    
 }catch(error){
    console.log('error in uploading videos in backend')
  }
}

const getVideos=async(req,resp)=>{
  try{
   const result=await videoModal.find({}).sort({createdAt:-1}).limit(10)
   
   resp.send(result)
  }catch(error){
    console.log('error in getting videos in backend',error)
  }
}

module.exports ={uploadVideocon,getVideos}