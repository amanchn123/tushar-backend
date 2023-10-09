const express=require('express')
const router=express.Router()
const {Login}=require('../controller/Admin/Auth')
const { query, validationResult,body } = require('express-validator')

router.post('/adminLogin',body("Email").trim().isEmail(),body("Password").notEmpty(),Login)

module.exports=router;