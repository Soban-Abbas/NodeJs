const path = require('path');
const adminFile=require('./admin');
const express = require('express');

const rootDir = require('../util/rootPath');

const router = express.Router();

router.get('/', (req, res, next) => {
  console.log(adminFile.products);
  res.render("shop",
    {
      productArray:adminFile.products,
      pageTitle:"My Shop",
      url:req.url
    }
  );
});

module.exports = router;
