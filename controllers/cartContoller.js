//const cartModel = require("../models/cart")
//const product = require("../models/product")
//const productModel = require("../models/product")
const usermodel = require("../models/user")

exports.addToCart = (req, res, next) => {
//cartModel.saveintoCart(req.params.productID);
//console.log(req.params.productID);
req.user.postproductInCart(req.params.productID).then(()=>{
    res.redirect("/cart")
}).catch((err)=>{
    console.log(err)
})


   // res.redirect("/cart")
    // res.render("user/cart",{
    //   pageTitle: "Cart",
    //   url: "/cart",
    //   productArray: [addedProduct]
    // })



}


exports.cart = (req, res, next) => {

    req.user.getCart() .then((products)=>{
       // console.log(products)
        res.render("user/cart",{
        pageTitle:"Cart",
        productArray:products,
        grandTotal:1000,
        url:"/cart"
    })
    })
    
    
}





exports.deleteCartProduct=(req,res,next)=>{
   req.user.deleteProductFormCart(req.body.productID).then(()=>{
    res.redirect('/cart')
   }).catch((err)=>{
    console.log(err)
   })


   // res.redirect("/cart")

}

