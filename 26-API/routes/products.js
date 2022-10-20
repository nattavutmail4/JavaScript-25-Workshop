const express = require('express');
const router  = express.Router();
/**
 * สำหรับ  http สามารถดูได้ที่ลิงค์
 * https://tips.thaiware.com/1077.html
 */
const products = [
    {
      "id": 1,
      "title": "iPhone 9",
      "description": "An apple mobile which is nothing like apple",
      "price": 549,
      "discountPercentage": 12.96,
      "rating": 4.69,
      "stock": 94,
      "brand": "Apple",
      "category": "smartphones",
      "thumbnail": "...",
      "images": ["...", "...", "..."]
    },
    {
      "id": 2,
      "title": "iPhone 10",
      "description": "An apple mobile which is nothing like apple",
      "price": 549,
      "discountPercentage": 12.96,
      "rating": 4.69,
      "stock": 94,
      "brand": "Apple",
      "category": "smartphones",
      "thumbnail": "...",
      "images": ["...", "...", "..."]
    },
    {
      "id": 3,
      "title": "iPhone 11",
      "description": "An apple mobile which is nothing like apple",
      "price": 549,
      "discountPercentage": 12.96,
      "rating": 4.69,
      "stock": 94,
      "brand": "Apple",
      "category": "smartphones",
      "thumbnail": "...",
      "images": ["...", "...", "..."]
    },
    {
      "id": 4,
      "title": "iPhone 12",
      "description": "An apple mobile which is nothing like apple",
      "price": 549,
      "discountPercentage": 12.96,
      "rating": 4.69,
      "stock": 94,
      "brand": "Apple",
      "category": "smartphones",
      "thumbnail": "...",
      "images": ["...", "...", "..."]
    },
    {
      "id": 5,
      "title": "iPhone 13",
      "description": "An apple mobile which is nothing like apple",
      "price": 549,
      "discountPercentage": 12.96,
      "rating": 4.69,
      "stock": 94,
      "brand": "Apple",
      "category": "smartphones",
      "thumbnail": "...",
      "images": ["...", "...", "..."]
    },
    {
      "id": 6,
      "title": "iPhone 14",
      "description": "An apple mobile which is nothing like apple",
      "price": 549,
      "discountPercentage": 12.96,
      "rating": 4.69,
      "stock": 94,
      "brand": "Apple",
      "category": "smartphones",
      "thumbnail": "...",
      "images": ["...", "...", "..."]
    },
]

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:"Handling GET requests to /products",
        response:products
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