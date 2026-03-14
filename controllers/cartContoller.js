const cartModel= require("../models/cart")
const productModel=require("../models/product")
exports.cart=(req,res,next)=>{

    res.render("user/cart",{
        pageTitle:"Cart",
        url:"/cart"
    })


}
exports.addToCart=(req,res,next)=>{
    productModel.findproduct(req.params.productID,(product)=>{
cartModel.addProductToCart(product.id,product.price);
          res.redirect("/cart")
    })
        
    }
  

 




