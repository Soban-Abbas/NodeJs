const express=require("express");
const routes=express.Router();

routes.get('/all-products',(req,res,next)=>{
    console.log("in all-product middlewere");
    res.send("All your products");
})
routes.post('/added',(req,res,next)=>{
    console.log("in a added middlewere");
    res.redirect("/all-products");

})
routes.get('/add-products',(req,res,next)=>{
    console.log("in a add-product middlewere");
    res.send("<form action='/added' method='POST'><input type='text' name='product-name' Placeholder='Product'><br> <Button type='submit'>Submit</Button></form>");

});

module.exports=routes