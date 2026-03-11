const path = require('path');

const express = require('express');


const router = express.Router();
const adminRoutes = require("../controllers/cadmin.js")


// /admin/add-product => GET
router.get('/add-product', adminRoutes.adminGet);

// /admin/add-product => POST
router.post('/add-product', adminRoutes.adminPost);

module.exports = {
  route: router
}
