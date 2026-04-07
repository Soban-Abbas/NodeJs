const cartModel = require("../models/cart")
//const product = require("../models/product")
//const productModel = require("../models/product")
const usermodel = require("../models/user")

exports.addToCart = (req, res, next) => {
//cartModel.saveintoCart(req.params.productID);
cartModel.saveToCart(req.params.productID,()=>{
    res.redirect('/cart')
})


   // res.redirect("/cart")
    // res.render("user/cart",{
    //   pageTitle: "Cart",
    //   url: "/cart",
    //   productArray: [addedProduct]
    // })



}


exports.cart = (req, res, next) => {

cartModel.getCart((products)=>{
    console.log(products)
 res.render("user/cart",{
        pageTitle:"Cart",
        productArray:products,
        grandTotal:1000,
        url:"/cart"
    })
})
   



}


exports.deleteCartProduct = (req, res, next) => {




   // res.redirect("/cart")

}

