const express=require("express");
const router=express.Router();
const cartContoller=require("../controllers/cartContoller.js")
router.get("/cart",cartContoller.cart)
router.post("/add-to-cart/:productID/:price",cartContoller.addToCart);


module.exports={
    cart:router
}