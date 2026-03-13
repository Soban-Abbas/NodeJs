const cartModel= require("../models/cart")

exports.cart=(req,res,next)=>{

    res.render("user/cart",{
        pageTitle:"Cart",
        url:"/cart"
    })


}
exports.addToCart=(req,res,next)=>{
    cartModel.addProductToCart(req.params.productID , req.params.price)
    res.redirect("/cart")

 }




