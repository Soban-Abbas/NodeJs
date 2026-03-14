const path = require('path');

const express = require('express');


const router = express.Router();
const adminRoutes = require("../controllers/cadmin.js")


// /admin/add-product => GET
router.get('/add-product', adminRoutes.adminGet);

// /admin/add-product => POST
router.post('/add-product', adminRoutes.adminPost);
router.get('/product-list',adminRoutes.adminProductList);
router.post('/edit-product',adminRoutes.postEditProduct);
router.get("/edit-product/:productID",adminRoutes.editProduct)
module.exports = {
  route: router
}
