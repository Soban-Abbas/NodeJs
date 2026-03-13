const path = require('path');
const express = require('express');
const shop=require("../controllers/cshop")
const router = express.Router();

router.get('/',shop.fetchSaleProducts);
router.get("/all-products",shop.fetchProduct)
router.get("/orders",shop.orders);
router.get("/checkout",shop.checkout);
router.get("/details/:productId",shop.details)

module.exports ={
shopi:router
}
