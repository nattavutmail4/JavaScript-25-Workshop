const { response } = require('express');
const express = require('express');
const router  = express.Router();
const mongoose =require('mongoose');
const { restart } = require('nodemon');
const { count } = require('../modules/order');

const Order = require("../modules/order");
const Product = require('../modules/products');
/**
 * สำหรับ  http สามารถดูได้ที่ลิงค์
 * https://tips.thaiware.com/1077.html
 */
//get all products
router.get('/',(req,res,next)=>{
    Order.find()
    .select('product quantity _id')
    .populate('product') // คล้ายกับ select ถ้าเราต้องการแค่ให้แสดง name ให้ใส่แบบนี้  populate('product','name')
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
       return true
   }).then(resultSave =>{
        if(resultSave === true){
           Order.find({ product:req.body.productId}).exec().then(rs=>{
              const count_row =  rs.length;
              if(!count_row){ // เช็ค id product ว่ามีอยู่ในฐานข้อมูลแล้วหรือยัง
                  console.log(req.body)
                  const order = new Order({
                      _id : new mongoose.Types.ObjectId(),
                      product:req.body.productId,
                      quantity:req.body.quantity
                  });
                  order.save().then(result =>{
                      if(result){
                          res.status(201).json({
                             message:"Create order successfully",
                             response:{
                                product:result.product,
                                quantity:result.quantity,
                                _id:result._id,
                                request:{
                                    type:"GET",
                                    url:`http://localhost:${process.env.PORT || 3030}/api/v1/order/${result._id}`
                                }
                             }
                          })
                      }else{
                        res.status(404).json({
                          message:"Create order false",
                          error:err
                       })
                      }
                  })
              }else{
                 return res.status(404).json({
                    message:"มีรายการสินค้านี้ในระบบแล้ว"
                 })
              }
           })
        }
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
        if(order){
          return res.status(200).json({
              response:{
                  _id:order._id,
                  product:order.product,
                  quantity:order.quantity,
                  request:{
                    type:'GET',
                    url:`http://localhost:${process.env.PORT || 3030}/api/v1/orders/${order._id}`
                  }
              }
           })
        }else{
           return res.status(404).json({
              message:"Order not found"
           });
        }
      })
      .catch(err => {
        res.status(500).json({
          message:"GET ERROR Order ",
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
            url:`http://localhost:${process.env.PORT || 3030}/api/v1/orders`,
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