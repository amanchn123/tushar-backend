const express=require('express')
const dotenv=require('dotenv').config()
const app=express()
const cors=require('cors')
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
const connectMongoDb=require('./connection')
const adminController=require('./Router/admin')
const postController=require('./Router/post')
connectMongoDb()
app.use(cors({origin:"*"}))

app.use('/api',adminController)
app.use('/api',postController)
app.use('/uploads', express.static('images'));

const PORT=process.env.PORT
app.listen(PORT)

