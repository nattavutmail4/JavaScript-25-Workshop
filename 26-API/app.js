const express = require('express');
const app  = express();
const mongoose =require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.CONN); //เชื่อมต่อฐานข้อมูล mongoose
mongoose.Promise = global.Promise

/**
 *  Morgan เป็น middleware สำหรับเก็บ log จาก HTTP request
 * ใน NodeJS ซึ่งการเก็บ log นั้นจะทำให้เราสามารถติดตามดูได้ว่ามีเหตุการณ์อะไรเกิดขึ้นจาก request
 * ไหนบ้าง ถ้ามี error โผล่ขึ้นมาก็จะตามหาสาเหตุได้ง่าย ๆ
 * 
 */

const morgan =require('morgan'); 
const port = process.env.PORT || 3030; 

const productRouters =  require('./routes/product');
const orderRouters   =  require('./routes/orders');
const studentRouters =  require('./routes/students');
const categoryRouter =  require('./routes/category');
const userRouter = require('./routes/user');

//morgan('') ประกอบไปด้วย  combined common dev short tiny
app.use(morgan('dev'));

app.use(express.urlencoded({extended:false})); 
app.use('/uploads',express.static('uploads')); //อันนี้ใช้สำหรับตั้ง path ไปยังไฟล์รูป
app.use(express.json());

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header(
         'Access-Control-Allow-Headers',
         'Origin, X-Requested-With, Content-Type, Accept,Authorization'
        );
    console.log(req.method)
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH ,DELETE, GET');
        return res.status(200).json({})
    }
    next();
});


//Routes which should handle requests
app.use('/api/v1/products',productRouters);
app.use('/api/v1/orders',orderRouters);
app.use('/api/v1/students',studentRouters);
app.use('/api/v1/category',categoryRouter);
app.use('/api/v1/user',userRouter);


app.use((req,res,next)=>{
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    });
});

app.listen(port,()=>{console.log(`Server is Start http://localhost:${port}`)})
