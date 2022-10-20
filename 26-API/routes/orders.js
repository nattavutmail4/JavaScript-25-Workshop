const express = require('express');
const router  = express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:"Orders were fetcheed"
    });
});

router.post('/',(req,res,next)=>{
    // const data = req.params.body()
    const {id,quantity} = req.body

    const Itemorder = {
        productId:id,
        quantity:quantity
    }

    res.status(201).json({
        message:"create Order success",
        order:Itemorder
    })
});

router.get('/:id',(req,res,next)=>{
    const id = req.params.id
    res.status(200).json({
        message:" Order Details",
        orderId:id
    });
});

router.delete('/:id',(req,res,next)=>{
    const id = req.params.id
    res.status(200).json({
        message:" Order Deleted",
        orderId:id
    });
});
 

module.exports = router;