//const sequelize = require("sequelize");
//const productArray=require("../controllers/cadmin.js");
const productModel = require("../models/product.js");


exports.fetchProduct = (req, res, next) => {
 
  productModel.product.find({}).then((product) => {
    res.render("user/product-detail", {
      productArray: product,
      pageTitle: "Details",
      url: req.url,
      AuthenticUser: req.session.isLogin
    })
  }).catch((err) => {
    console.log(err)
  })

}

exports.fetchSaleProducts = (req, res, next) => {

  productModel.product.find({}).then((product) => {
    res.render("user/index", {
      productArray: product,
      pageTitle: "Sale",
      url: req.url,
      AuthenticUser: req.session.isLogin
    })
  }).catch((err) => {
    console.log(err)
  })

}





exports.details = (req, res, next) => {

  productModel.product.findOne({ _id: req.params.productId }).exec().then((product) => {
    res.render("user/product-detail", {
      pageTitle: product.title,
      url: "",
      productArray: [product],
      AuthenticUser:req.session.isLogin
    })
  }).catch((err) => {
    console.log(err);
  })
}



