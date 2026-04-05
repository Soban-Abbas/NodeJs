//const sequelize = require("sequelize");
const productArray=require("../controllers/cadmin.js");
const modelProduct=require("../models/product.js");


exports.fetchProduct=(req,res,next)=>{

modelProduct.getProducts((product)=>{
 res.render("user/product-list",{
        productArray:product,
         pageTitle:"ALL-Products",
      url:req.url
    })
})

}

exports.fetchSaleProducts=(req,res,next)=>{


    modelProduct.getProducts((product)=>{
  res.render("user/index",{
        productArray:product,
         pageTitle:"Sale",
      url:req.url
    })
})

}





exports.details=(req,res,next)=>{
  modelProduct.findOneProduct(req.params.productId).then((product)=>{
   // console.log(product)
  res.render("user/product-detail",{
            pageTitle:product.title,
            url:"",
            productArray:[product]
        })
  }).catch((err)=>{
    console.log(err);
  })
       
 

}
