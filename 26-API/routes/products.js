const express = require('express');
const router  = express.Router();
const mongoose =require('mongoose');
const { restart } = require('nodemon');

const Product = require('../modules/product');
/**
 * สำหรับ  http สามารถดูได้ที่ลิงค์
 * https://tips.thaiware.com/1077.html
 */

router.get('/',(req,res,next)=>{
    Product.find().exec().then(doc =>{
        if(doc.length >= 0){
            res.status(200).json({
                response:doc
            });
        }else{
            res.status(404).json({
                response:"No entries found"
            })
        }
       
    }).catch((err)=>{
        res.status(500).json({
            error:err
        });
    });
});

router.post('/',(req,res,next)=>{
    const {name,price} = req.body
    //Insert data
    if(name != '' && price != ''){
        const product = new Product({
            _id: new mongoose.Types.ObjectId(), //random id
            name:name,
            price:price
        });
        // save product
        product.save().then(result=>{
            console.log(result)
            res.status(201).json({
                message:"Create Product Success",
                response:result
            })
        }).catch((err)=>{
            console.log(err);
            res.status(500).json({
                error:err
            })
        });
       
    }else{
        res.status(500).json({
            message:"Pless input Data"
        })
    }
});

router.get('/:id',(req,res,next)=>{
    const id = ( req.params.id);
    if(id !== undefined || id !== ''){
        Product.findById(id).exec().then(doc =>{
            console.log(doc)
            if(doc){
                res.status(200).json({
                    message:"succes",
                    response:doc
                });
            }else{
                res.status(404).json({message:'No valid entry found for provided ID'});
            }
           
        }).catch((err)=>{
            console.log(err);
            res.status(500).json({error:err})
        })
    }else{
        res.status(200).json({
            message:"You passed an ID"
        });
    }
});

router.patch('/:id',(req,res,next)=>{
    const id = req.params.id;
    // บังคับ ให้แก้ไขทั้งหมด
    // const {name ,price} = req.body;
    // if(name != '' && price != ''){
    //     const Item = {
    //         name:name,
    //         price:price
    //     }
    //     Product.update({_id:id},{$set:Item}).exec().then((resp)=>{
    //         if(resp){
    //             res.status(200).json({
    //                 message:"Update Success",
    //                 response:resp
    //             });
    //         }else{
    //             res.status(404).json({message:' Update False'});
    //         }
    //     }).catch((err)=>{
    //         console.log(err)
    //         res.status(500).json({
    //             error:err
    //         })
    //     })
    // }

    //แก้ไขเฉพาะบางอัน
    const UpdateOps = {}

    /**
     * รูปแบบ insert ข้อมูลใน postman
     *  [
           {"propName":"name", "value":"ddd"}
        ]
        [
            {"propName":"price", "value":99}
        ]
     *
     */
    
    for(const ops of req.body){
        console.log(ops.value)
        UpdateOps[ops.propName] = ops.value
    }
    Product.update({_id:id},{$set:UpdateOps}).exec().then((result)=>{
            if(result){
                res.status(200).json({
                    message:"Update success",
                    response: result
                });
            }else{
                res.status(404).json({
                    message:"Update False"
                });
            }
    }).catch((err)=>{
         res.status(500).json({error:err})
    })
});

router.delete('/:id',(req,res,next)=>{
    const id = req.params.id
    Product.remove({_id:id}).exec().then(doc =>{
        res.status(200).json({
            message:"200",
            response:doc
        });
    }).catch(err =>{
        res.status(500).json({
            message:"500",
            error:err
        });
    })
});
module.exports = router