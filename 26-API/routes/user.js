const express = require('express');
const { default: mongoose } = require('mongoose');
const router  = express.Router();
const bcrypt = require('bcrypt');
const User = require('../modules/user');
const { restart } = require('nodemon');

const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';


router.post('/login',(req,res,next)=>{
    User.find({ email:req.body.email}).exec().then(user =>{
        const Countemail = user.length
        if(Countemail >=1){
            bcrypt.compare(req.body.password,user[0].password, (err,result)=>{
                if(err){
                    return res.status(401).json({
                        message:"Auth failed"
                    })
                }else{
                    if(result){
                        return res.status(200).json({message:"Auth successful"})
                    }else{
                        return res.status(401).json({
                            message:"Auth failed"
                        })
                    }
                }
            });
        }else{
           return res.status(401).json({
                message:"Mail not found, user doesn\'t exist"
           });
        }
    }).catch(err=>{
        return res.status(500).json({
            error:err
        })
    })
})

router.post('/signup',(req,res,next)=>{
    User.find({email:req.body.email})
    .exec()
    .then((result)=>{
        const count_email = result.length
        if(count_email==0){
            bcrypt.genSalt(saltRounds,(err,salt)=>{
                bcrypt.hash(req.body.password,salt,(err,hash)=>{
                     if(err){
                        return res.status(404).json({
                            message:"มีปัญหาในการ hash password",
                            error:err
                        });
                     }else{
                         const user = new User({
                             _id : new mongoose.Types.ObjectId(),
                             email:req.body.email,
                             password:hash
                         });
                         user.save()
                         .then((resultSave)=>{
                             if(resultSave){
                                 return res.status(201)
                                 .json({
                                     message:"Create user successfuly",
                                     response:{
                                         email:resultSave.email,
                                         password:resultSave.password,
                                         _id:result._id,
                                         request:{
                                            type:"POST",
                                             url:`http://localhost:${process.env.PORT || 3030}/api/v1/signin/${resultSave._id}`
                                         }
                                     }
                                 });
                             }else{
                                 return res.status(404).json({
                                     message:"Create user false"
                                 });
                             }
                         })
                         .catch((err)=>{
                            return res.status('500').json({
                                message:"ระบบมีปัญหากรุณาตรวจสอบ email หรือ password",
                                error:err
                            });
                         })
                     }
                });
            });
        }else{
            return res.status(409).json({message:"มียูสนี้อยู่แล้วไม่สามารถเพิ่มได้"})
        }
    })
    .catch((error)=>{ return res.status(500).json({error:err})});
});


router.delete('/:id',(req,res,next)=>{
    const id = req.params.id
    User.remove({_id:id})
    .exec()
    .then(result=>{
        if(result){
            return res.status(200).json({
                 message:"Deleted user  successfuly"
            });
        }else{
            return res.status(404).json({
                 message:"Deleted user false"
            });
        }
    })
    .catch(err =>{
        return res.status(404).json({
            error:err
        });
    })
})
module.exports = router