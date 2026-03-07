const express=require("express");
const path=require('path')
const routes=express.Router();

//in server file where we are  get admin req we added path admin so here path will
//be /admin/all-products
routes.get('/all-products',(req,res,next)=>{
    console.log("in all-product middlewere");
    res.sendFile(path.join(__dirname,"../","views","admin.html"));
})
//same here /admin/added
routes.post('/added',(req,res,next)=>{
    console.log("in a added middlewere");
    res.redirect("/all-products");

})
// /admin/add-products
routes.get('/add-products',(req,res,next)=>{
    console.log("in a add-product middlewere");
    res.sendFile(path.join(__dirname,"../","views","adminAddProduct.html"));;

});

module.exports=routes