const express=require('express')
const dotenv=require('dotenv').config()
const app=express()
const cors=require('cors')
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
const connectMongoDb=require('./connection')
const adminController=require('./Router/admin')
const postController=require('./Router/post')
const uploadVideo=require('./Router/uploadVideos')
connectMongoDb()
app.use(cors({origin:"https://dainikloksandarbh.com"}))
// app.use(cors({origin:"*"}))

app.use('/backendvideos', express.static('videos'));
app.use('/uploads', express.static('images'));
app.use('/api',adminController)
app.use('/api',postController)
app.use('/api',uploadVideo)

const PORT=process.env.PORT
const host = '0.0.0.0'; // Listen on all available network interfaces

app.listen(PORT, host, () => {
  console.log(`Server is running on https://${host}:${PORT}`);
});
// app.listen(PORT)