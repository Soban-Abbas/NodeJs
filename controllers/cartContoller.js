//const cartModel = require("../models/cart")
//const product = require("../models/product")
//const productModel = require("../models/product")
const product = require("../models/product")
const usermodel = require("../models/user")

exports.addToCart = (req, res, next) => {

    let productInCart = req.user.cart.items.findIndex(item => {
        return item.productId.toString() === req.params.productID.toString()
    })

    if (productInCart >= 0) {
        req.user.cart.items[productInCart].quantity += 1;





    }
    else {
        req.user.cart.items.push({
            productId: req.params.productID,
            quantity: 1
        })
    }
    req.user.save().then((result) => {
        console.log("Product Added Successfully")
        res.redirect('/cart');
    }).catch((err) => {
        console.log(err)
    })
    //  console.log(req.user.cart.items)

    // usermodel.updateOne({

    // })



    //cartModel.saveintoCart(req.params.productID);
    //console.log(req.params.productID);
    // req.user.postproductInCart(req.params.productID).then(()=>{
    //     res.redirect("/cart")
    // }).catch((err)=>{
    //     console.log(err)
    // })


    // res.redirect("/cart")
    // res.render("user/cart",{
    //   pageTitle: "Cart",
    //   url: "/cart",
    //   productArray: [addedProduct]
    // })



}


exports.cart = (req, res, next) => {

    req.user.populate({
        path: 'cart.items.productId',

    }).then((products) => {
      //  console.log(products.cart.items);
        let structureArray = products.cart.items.map(item => {
            return {
                title: item.productId.title,
                price: item.productId.price,
                image: item.productId.image,
                discription: item.productId.discription,
                quantity: item.quantity
            }
        })
        res.render("user/cart", {
            pageTitle: "Cart",
            productArray: structureArray,
            grandTotal: 1000,
            url: "/cart"
        })
    }).catch((err) => {
        console.log(err)
    })



    // req.user.getCart() .then((products)=>{
    //    // console.log(products)
    //  


}





exports.deleteCartProduct = (req, res, next) => {
    req.user.deleteProductFormCart(req.body.productID).then(() => {
        res.redirect('/cart')
    }).catch((err) => {
        console.log(err)
    })


    // res.redirect("/cart")

}

