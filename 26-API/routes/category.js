const express  = require('express');
const router   = express.Router(); 

router.get('/',(req,res,next)=>{
    res.status(200).json({
        messages:"Show Category all api"
    });
});

router.post('/',(req,res,next)=>{
    res.status(201).json({
        messages:"Create Category api"
    });
});


router.get('/:name',(req,res,next)=>{
     const name = req.params.name
     res.status(200).json({
        messages:"Search Create Category api"
     });
});

router.patch('/:id',(req,res,next)=>{
    const ID = req.params.id
    const REQUESTINPU = req.body

    res.status(200).json({
        message:"Update Category success"
    });
});

router.delete('/:id',(req,res,next)=>{
    const ID = req.params.id
    res.status(200).json({
         message:"Delete Category Success"
    });
});


module.exports = router