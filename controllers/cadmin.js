const modelProduct=require("../models/product")
const admingetProduct= (req, res, next) => {
  res.render("add-product",{
    url:"/admin"+req.url,
    pageTitle:"admin-page"
  });
}

const adminPostProduct= (req, res, next) => {
  
  const newProduct=new modelProduct(req.body.title);
  newProduct.save();
  res.redirect('/');
}

module.exports={
    adminGet:admingetProduct,
    adminPost:adminPostProduct,
    
}