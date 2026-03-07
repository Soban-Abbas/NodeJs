const express=require("express");
const { route } = require("./allproduct");
const routes=express.Router();
const path=require('path')
const rootPath=require('../util/rootPath');
routes.get('/',(req,res,next)=>{
    res.sendFile(path.join(rootPath,'/views','/first.html'));
})

routes.get('/users',(req,res,next)=>{
    console.log("in a / route ");
    res.sendFile(path.join(rootPath,'/views','/user.html'));
})

module.exports=routes;