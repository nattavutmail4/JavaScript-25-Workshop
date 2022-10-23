const express = require('express');
const router  = express.Router();
const mongoose =require('mongoose');
const { restart } = require('nodemon');

const Product = require('../modules/product');
/**
 * สำหรับ  http สามารถดูได้ที่ลิงค์
 * https://tips.thaiware.com/1077.html
 */

//get all products
router.get('/',(req,res,next)=>{
    Product.find().select('name price _id').exec().then(doc =>{
        if(doc.length >= 0){
            const dataProducts = {
                count: doc.length,
                product: doc.map(doc=>{
                    
                    return {
                        name:doc.name,
                        price:doc.price,
                        _id: doc._id,
                        request:{
                            type:"GET",
                            url:`http://localhost:${process.env.PORT || 3030}/api/v1/products/${doc._id}`
                        }
                    }
                })
            };
            res.status(200).json({
                response:dataProducts
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

//create products
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
            if(result){
                res.status(201).json({
                    message:"Create product successfully",
                    response:{
                        name:result.name,
                        price:result.price,
                        _id:result._id,
                        request:{
                            type:"GET",
                            url:`http://localhost:${process.env.PORT || 3030}/api/v1/products/${result._id}`
                        }
                    }
                });
            }else{
                res.status(404).json({
                    message:"Create product False",
                    error:err
                })
            }
            
        }).catch((err)=>{
            res.status(500).json({
                error:err
            })
        });
       
    }else{
        res.status(404).json({
            message:"Pless input Data"
        })
    }
});


//Search product
router.get('/:id',(req,res,next)=>{
    const id = ( req.params.id);
    if(id !== undefined || id !== ''){
        Product.findById(id).select('name price _id').exec().then(doc =>{
            if(doc){
                res.status(200).json({
                    message:"succes",
                    response:{
                        name:doc.name,
                        price:doc.price,
                        _id: doc._id,
                        request:{
                            type:"GET",
                            url:`http://localhost:${process.env.PORT || 3030}/api/v1/products/${doc._id}`
                        }
                    }
                });
            }else{
                res.status(404).json({message:'No valid entry found for provided ID'});
            }
           
        }).catch((err)=>{
            res.status(500).json({error:err})
        })
    }else{
        res.status(200).json({
            message:"You passed an ID"
        });
    }
});


//Update product
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
        UpdateOps[ops.propName] = ops.value
    }
    Product.update({_id:id},{$set:UpdateOps}).exec().then((result)=>{
            if(result){
                res.status(200).json({
                    message:"Update success",
                    response: {
                        request:{
                            type:"GET",
                            url:`http://localhost:${process.env.PORT || 3030}/api/v1/products/${id}` 
                        }
                    }
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


//delete Product
router.delete('/:id',(req,res,next)=>{
    const id = req.params.id
    Product.remove({_id:id}).exec().then(doc =>{
        if(doc){
            res.status(200).json({
                message:"Product delete successfully",
                response: {
                    request:{
                        type:"POST",
                        url:`http://localhost:${process.env.PORT || 3030}/api/v1/products`,
                        body:{name: "String" , price : 'Number'} 
                    }
                }
            });
        }else{
            res.status(404).json({
                message:"Delete Product False"
            });
        }
       
    }).catch(err =>{
        res.status(500).json({
            message:"500",
            error:err
        });
    })
});
module.exports = router