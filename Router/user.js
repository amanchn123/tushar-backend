const express=require('express')
const router=express.Router()
const {userRegister,userLogin} =require('../controller/user/auth')

router.post("/userRegister",userRegister)
router.post("/userLogin",userLogin)

module.exports=router;