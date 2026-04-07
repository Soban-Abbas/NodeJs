const express=require("express");
const router=express.Router();
const cartContoller=require("../controllers/cartContoller.js");
//const { route } = require("./admin.js");
router.post("/add-to-cart/:productID",cartContoller.addToCart);
router.get("/cart",cartContoller.cart)
router.post("/delete-cart-product",cartContoller.deleteCartProduct);
module.exports={
    cart:router
}