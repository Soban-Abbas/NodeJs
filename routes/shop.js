const path = require('path');
const express = require('express');
const shop=require("../controllers/cshop")
const router = express.Router();

router.get('/',shop.fetchProduct);

module.exports ={
shopi:router
}
