const mongoose=require('mongoose')


const connect=async()=>{
    try{
        const connect=await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('connected')
    }catch (err){
 console.log("unable to connect mongoDb",err.message)
 process.exit()
    }
}

module.exports=connect;