const express = require("express");
const route = express.Router();

const User = require("../collection/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


// we want fetch all data from database.
// ---------------------------GET---------------------------------
route.get('/',(req,res,next)=>{
    User.find()
    .then(result=>{
        res.status(200).json({
            usersData:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
});


// We want fetch Specific data from database.
route.get('/:id',(req,res,next)=>{
    console.log(req.params.id);
    User.findById(req.params.id)
    .then(result=>{
        res.status(200).json({
            User:result
        })
    })
    .catch(err=>{
        res.status(500).json({
error:err
        })
    })
})
// ---------------------------------Delete--------------------------------------------------------
route.delete('/:id',(req,res,next)=>[
    User.remove({_id:req.params.id})
    .then(result=>{
        res.status(200).json({
            msg:'data delete successfully',
            result:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
])
// -----------------------------For SignUp--------------------------------------------
route.post('/signup', (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            })
        }
        else {
            const user = new User({
                _id: new mongoose.Types.ObjectId,
                userName: req.body.userName,
                email: req.body.email,
                password: hash,
                gender: req.body.gender,
                DOB: req.body.DOB,
                Qualification: req.body.Qualification,
                phone:req.body.phone
            })
            user.save()
                .then(result => {
                    res.status(200).json({
                        newUser: result
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    })
                })
        }
    })
})

//----------------------- For log in.---------------------------------------------
route.post('/login', (req, res, next) => {
    User.find({ email: req.body.email })
        // .exact()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    msg: "User not Found..."
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (!result) {
                    return res.status(401).json({
                        msg: "Password matching failed..."
                    })
                }
                if (result) {
                    const token = jwt.sign({
                        email:user[0].email,
                        userName:user[0].userName,
                        gender:user[0].gender,
                        Qualification:user[0].Qualification,
                        phone:user[0].phone
                    },
                    'dummy text...')
                    res.status(200).json({
                        email:user[0].email,
                        userName:user[0].userName,
                        gender:user[0].gender,
                        Qualification:user[0].Qualification,
                        DOB:user[0].DOB,
                        phone:user[0].phone,
                        token:token
                        
                    })
                }
            })
        })
        .catch(err=>{
            res.status(500).json({
                error:err
            })
        })
})

//----------------------- Update------------------
route.put('/:id',(req,res,next)=>{
    User.findOneAndUpdate({_id:req.params.id},{
        $set:{
            userName:req.body.userName,
            email:req.body.email,
            password:req.body.password,
            gender:req.body.gender,
            DOB:req.body.DOB,
            Qualification:req.body.Qualification,
            phone:req.body.phone


        }
    })
    .then(result=>{
        res.status(200).json({
            msg:"Update Successfully",
            Updated_User:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})

module.exports = route;