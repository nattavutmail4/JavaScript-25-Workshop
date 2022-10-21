const express = require('express');
const router  = express.Router();
/**
 * สำหรับ  http สามารถดูได้ที่ลิงค์
 * https://tips.thaiware.com/1077.html
 */

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:"Handling GET requests to /products",
        response:'true'
    });
});

router.post('/',(req,res,next)=>{
    const {name,price} = req.body
    const ItemProduct = {
         name:name,
         price:price
    }
    res.status(201).json({
        message:"Create Product success",
        createdProduct:ItemProduct
    });
});

router.get('/:id',(req,res,next)=>{
    const id = Number( req.params.id);
    if(typeof(id) === 'number'){
        res.status(200).json({
            message:'You discovered the special ID',
            id:id
        });
    }else{
        res.status(200).json({
            message:"You passed an ID"
        });
    }
});

router.patch('/:id',(req,res,next)=>{
    res.status(200).json({
        message:"Updated Product!"
    });
});

router.delete('/:id',(req,res,next)=>{
     res.status(200).json({
        message:"Delete Products"
     })
});
module.exports = router