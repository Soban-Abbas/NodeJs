const express=require('express');
const router=express.Router();

const users=[];

router.get("/",(req,res)=>{
    res.render("all-users")
})

router.get("/users",(req,res)=>{
    res.render("add-users")
})
router.post("/add-users",(req,res)=>{
    
    res.redirect('/');
})

module.exports=router;