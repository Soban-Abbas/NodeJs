const path = require('path');
const express = require('express');
const shop=require("../controllers/cshop")
const router = express.Router();

router.get('/',shop.fetchSaleProducts);
router.get("/all-products",shop.fetchProduct)
router.get("/cart",shop.cart);
router.get("/checkout",shop.checkout);
module.exports ={
shopi:router
}
