const express=require("express");
const router=express.Router();
const cartContoller=require("../controllers/cartContoller.js")
router.post("/add-to-cart/:productID",cartContoller.addToCart);
router.get("/cart",cartContoller.cart)

module.exports={
    cart:router
}