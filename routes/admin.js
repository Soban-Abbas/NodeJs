const path = require('path');
const express = require('express');
const router = express.Router();
const adminRoutes = require("../controllers/cadmin.js")
const middlewere=require("../middlewere/is-auth.js")
// /admin/add-product => GET
router.get('/add-product',middlewere.isAuth, adminRoutes.adminGet);

// /admin/add-product => POST
router.post('/add-product', adminRoutes.adminPost);
router.get('/product-list',middlewere.isAuth,adminRoutes.adminProductList);
router.post('/edit-product',adminRoutes.postEditProduct);
router.get("/edit-product/:productID", middlewere.isAuth,adminRoutes.editProduct)
router.post("/delete-product",adminRoutes.deleteProduct);
module.exports = {
  route: router
}
