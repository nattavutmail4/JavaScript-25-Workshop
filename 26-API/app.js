const express = require('express');
const app  = express();
const morgan =require('morgan');
const bodyParser = require('body-parser')
require('dotenv').config();
const port = process.env.PORT || 3030; 

const productRouters =  require('./routes/products');
const orderRouters   =  require('./routes/orders');

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Routes which should handle requests
app.use('/products',productRouters);
app.use('/orders',orderRouters);

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
