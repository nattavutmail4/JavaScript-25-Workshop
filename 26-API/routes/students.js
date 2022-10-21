const express = require('express');
const router  = express.Router()

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:"Welcome to data Students"
    })
});

router.post('/',(req,res,next)=>{
    console.log(req.body)
    res.status(201).json({
        message:"Create data Students",
        response:req.body
    });
});

router.get('/:id',(req,res,next)=>{
        const id = req.params.id
        res.status(200).json({
            message:"Search ById " + id ,
            response:id
        });
});

router.patch('/:id',(req,res,next)=>{
    const id = req.params.id;
    const Input = req.body;

    res.status(200).json({
        message:'Update Data Byid ' + id,
        response:Input
    });
})


router.delete('/:id',(req,res,next)=>{
    const  id = req.params.id
    res.status(200).json({
        message:"Delete By Id "+ id
    })
});

module.exports = router