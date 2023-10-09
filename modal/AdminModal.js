const mongoose=require("mongoose")

const Admin_schema=mongoose.Schema({
    name:String,
    Email:String,
    Password:String
})

const AdminModal= mongoose.model("Admin",Admin_schema)
module.exports=AdminModal;