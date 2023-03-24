const express = require('express')
const UserModel = require('../model/user.model')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const userRoute = express.Router()
const bcrypt = require('bcrypt')

userRoute.post("/register",async(req,res)=>{
const {email,pass,location,age} = req.body

    try{
         bcrypt.hash(pass,5,async(err,hash)=>{
            const user = new UserModel({email,pass:hash,location,age})
            const result= await user.save()
            res.status(200).send({"msg":"Registration has benn done!"})
         })
        // const user =new UserModel(req.body)
    }catch(err){
        res.status(400).send({"err":"Registration failed!"})
    }
})

userRoute.get("/",async(req,res)=>{
    
    try {
        
        const users = await UserModel.find()
        res.status(200).send({"data":users})
    } catch (err) {
        res.status(400).send({"err":err.message})
    }
})

userRoute.post("/login",async(req,res)=>{
    const {email ,pass} = req.body
    try {
        const user = await UserModel.findOne({email})
        //  console.log(user)
        if(user){
           const result= bcrypt.compare(pass,user.pass)
                     
                     if(result){

                         const token = jwt.sign({userID:user._id},'bruce')
         
                            res.status(200).send({msg:"login Successfull!",
                         token})
                     }else{
                        
                         res.status(400).send({msg:"Login failed!"})
                        }
                    }else{
                    res.status(400).send({msg:"No such user found!"})
                }
            }
     catch (err) {
        res.status(400).send({"err":err.message})
    }
})

userRoute.get("/details",(req,res)=>{
 const {token} = req.headers

 try {
        jwt.verify(token,"bruce",(err,decoded)=>{
            if(decoded){
                res.status(200).send("succeess...")
            }else{
                res.status(400).send("failed!")
            }
        })    
 } catch (err) {
    
 }
})

module.exports=userRoute