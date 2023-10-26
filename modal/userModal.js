const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    name:String,
    password:String,
    phone:String,
    email:String,
    gender:String,
    DOB:String
})

const UserModal=mongoose.model("user",userSchema)

module.exports=UserModal