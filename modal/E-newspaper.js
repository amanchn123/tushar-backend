const mongoose=require('mongoose')

const Epaper_schema=new mongoose.Schema({
  content:[], 
  date:Date,
  heading:String
})
const emodal=mongoose.model("E-paper",Epaper_schema)

module.exports=emodal