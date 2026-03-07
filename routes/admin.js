const path = require('path');

const express = require('express');

const rootDir = require('../util/rootPath');

const router = express.Router();

const products = [];

// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

// /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
  npm 
  products.push(req.body);
  res.redirect('/');
});

module.exports={
  route:router,
  products:products
}
