const express=require('express')
const router=express.Router()
const {userRegister,userLogin} =require('../controller/user/auth')
const {userQues, getAllQues, getAllOpinion} = require('../controller/user/questions')

router.post("/userRegister",userRegister)
router.post("/userLogin",userLogin)
router.post("/userQues",userQues)
router.get("/getallques",getAllQues)
router.get("/getallopinion",getAllOpinion)

module.exports=router;