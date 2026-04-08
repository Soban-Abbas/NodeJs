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


exports.deleteCartProduct=(req,res,next)=>{
    console.log(req.params.productID)
//cartModel.deletefromCart(req.params.productID)
}


exports.deleteCartProduct = (req, res, next) => {
console.log(req.body.productID);

cartModel.deletefromCart(req.body.productID).then(()=>{
    res.redirect("/cart")
}).catch((err)=>{
    console.log(err)
})


   // res.redirect("/cart")

}

