const express = require("express")
const NoteModel = require("../model/note.model")
const noteRouter =express.Router()
const jwt = require("jsonwebtoken")
require('dotenv').config()

noteRouter.get("/",async(req,res)=>{
    const token = req.headers.token
    const decoded = jwt.verify(token,process.env.secretKey)
    // logic
    // console.log("token",token)
    try {

        if(decoded){

            const notes =await NoteModel.find({userID:decoded.userID})
            res.status(200).send({data:notes})
        }
        
    } catch (err) {
        res.status(400).send({error:err.message})
    }

})
noteRouter.get("/:id",async(req,res)=>{
    const token = req.headers.token
    const decoded = jwt.verify(token,process.env.secretKey)
    // logic
    // console.log("token",token)
    const {id} = req.params
    // console.log(id)
    try {

        if(decoded){

            const note =await NoteModel.findOne({_id:id})
            res.status(200).send({data:note})
        }
        
    } catch (err) {
        res.status(400).send({error:err.message})
    }

})

noteRouter.post("/add",async(req,res)=>{
    const token = req.headers.token
    const decoded = jwt.verify(token,process.env.secretKey)

    try {
        // console.log(req.body)
        if(decoded){

            const note =new NoteModel(req.body)
            
            await note.save()
            res.status(200).send({"msg":"A new note added ..."})
        }else{
            res.status(400).send({"err":"user not found!"})

        }

    } catch (err) {
        res.status(400).send({"err":err.message})
    }
})

noteRouter.patch("/update/:id",async(req,res)=>{
  
    // const payload = req.body

    try {
         await  NoteModel.findOneAndUpdate({_id:req.params.id},req.body)

        res.status(200).send({msg:"note has been updated"})
    } catch (err) {
        res.status(200).send({error:err.message})
        
    }

})

noteRouter.delete("/delete/:id",async(req,res)=>{
    
    const token = req.headers.token
    const decoded = jwt.verify(token,process.env.secretKey)

    try {
        if(decoded){
            await  NoteModel.findOneAndDelete({_id:req.params.id})
    
           res.status(200).send({msg:"note has been deleted"})

        }else{
            res.status(400).send({error:"user not found!"})
        }
   } catch (err) {
       res.status(200).send({error:err.message})
       
   }
})

module.exports=noteRouter