const express = require('express');
const router  = express.Router();
const mongoose =require('mongoose');
const { restart } = require('nodemon');

const Order = require("../modules/order");
const Product = require('../modules/product');
/**
 * สำหรับ  http สามารถดูได้ที่ลิงค์
 * https://tips.thaiware.com/1077.html
 */
//get all products
router.get('/',(req,res,next)=>{
    Order.find()
    .select('product quantity _id')
    .exec()
    .then(doc =>{
        if(doc)
        {
            const Items = {
                count: doc.length,
                product: doc.map(doc=>{
                    return {
                        product:doc.product,
                        quantity:doc.quantity,
                        _id: doc._id,
                        request:{
                            type:"GET",
                            url:`http://localhost:${process.env.PORT || 3030}/api/v1/order/${doc._id}`
                        }
                    }
                })
            };
           return res.status(200).json({response:Items});
        }
        else
        {
           return res.status(404).json({
                response:"No entries found"
            })
        }
    }).catch((err)=>{
       return res.status(500).json({
            error:err
        });
    });
});

router.post('/',(req,res,next)=>{
   Product.findById(req.body.productId).then(product =>{
       if(!product) // !product == false
       {
            return  res.status(404).json({message  :  'Product not found'});
       }

       const  order = new Order({
           _id : mongoose.Types.ObjectId(),
           product: req.body.productId,
           quantity: req.body.quantity
       });
      return order.save();
   }).then(resultSave =>{
        return res.status(201).json({
            message:"Order stored",
            response:{
                _id:resultSave._id,
                product:resultSave.product,
                quantity:resultSave.quantity
            },
            request:{
                 type:"GET",
                 url:`http://localhost:${process.env.PORT || 3030}/api/v1/order/${resultSave._id}`
            }
        })
   }).catch(err =>{
     return   res.status(500).json({
            error: err
        });
   })
});

router.get("/:orderId", (req, res, next) => {
    Order.findById(req.params.orderId)
      .exec()
      .then(order => {
        if (!order) {
          return res.status(404).json({
            message: "Order not found"
          });
        }
        res.status(200).json({
          order: order,
          request: {
            type: "GET",
            url:`http://localhost:${process.env.PORT || 3030}/api/v1/order/${resultSave._id}`
          }
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
});

router.delete("/:orderId", (req, res, next) => {
    Order.remove({ _id: req.params.orderId })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "Order deleted",
          request: {
            type: "POST",
            url: "http://localhost:3000/orders",
            body: { productId: "ID", quantity: "Number" }
          }
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
});

module.exports = router